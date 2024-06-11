import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";


export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    // children: [
    //   { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    // ],
  },
];
