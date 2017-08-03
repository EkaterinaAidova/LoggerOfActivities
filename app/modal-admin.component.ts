import {Component, Output, EventEmitter} from '@angular/core';
import {UserService} from './services/user.service'
import {PagerService} from './services/pager.service'
import {User} from './models/user.model'
@Component({
    selector: 'app-modal-admin',
    templateUrl: './app/html/modal-admin.component.html',
    styleUrls: ['./app/styles/shared.css']
})
export class ModalAdminComponent {

    public visible = false;
    private visibleAnimate = false;
    private userList: User[];
    private userId: number;
    pager: any = {};
    pagedItems: User[];
    constructor(private pagerService: PagerService, private userService: UserService) { }

    public show(): void {
        this.userService.getCurrentUser().subscribe(data => this.userId = data.UserInfo.ID);
        this.getUsers();
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide();
        }
    }
    public deleteUser(id: number)
    {
        this.userService.delete(id).subscribe(data => {
            if (data.ok) {
                this.getUsers();              
            }
            else {
                alert(data.text());
            }
        });
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.userList.length, page);
        this.pagedItems = this.userList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    getUsers()
    {
        this.userService.getUsers().subscribe(data => this.userList = data);
        this.pager = this.pagerService.getPager(this.userList.length, this.pager.currentPage);
        this.pagedItems = this.userList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


}