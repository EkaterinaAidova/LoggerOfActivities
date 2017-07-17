"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
let ModalComponent = class ModalComponent {
    constructor() {
        this.visible = false;
        this.visibleAnimate = false;
        this.ok = new core_1.EventEmitter();
        this.openned = new core_1.EventEmitter();
    }
    show() {
        this.openned.emit(true);
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }
    hide(param) {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
        this.ok.emit(param);
    }
    onContainerClicked(event) {
        if (event.target.classList.contains('modal')) {
            this.hide(false);
        }
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], ModalComponent.prototype, "ok", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], ModalComponent.prototype, "openned", void 0);
ModalComponent = __decorate([
    core_1.Component({
        selector: 'app-modal',
        templateUrl: './app/html/modal.component.html',
        styleUrls: ['./app/styles/shared.css']
    }), 
    __metadata('design:paramtypes', [])
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map