import {Component, inject, model, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router'
import {Module, ModuleStatus} from "./types/Module";
import {NgForOf, NgIf} from "@angular/common";
import {CardComponent} from "./components/card/card.component";
import {ClickOutsideDirective} from "./directives/click-outside.directive";
import {ModuleFormComponent} from "./components/module-form/module-form.component";
import {IotModuleService} from "./services/iot-module.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, NgForOf, CardComponent, ClickOutsideDirective, NgIf, ModuleFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'test';
  isModalVisible = false;
  localModules: Module[] = [];
  isModalEditVisible: boolean = false;

  toggleModal(): void {
    this.isModalVisible = !this.isModalVisible
  }

  constructor(private iotModuleService: IotModuleService) {
  }

  pushModule(module: Module) {
    this.localModules.push(module);
  }

  async ngOnInit() {
    const response = await lastValueFrom(this.iotModuleService.getAllModules());
    // @ts-ignore
    if (response.iot_modules) {
      // @ts-ignore
      this.localModules = response.iot_modules
    }
  }

  removeModule(id: string) {
    this.localModules = this.localModules.filter(module => module.id !== id);
  }

  editModule($event: Module) {
    this.localModules = this.localModules.map(module => {
      if (module.id === $event.id) {
        return { ...$event};
      }
      return module;
    });
  }
}
