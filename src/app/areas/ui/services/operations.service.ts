import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { ConfigService, CommonService } from '../../../infrastructure/index';
import { IOperations } from '../index';

@Injectable()
export class OperationsService {
		baseUrl: string = '';
		operations: IOperations[] = [];

		constructor(private http: Http,
				private configService: ConfigService,
				private commonService: CommonService) {

				this.baseUrl = configService.getApiURI('operations.json');
		}

		getOperations(): Observable<IOperations[]> {
				return this.http.get(this.baseUrl, this.commonService.getRequestOptions())
						.map((response: Response) => {
								return <IOperations[]>this.commonService.extractArray(response);
						})
						.catch(this.commonService.handleError);
		}
}