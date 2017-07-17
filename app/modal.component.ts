import {Component, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'app-modal',
    templateUrl:'./app/html/modal.component.html' ,
    styleUrls: ['./app/styles/shared.css']
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
