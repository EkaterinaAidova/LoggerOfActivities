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
let NumberDatePipe = class NumberDatePipe {
    transform(num, args) {
        let seconds = Math.round(num % 60);
        let minutes = 0;
        if (num >= 60)
            minutes = Math.round(num / 60);
        let hours = 0;
        if (num >= 3600)
            hours = Math.round(num / 3600);
        //let hours = num / 1000 / 60 / 60;
        //  minutes -= hours * 60; 
        let res = hours + "ч " + minutes + "м " + seconds + "сек";
        return res;
    }
};
NumberDatePipe = __decorate([
    core_1.Pipe({
        name: 'numberDate'
    }), 
    __metadata('design:paramtypes', [])
], NumberDatePipe);
exports.NumberDatePipe = NumberDatePipe;
//# sourceMappingURL=date-from-number.pipe.js.map