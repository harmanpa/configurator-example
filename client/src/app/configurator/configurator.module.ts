import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeToolsModule } from '../three-tools/three-tools.module';
import { ThreeModule } from '../three/three.module';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { ConfiguredPartDirective } from './geometry/configured-part.directive';
import { ConfiguredAssemblyComponent } from './geometry/configured-assembly/configured-assembly.component';
import { SubAssemblyComponent } from './geometry/sub-assembly/sub-assembly.component';
import { ParameterEnumComponent } from './controls/parameter-enum/parameter-enum.component';
import { ParameterQuantityComponent } from './controls/parameter-quantity/parameter-quantity.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { ProgressComponent } from './controls/progress/progress.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ExportButtonComponent } from './controls/export-button/export-button.component';
import { NgbDropdownModule, NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { DrawingButtonComponent } from './controls/drawing-button/drawing-button.component';
import { OnshapeButtonComponent } from './controls/onshape-button/onshape-button.component';
import { AssemblyTreeComponent } from './controls/assembly-tree/assembly-tree.component';
import { SubAssemblyTreeComponent } from './controls/assembly-tree/sub-assembly-tree/sub-assembly-tree.component';
import { PartTreeComponent } from './controls/assembly-tree/part-tree/part-tree.component';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {
    MatButtonModule, MatCheckboxModule,
    MatFormFieldModule, MatIconModule, MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule, MatToolbarModule
} from "@angular/material";
import {SidebarModule} from "ng-sidebar";

@NgModule({
  declarations: [
    ConfiguratorComponent,
    ConfiguredPartDirective,
    ConfiguredAssemblyComponent,
    SubAssemblyComponent,
    ParameterEnumComponent,
    ParameterQuantityComponent,
    ProgressComponent,
    ExportButtonComponent,
    DrawingButtonComponent,
    OnshapeButtonComponent,
    AssemblyTreeComponent,
    SubAssemblyTreeComponent,
    PartTreeComponent
  ],
  exports: [
    ConfiguratorComponent,
    ConfiguredPartDirective,
    ConfiguredAssemblyComponent,
    SubAssemblyComponent,
    ParameterEnumComponent,
    ParameterQuantityComponent
  ],
    imports: [
        CommonModule,
        ThreeToolsModule,
        ThreeModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        Ng5SliderModule,
        FontAwesomeModule,
        NgbDropdownModule,
        NgbTooltipModule,
        NgbProgressbarModule,
        NgbCollapseModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        SidebarModule
    ]
})
export class ConfiguratorModule {
  constructor() {
    library.add(fas);
  }
}
