import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

/*
var config = {
  apiKey: "AIzaSyDm1sHvvJTyMfz8JTDSfEXfYhFV4LN7P0U",
  authDomain: "fitness-app-7137b.firebaseapp.com",
  databaseURL: "https://fitness-app-7137b.firebaseio.com",
  projectId: "fitness-app-7137b",
  storageBucket: "fitness-app-7137b.appspot.com",
  messagingSenderId: "497298002370"
};
*/