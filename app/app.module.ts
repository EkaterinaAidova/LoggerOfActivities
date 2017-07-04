import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { LoginService} from './services/login.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import {TableComponent} from './table.component'

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule],
    declarations: [AppComponent, LoginComponent, TableComponent],
    providers: [LoginService], // регистрация сервисов
    bootstrap: [AppComponent]
})
export class AppModule { }