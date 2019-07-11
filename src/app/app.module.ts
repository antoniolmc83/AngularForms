import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FirebaseInterceptor} from './core/interceptors/firebase.interceptor';
import { CounterInputComponent } from './shared/components/counter-input/counter-input.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    HomePageComponent,
    ErrorMessageComponent,
    CounterInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FirebaseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
