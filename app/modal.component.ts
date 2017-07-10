import {Component, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'app-modal',
    template: `
  <div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <ng-content select=".app-modal-header"></ng-content>
        </div>
        <div class="modal-body">
          <ng-content select=".app-modal-body"></ng-content>
        </div>
        <div class="modal-footer">
          <ng-content select=".app-modal-footer"></ng-content>
          <button class="btn btn-default"(click)="hide(true)" >Добавить</button >
          <button class="btn btn-default"(click)="hide(false)" >Отменить</button >
        </div>
      </div>
    </div>
  </div>
  `,
    styles: [`
    .modal {
      background: rgba(0,0,0,0.6);
    }
  `]
})
export class ModalComponent {

    public visible = false;
    private visibleAnimate = false;
    @Output() ok = new EventEmitter<boolean>();
    constructor() { }

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(param: boolean): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
        this.ok.emit(param);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide(false);
        }
    }

}
