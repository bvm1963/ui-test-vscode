import { Routes } from '@angular/router';

import {
	DefaultPageComponent,
	MainPageComponent
} from './areas/main/index';
import {
	AgGridComponent,
	EjGridComponent,
	AppDxDataGridComponent,
	AppDxDropDownBoxComponent,
	EjMessageOkNoComponent,
	EjMessageOkComponent
} from './areas/ui/index';

import { NewDocumentComponent } from './areas/examples/index';
import { AboutComponent } from './areas/about/index';

export const appRoutes: Routes = [
	{ path: 'default', component: DefaultPageComponent },
	{
		path: 'main', component: MainPageComponent,
		children: [
			{ path: '', redirectTo: 'default', pathMatch: 'full' },
			{ path: 'default', component: DefaultPageComponent },
			{ path: 'ag-grid', component: AgGridComponent },
			{ path: 'ej-grid', component: EjGridComponent },
			{ path: 'dx-data-grid', component: AppDxDataGridComponent },
			{ path: 'dx-drop-down-box', component: AppDxDropDownBoxComponent },
			{ path: 'ej-message-okno', component: EjMessageOkNoComponent },
			{ path: 'ej-message-ok', component: EjMessageOkComponent },
			{ path: 'new-document', component: NewDocumentComponent },
			{ path: 'about', component: AboutComponent }
		]
	},
	{ path: '', component: DefaultPageComponent },
	{ path: '**', component: DefaultPageComponent }
];