import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenuService } from './areas/ui/services/menu.service';
import { IMainMenu } from './areas/ui/interfaces/menu.interface';

import { MainService } from './areas/main/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  errorMessage: string;
  // subscribe
  private aliveSubscribe: boolean = true;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private mainService: MainService) {
  }

  ngOnInit() {
    this.promiseGetMainMenu();
  }

  ngOnDestroy() {
    this.aliveSubscribe = false;
}

  promiseGetMainMenu() {
    Promise
      .resolve()
      .then(this.getMainMenu());
  }

  getMainMenu(): any {
    this.menuService
      .getMainMenu()
      .takeWhile(() => this.aliveSubscribe)
      .subscribe(
      data => this.initMainMenu(data),
      error => this.errorMessage = <any>error);
  }

  initMainMenu(data: IMainMenu[]): void {
    this.menuService.mainMenu = data;
    this.mainService.mainMenu = data;
    //console.log('mainService.mainMenu: ' + JSON.stringify(this.mainService.mainMenu));
    this.router.navigate(['/default']);
  }
}
