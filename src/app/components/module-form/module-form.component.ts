import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IotModuleService} from "../../services/iot-module.service";
import {Module} from "../../types/Module";
import {FormsModule} from "@angular/forms";
import {lastValueFrom} from "rxjs";
import {ErrorComponent} from "../../shared/error/error.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-module-form',
  standalone: true,
  imports: [
    FormsModule,
    ErrorComponent,
    NgIf
  ],
  templateUrl: './module-form.component.html',
  styleUrl: './module-form.component.css'
})
export class ModuleFormComponent implements OnInit{

  @Input() module: Module = <Module>{}
  @Input() type: string = ''
  moduleCopy: Module = <Module>{}

  correctResponse: boolean = false;
  badResponse: boolean = false;
  errorRender: ErrorDisplay = <ErrorDisplay> {}

  @Output() closeForm = new EventEmitter();
  @Output() addModule = new EventEmitter();
  @Output() saveModule = new EventEmitter();

  constructor(private iotModuleService: IotModuleService) {
  }

  async submit($event: any) {
    $event.preventDefault();
    if(this.type == 'create') {
      await this.createModule();
    } else {
      await this.editModule();
    }
  }

  async createModule() {
    this.module.status = 0;
    try {
      this.module = {...this.moduleCopy}
      const response = await lastValueFrom(this.iotModuleService.postModule(this.module));
      this.correctResponse = true;
      this.fillErrorMessage("Good", "Your module has been registered", "teal");
      setTimeout(() => {
        this.correctResponse = false;
        this.emitClose();
      }, 4000);
      // @ts-ignore
      this.addModule.emit(response.iot_module);
    } catch (e) {
      this.fillErrorMessage("Bad", "Your module did not pass well", "red");
      this.badResponse = true;
      setTimeout(() => {
        this.badResponse = false;
        this.emitClose();
      }, 4000);
    }
  }

  async editModule() {
    try {
      const response = await lastValueFrom(this.iotModuleService.editModule(this.moduleCopy));
      console.log(response);
      // @ts-ignore
      this.module = {...response.iot_module}
      this.badResponse = true;
      this.fillErrorMessage("Good", "Your module change has been registered", "teal");
      setTimeout(() => {
        this.correctResponse = false;
      }, 4000);
      this.emitClose();
      // @ts-ignore
      this.saveModule.emit(this.module);
    } catch (e) {
      this.fillErrorMessage("Bad", "Your module change did not pass well", "red");
      this.correctResponse = false;
      setTimeout(() => {
        this.badResponse = true;
      }, 4000);
    }
  }

  emitClose() {
    this.closeForm.emit()
  }

  fillErrorMessage (type: string, message: string, color: string) {
    this.errorRender.type = type;
    this.errorRender.color = color;
    this.errorRender.message = message;
  }

  ngOnInit() {
    this.moduleCopy = {...this.module};
  }
}

export interface ErrorDisplay  {
  type: string,
  color: string,
  message: string,
}


