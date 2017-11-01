import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { DxDropDownBoxComponent } from 'devextreme-angular';
import { DxDataGridComponent } from "devextreme-angular";

import { OperationsService } from '../../../services/operations.service';
import { IOperations } from '../../../index';

declare var require: any

@Component({
	selector: 'app-dx-drop-down-box',
	templateUrl: './dx-drop-down-box.component.html',
	styleUrls: ['./dx-drop-down-box.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppDxDropDownBoxComponent implements OnInit, OnDestroy {
	@ViewChild("dropDownBox") dropDownBox: DxDropDownBoxComponent;
	@ViewChild('dataGrid') dataGrid: DxDataGridComponent;
	public errorMessage: string;
	public dsDxDropDownBox: IOperations[] = [];
	public focusCellIndex: number = 0;
	public _gridBoxValue: number;
	// subscribe
	private aliveSubscribe: boolean = true;

	constructor(private operationsService: OperationsService) { }

	ngOnInit() {
		this.getData();
	}

	ngOnDestroy() {
		this.aliveSubscribe = false;
	}

	ngAfterViewInit(): void {
		this.dropDownBox.instance.option("dropDownOptions.width", 0);
		this.dropDownBox.instance.option("dropDownOptions.height", 0);

		this.dropDownBox.instance.open();
		this.dropDownBox.instance.close();

		this.dropDownBox.instance.option("dropDownOptions.width", 330);
		this.dropDownBox.instance.option("dropDownOptions.height", "auto");

		var DevExpress = require("devextreme/bundles/modules/core");
		var ui = DevExpress.ui = require("devextreme/bundles/modules/ui");
		ui.dxOverlay = require("devextreme/ui/popup");
		ui.dxOverlay.baseZIndex(3000000000);
	}

	//
	//
	//
	onOpened(e) {
		try {
			this.dataGrid.instance.selectRowsByIndexes([0]);
			this._gridBoxValue = this.dataGrid.instance.getSelectedRowsData()[0]["Id"];
		}
		catch (e) { }
	}

	onClosed(e) {
		if (this.dropDownBox.value != undefined){
			console.log(this.dropDownBox.value);
		}
	}

	get gridBoxValue(): number {
		return this._gridBoxValue;
	}

	set gridBoxValue(value: number) {
		this._gridBoxValue = value;
	}

	gridBox_displayExpr(item) {
		return item && item.OperationsCaption + " : " + item.OperationsCode;
	}

	//
	// dataGrid
	//
	onContentReady(e) {
	}

	onSelectionChanged(e) {
		this._gridBoxValue = e.selectedRowsData[0]["Id"];
	}

	onRowPrepared(e) {
	}

	onRowClick(e) {
		let component = e.component;
		let prevClickTime = component.lastClickTime;

		component.lastClickTime = new Date();

		if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
			//Double click code
			this.dropDownBox.instance.close();
		}
		else {
			//Single click code
		}
		e.jQueryEvent.stopPropagation();
	}

	onCellPrepared(e) {
		if (e.rowType == 'data' && e.column.dataField === 'OperationsCode') {
			e.cellElement.css('background-color', '#FFF8DC');
		}
	}

	onCellClick(e) {
		let rowIndex = e.rowIndex;
		let colIndex = e.columnIndex;
		e.component.focus(e.component.getCellElement(rowIndex, colIndex));

		this.focusCellIndex = e.columnIndex;
	}

	onKeyDown(e) {
		let selKey = e.component.getSelectedRowKeys();
		if (selKey.length) {
			let currentKey = selKey[0];
			var index = e.component.getRowIndexByKey(currentKey);
			let countRows = e.component.totalCount();
			if (e.jQueryEvent.keyCode == 38) {

				index--;
				if (index < 0) {
					index = 0;
				}

				if (index >= 0) {
					e.component.selectRowsByIndexes([index]);
					e.jQueryEvent.stopPropagation();
				}
			}
			else if (e.jQueryEvent.keyCode == 40) {
				index++;
				if (index < countRows) {
					e.component.selectRowsByIndexes([index]);
					e.jQueryEvent.stopPropagation();
				}
			}

			if (e.jQueryEvent.keyCode == 13) {
				console.log('enter');
				this.dropDownBox.instance.close();
			}
		}
	}

	//
	//
	//
	getData() {
		this.getDxDropDownBox();
	}

	getDxDropDownBox(): void {
		this.operationsService
			.getOperations()
			.takeWhile(() => this.aliveSubscribe)
			.subscribe(
			data => this.dsDxDropDownBox = data,
			error => this.errorMessage = <any>error);
	}
}
