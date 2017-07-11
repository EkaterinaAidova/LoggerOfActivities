﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import {TableComponent} from './table.component';
import { ModalComponent } from './modal.component';

import { LoginService} from './services/login.service';
import { UserService } from "./services/user.service";
import { TimeLogService } from './services/time-log.service';
import {ActivityService } from './services/activity.service';
import { ProjectService } from './services/project.service';
import { PagerService } from './services/pager.service';

import { EmptyDatePipe } from './pipes/empty-date.pipe';
import { DurationPipe } from './pipes/date-from-number.pipe';

@NgModule(
    {
        imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule],
        declarations: [AppComponent, LoginComponent, TableComponent, EmptyDatePipe, DurationPipe, ModalComponent],
        providers: [LoginService, UserService, TimeLogService, ProjectService, ActivityService, PagerService ], // регистрация сервисов
        bootstrap: [AppComponent],
        entryComponents: [ModalComponent]
    })
export class AppModule
{
}