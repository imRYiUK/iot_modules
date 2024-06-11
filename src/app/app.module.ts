import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {environement} from "../env/environement";

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {provideRouter, RouterModule, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { getStorage, provideStorage } from "@angular/fire/storage"
import { getAuth, provideAuth } from "@angular/fire/auth"
import {BrowserModule} from "@angular/platform-browser";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
registerLocaleData(en);


@NgModule({
  declarations: [],
  imports: [
    // provideFirebaseApp(() => initializeApp(environement.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    CommonModule,
    BrowserModule,
    AngularFontAwesomeModule,
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule],

  providers: [
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environement.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())),
    provideAnimationsAsync(),
    provideHttpClient()]
})
export class AppModule { }
