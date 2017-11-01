import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { ConfigService, CommonService } from '../../../infrastructure/index';
import { IMainMenu } from '../index';

@Injectable()
export class MenuService {
		baseUrl: string = '';
		mainMenu: IMainMenu[] = [];

	constructor(private http: Http,
		private configService: ConfigService,
		private commonService: CommonService) {

		this.baseUrl = configService.getApiURI('menu.json');
	}

	getMainMenu(): Observable<IMainMenu[]> {
		return this.http.get(this.baseUrl, this.commonService.getRequestOptions())
			.map((response: Response) => {
				return <IMainMenu[]>this.commonService.extractArray(response);
			})
			.catch(this.commonService.handleError);
	}
}