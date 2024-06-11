import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Module} from "../types/Module";
import {environement} from "../../env/environement";

@Injectable({
  providedIn: 'root'
})
export class IotModuleService {

  constructor(private http: HttpClient) { }

  postModule(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.post<Module>(environement.apiUrl + "/create", data, {headers})
  }

  getAllModules() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.get<Module[]>(environement.apiUrl + "/all", {headers})
  }

  deleteModuleById(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.delete<String>(environement.apiUrl + "/delete/" + id, {headers})
  }

  editModule(data: Module) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.post<Module>(environement.apiUrl + "/patch", data, {headers})
  }
}
