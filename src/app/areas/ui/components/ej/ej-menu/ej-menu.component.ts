import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuService } from '../../../services/menu.service';
import { IMainMenu } from '../../../index';

@Component({
  selector: 'app-ej-menu',
  templateUrl: './ej-menu.component.html',
  styleUrls: ['./ej-menu.component.css']
})
export class EjMenuComponent implements OnInit {
		errorMessage: string;
		mainMenu: IMainMenu[] = [];
		fieldsvalues: any;
		selectedItem: IMainMenu;
		itemTypeInt: number;

		constructor(
				private router: Router,
				private menuService: MenuService
		) { }

		ngOnInit() {
				this.mainMenu = this.menuService.mainMenu;

				this.fieldsvalues = {
						dataSource: this.mainMenu,
						parentId: "ParentID",
						id: "Id",
						text: "MenuCaption"
				};
		}

		onClick(args) {
				if (args.ID != undefined) {
						this.selectedItem = this.mainMenu.filter(p => p.Id == args.ID)[0];
						this.itemTypeInt = this.selectedItem.ItemTypeInt;

						if (this.itemTypeInt == 1) {
								//console.log(this.selectedItem.MenuCaption + ":" + this.selectedItem.PageRoute);
								this.router.navigate(['/' + this.selectedItem.PageRoute]);
						}
				}
		}
}
