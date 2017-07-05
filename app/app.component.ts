import { Component } from '@angular/core';
import { LoginComponent } from './login';

@Component(
    {
    selector: 'my-app',
    
    template: `<login (logined)="OnChanged($event)"  [ngClass]="{invisible: logined}"> <\login> 
               <table-logs [UserID]="userId" [ngClass]="{invisible: showTable}" > <\table-logs>`
    })
export class AppComponent
{
    logined: boolean = false;
    showTable: boolean = true;
    userId: number;
    OnChanged(logined)
    {
        logined == true ? this.logined = true : this.logined = false;
        this.showTable = !this.logined;
    } 
}