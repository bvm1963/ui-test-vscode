import { Injectable } from "@angular/core";

import { IMainMenu } from '../../ui/interfaces/menu.interface';

@Injectable()
export class MainService {
        mainMenu: IMainMenu[] = [];
}