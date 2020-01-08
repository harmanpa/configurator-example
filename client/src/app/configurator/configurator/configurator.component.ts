import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractDocumentElement, Appearance, Configuration, ConfigurationParameter, ConfigurationParameterEnum, ConfigurationParameterQuantity, Configurator, ConfiguredAssembly, ConfiguredPart, EnumOption, ParameterValue, SubAssembly, WVM} from '../../../typescript-generator/configurator';
import {Observable} from 'rxjs';
import {ConfiguratorService } from '../services/configurator.service';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit, OnChanges {
  showFiller = false;

  @Input() documentId: string;
  @Input() wvmType: WVM;
  @Input() wvmId: string;
  @Input() elementId: string;
  @Input() drawingElements: string[];

  @Output() configurationChange = new EventEmitter<Configuration>(true);

  configurator$: Observable<Configurator>;
  configurator: Configurator;
  configuredAssembly: ConfiguredAssembly;
  apiConfiguration: string;
  configuration: Configuration;
  appliedConfiguration: Configuration;
  defaultConfiguration: Configuration;
  pi = Math.PI;
  halfpi = -1 * this.pi / 2;
  progress: number;
  inProgress: boolean;
  isDefault: boolean;
  changed: boolean;

  constructor(private configuratorService: ConfiguratorService, private route: ActivatedRoute) {
    this.configuredAssembly = null;
  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('did')) {
      this.documentId = this.route.snapshot.paramMap.get('did');
      switch (this.route.snapshot.paramMap.get('wvm')) {
        case 'w':
          this.wvmType = 'Workspace';
          break;
        case 'v':
          this.wvmType = 'Version';
          break;
        case 'm':
          this.wvmType = 'Microversion';
          break;
      }
      this.wvmType = this.wvmType as WVM;
      this.wvmId = this.route.snapshot.paramMap.get('wvmid');
      this.elementId = this.route.snapshot.paramMap.get('eid');
      this.apiConfiguration = this.route.snapshot.queryParamMap.get('configuration');
    }

    console.log(this.drawingElements);
    this.inProgress = false;
    this.progress = 100;
    this.configuratorService.progressChange.subscribe((p) => this.progress = p);
    this.configurator$ = this.configuratorService.getConfigurator(this.documentId,
      this.wvmType, this.wvmId, this.elementId);
    this.configurator$.subscribe({
      next: (configurator) => {
        this.configurator = configurator;
        this.defaultConfiguration = this.configuratorService.applyStringOverrideForDefaults(this.apiConfiguration, this.configuratorService.getDefaultConfiguration(configurator));
        this.configuration = _.cloneDeep(this.defaultConfiguration);
        this.appliedConfiguration = _.cloneDeep(this.defaultConfiguration);
        this.updateAssembly();
        },
      error: (err) => {
        console.log(err);
      }});
    this.configurationChange.subscribe((configuration) => {
      this.changed = !_.isEqual(this.configuration, this.appliedConfiguration);
      this.isDefault = _.isEqual(this.appliedConfiguration, this.defaultConfiguration);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //this.ngOnInit();
  }

  updateAssembly() {
    console.log('Updating assembly');
    this.inProgress = true;
    this.configuratorService.getAssembly(this.configurator, this.configuration)
      .subscribe({next: (configuredAssembly) => {
          this.configuredAssembly = configuredAssembly;
          this.appliedConfiguration = _.cloneDeep(this.configuration);
          this.configuratorService.progressChange.subscribe((prog) => {
            if (prog >= 100) {
              this.inProgress = false;
              this.changed = !_.isEqual(this.configuration, this.appliedConfiguration);
              this.isDefault = _.isEqual(this.appliedConfiguration, this.defaultConfiguration);
            }
          });
        },
        error: (err) => {
          console.log(err);
          this.inProgress = false;
          this.changed = !_.isEqual(this.configuration, this.appliedConfiguration);
          this.isDefault = _.isEqual(this.appliedConfiguration, this.defaultConfiguration);
        }});
  }

  parameterValueChange(parameterValue: ParameterValue) {
    this.configurationChange.emit(this.configuration);
  }

  quantityParameter(parameter: ConfigurationParameter): ConfigurationParameterQuantity {
    return parameter as ConfigurationParameterQuantity;
  }

  enumParameter(parameter: ConfigurationParameter): ConfigurationParameterEnum {
    return parameter as ConfigurationParameterEnum;
  }

  undo() {
    this.configuration = _.cloneDeep(this.appliedConfiguration);
    this.configurationChange.emit(this.configuration);
  }

  home() {
    this.configuration = _.cloneDeep(this.defaultConfiguration);
    this.configurationChange.emit(this.configuration);
  }

}
