import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Module} from "../../types/Module";
import {NgIf} from "@angular/common";
import {IotModuleService} from "../../services/iot-module.service";
import {lastValueFrom} from "rxjs";
import {ErrorComponent} from "../../shared/error/error.component";
import {ErrorDisplay, ModuleFormComponent} from "../module-form/module-form.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    ErrorComponent,
    ModuleFormComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  @Input() module: Module = <Module> {};
  @Output() delete = new EventEmitter();
  @Output() saveModule = new EventEmitter();
  @ViewChild('dialog') dialog !: ElementRef<HTMLDialogElement>;

  correctResponse: boolean = false;
  badResponse: boolean = false;
  errorRender: ErrorDisplay = <ErrorDisplay> {}
  isModalEditVisible: boolean = false;

  constructor(private iotModuleService: IotModuleService) {
  }

  ngOnInit() {

  }

  async deleteModule() {
    const response = await lastValueFrom(this.iotModuleService.deleteModuleById(this.module.id));
    // @ts-ignore
    if (response.message == "deleted") {
      this.delete.emit(this.module.id);
      this.correctResponse = true;
      this.fillErrorMessage("Good", "Your module change has been registered", "teal");
      setTimeout(() => {
        this.correctResponse = false;
        this.dialog.nativeElement.close();
      }, 4000);
    } else {
      this.fillErrorMessage("Bad", "Your module change did not pass well", "red");
      this.badResponse = true;
      setTimeout(() => {
        this.badResponse = false;
        this.dialog.nativeElement.close();
        }, 4000);
    }
  }

  fillErrorMessage (type: string, message: string, color: string) {
    this.errorRender.type = type;
    this.errorRender.color = color;
    this.errorRender.message = message;
  }

  toggleModal(): void {
    this.isModalEditVisible = !this.isModalEditVisible;
  }

  editModule($event: any) {
    this.saveModule.emit($event)
  }

  NotNormaltoggleModal($event: MouseEvent) {
    $event.stopPropagation();
    this.dialog.nativeElement.show();
  }
}
