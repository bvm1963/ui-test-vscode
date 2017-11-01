import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuService } from './services/menu.service';
import { MagazinesService } from './services/magazines.service';
import { OperationsService } from './services/operations.service';

// Syncfusion
import { EJAngular2Module } from 'ej-angular2';
import 'syncfusion-ej-global-all/i18n/ej.culture.ru-RU.min.js';
import 'syncfusion-ej-global-all/l10n/ej.localetexts.ru-RU.min.js';
import 'syncfusion-ej-global-all/i18n/ej.culture.de-DE.min.js';
import 'syncfusion-ej-global-all/l10n/ej.localetexts.de-DE.min.js';
//
import { EjMenuComponent } from './components/ej/ej-menu/ej-menu.component';
import { EjGridComponent } from './components/ej/ej-grid/ej-grid.component';
import { EjMessageOkNoComponent } from './components/ej/ej-message-okno/ej-message-okno.component';
import { EjMessageOkComponent } from './components/ej/ej-message-ok/ej-message-ok.component';

// ag-grid
import { AgGridModule } from "ag-grid-angular/main";
//
import { AgGridComponent } from './components/ag/ag-grid/ag-grid.component';

// DevExtreme
import { DxDataGridModule } from 'devextreme-angular';
import { DxDropDownBoxModule } from 'devextreme-angular';
import { DxPopupModule, DxTemplateModule } from 'devextreme-angular';
//
import { AppDxDataGridComponent } from './components/dx/dx-data-grid/dx-data-grid.component';
import { AppDxDropDownBoxComponent } from './components/dx/dx-drop-down-box/dx-drop-down-box.component';

@NgModule({
    declarations: [
        EjMenuComponent,
        EjGridComponent,
        EjMessageOkNoComponent,
        EjMessageOkComponent,
        AgGridComponent,
        AppDxDataGridComponent,
        AppDxDropDownBoxComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        EJAngular2Module.forRoot(),
        AgGridModule.withComponents([]),
        DxDataGridModule,
        DxDropDownBoxModule,
        DxPopupModule,
        DxTemplateModule
    ],
    providers: [
        MenuService,
        MagazinesService,
        OperationsService
    ],
    exports: [
        EjMenuComponent,
        EjGridComponent,
        EjMessageOkNoComponent,
        EjMessageOkComponent,
        AgGridComponent,
        AppDxDataGridComponent,
        AppDxDropDownBoxComponent
    ]
})

export class UiModule { }