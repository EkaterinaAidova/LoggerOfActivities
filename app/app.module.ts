import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { LoginService} from './services/login.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import {TableComponent} from './table.component';
import { UserService } from "./services/user.service";
import { TimeLogService } from './services/time-log.service';
import { EmptyDatePipe } from './table.component';

@NgModule(
    {
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule],
    declarations: [AppComponent, LoginComponent, TableComponent, EmptyDatePipe],
    providers: [LoginService, UserService, TimeLogService ], // регистрация сервисов
    bootstrap: [AppComponent]
    })
export class AppModule
{
}