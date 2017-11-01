import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { ConfigService, CommonService } from '../../../infrastructure/index';
import { IMagazines} from '../index';

@Injectable()
export class MagazinesService {
		baseUrl: string = '';

		constructor(private http: Http,
				private configService: ConfigService,
				private commonService: CommonService) {

				this.baseUrl = configService.getApiURI('magazines.json');
		}

		getMagazines(): Observable<IMagazines[]> {
				return this.http.get(this.baseUrl, this.commonService.getRequestOptions())
						.map((response: Response) => {
								return <IMagazines[]>this.commonService.extractArray(response);
						})
						.catch(this.commonService.handleError);
		}
}