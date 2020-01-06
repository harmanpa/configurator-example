import {Component, Input, OnInit} from '@angular/core';
import {SubAssembly} from '../../../../../typescript-generator/configurator';

@Component({
    selector: 'app-sub-assembly-tree',
    templateUrl: './sub-assembly-tree.component.html',
    styleUrls: ['./sub-assembly-tree.component.scss']
})
export class SubAssemblyTreeComponent implements OnInit {
    @Input() subassembly: SubAssembly;
    @Input() depth: number;
    isCollapsed = true;

    constructor() {
    }

    ngOnInit() {
    }

    trackElement(index: number, element: any) {
        return element ? element.instanceId : null;
    }
}
