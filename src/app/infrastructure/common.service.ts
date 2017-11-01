import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {

		public handleError(error: any) {
				var applicationError = error.headers.get('Application-Error');
				var serverError = error.json();
				var modelStateErrors: string = '';

				if (!serverError.type) {
						console.log(serverError);
						for (var key in serverError) {
								if (serverError[key])
										modelStateErrors += serverError[key] + '\n';
						}
				}

				modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

				return Observable.throw(applicationError || modelStateErrors || 'Server error');
		}

		public extractArray(response: Response, showprogress: boolean = true) {
				let data = response.json();
				return data || [];
		}

		// returns a viable RequestOptions object to handle Json requests
		public getRequestOptions() {
				return new RequestOptions({
						headers: new Headers({
								"Content-Type": "application/json"
						})
				});
		}
}