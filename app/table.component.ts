import { Component, Input} from '@angular/core';

export class User
{
    ID: number;
    Name: string; 
}
@Component(
    {
    selector: 'table-logs',
    template: `<div class="userPanel"> Сотрудник: [user.Name] 
                    <button class="btn btn-default" (click)="Exit()">Выйти</button>
               <\div>
               <table class="table table-striped">
                   <thead>
                       <tr>
                          <th>Проект</th>
                          <th>Позиция</th>
                          <th>Статус</th>
                          <th>Время начала</th>
                          <th>Потраченное время</th>
                          <th>Время завершения</th>
                          <th></th>
                          <th></th>
                          <th></th>
                      </tr>
                    </thead>
               </table>`
    })
export class TableComponent
{
    @Input() UserID: number;
    user: User = new User();
}