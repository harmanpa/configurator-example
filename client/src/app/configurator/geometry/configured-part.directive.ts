import {Directive, forwardRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractObject3D} from '../../three/objects/abstract-object-3d';
import * as THREE from 'three';
import {
    ConfiguredPart
} from '../../../typescript-generator/configurator';
import {ConfiguratorService} from '../services/configurator.service';
import {Observable} from 'rxjs';

@Directive({
    selector: 'app-configured-part',
    providers: [{provide: AbstractObject3D, useExisting: forwardRef(() => ConfiguredPartDirective)}]
})
export class ConfiguredPartDirective extends AbstractObject3D<THREE.Object3D> implements OnChanges {
    @Input() rootDocumentId: string;
    @Input() part: ConfiguredPart;
    protected currentLoadedModelObject: THREE.Object3D | undefined;

    constructor(private configuratorService: ConfiguratorService) {
        super();
    }

    id(): string {
        return this.part.instanceId;
    }

    protected afterInit(): void {
        this.matrix = this.part.transform;
        this.transposeMatrix = false;
        this.load().subscribe({
            next: newModel => {
                if (this.currentLoadedModelObject) {
                    this.removeChild(this.currentLoadedModelObject);
                }
                const mesh = newModel as THREE.Mesh;
                const geometry = mesh.geometry.clone();
                this.currentLoadedModelObject = new THREE.Mesh(geometry, mesh.material);
                this.addChild(this.currentLoadedModelObject);
            },
            error: (err) => console.error(err)
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.part) {
            if (!changes.part.previousValue) {
                console.log('Reloading part');
                this.afterInit();
                return;
            }
            if (changes.part.currentValue.transform.some((v, i) => v !== changes.part.previousValue.transform[i])) {
                // Transform has changed
                this.matrix = changes.part.currentValue.transform;
                this.applyMatrix();
            }
            if (changes.part.currentValue.documentId !== changes.part.previousValue.documentId
                || changes.part.currentValue.wvmType !== changes.part.previousValue.wvmType
                || changes.part.currentValue.wvmId !== changes.part.previousValue.wvmId
                || changes.part.currentValue.elementId !== changes.part.previousValue.elementId
                || changes.part.currentValue.partId !== changes.part.previousValue.partId
                || changes.part.currentValue.configuration !== changes.part.previousValue.configuration) {
                // Part has changed
                this.load().subscribe({
                    next: newModel => {
                        if (this.currentLoadedModelObject) {
                            this.removeChild(this.currentLoadedModelObject);
                        }
                        const mesh = newModel as THREE.Mesh;
                        const geometry = mesh.geometry.clone();
                        this.currentLoadedModelObject = new THREE.Mesh(geometry, mesh.material);
                        this.addChild(this.currentLoadedModelObject);
                    },
                    error: (err) => console.error(err)
                });
            }
        }
    }

    protected newObject3DInstance(): THREE.Object3D {
        return new THREE.Object3D();
    }

    protected load(): Observable<THREE.Object3D> {
        return this.configuratorService.getPart(this.rootDocumentId, this.part,
            (progress) => {
                this.onProgress('Loading...', progress.loaded / progress.total);
            });
    }

}
