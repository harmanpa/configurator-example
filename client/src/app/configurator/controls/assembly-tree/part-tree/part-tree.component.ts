import {Component, Input, OnInit} from '@angular/core';
import {ConfiguredPart} from '../../../../../typescript-generator/configurator';

@Component({
    selector: 'app-part-tree',
    templateUrl: './part-tree.component.html',
    styleUrls: ['./part-tree.component.scss']
})
export class PartTreeComponent implements OnInit {
    @Input() part: ConfiguredPart;
    @Input() depth: number;

    constructor() {
    }

    ngOnInit() {
    }

    select() {

    }

    hover() {

    }
}
