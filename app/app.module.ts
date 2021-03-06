﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {TableComponent} from './table.component';
import { ModalComponent } from './modal.component';
import { ModalTimeComponent } from './modal-time.component'
import { ModalAdminComponent } from './modal-admin.component'

import { UserService } from "./services/user.service";
import { TimeLogService } from './services/time-log.service';
import {ActivityService } from './services/activity.service';
import { ProjectService } from './services/project.service';
import { PagerService } from './services/pager.service';

import { EmptyDatePipe } from './pipes/empty-date.pipe';
import { DurationPipe } from './pipes/date-from-number.pipe';

import { NguiDatetimePickerModule } from '@ngui/datetime-picker'

@NgModule(
    {
        imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, NguiDatetimePickerModule],
        declarations: [AppComponent, TableComponent, EmptyDatePipe, DurationPipe, ModalComponent, ModalTimeComponent, ModalAdminComponent],
        providers: [UserService, TimeLogService, ProjectService, ActivityService, PagerService ], // регистрация сервисов
        bootstrap: [AppComponent],
        entryComponents: [ModalComponent]
    })
export class AppModule{}