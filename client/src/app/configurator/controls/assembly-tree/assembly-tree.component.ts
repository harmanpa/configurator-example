import {Component, Input, OnInit} from '@angular/core';
import {ConfiguredAssembly} from '../../../../typescript-generator/configurator';

@Component({
    selector: 'app-assembly-tree',
    templateUrl: './assembly-tree.component.html',
    styleUrls: ['./assembly-tree.component.scss']
})
export class AssemblyTreeComponent implements OnInit {
    @Input() assembly: ConfiguredAssembly;

    constructor() {
    }

    ngOnInit() {
    }

    trackElement(index: number, element: any) {
        return element ? element.instanceId : null;
    }
}
