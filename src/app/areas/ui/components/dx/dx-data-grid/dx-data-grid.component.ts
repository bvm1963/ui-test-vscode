import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";

import { OperationsService } from '../../../services/operations.service';
import { IOperations } from '../../../index';

@Component({
	selector: 'app-dx-data-grid',
	templateUrl: './dx-data-grid.component.html',
	styleUrls: ['./dx-data-grid.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppDxDataGridComponent implements OnInit, OnDestroy {
	@ViewChild('dataGrid') dataGrid: DxDataGridComponent;
	public errorMessage: string;
	public dsDxData: IOperations[] = [];
	public focusCellIndex: number = 0;
	// subscribe
	private aliveSubscribe: boolean = true;

	constructor(private operationsService: OperationsService) { }

	ngOnInit() {
		this.getData();
	}

	ngOnDestroy() {
		this.aliveSubscribe = false;
	}

	ngAfterViewInit() {
	}

	onContentReady(e) {
		let countRows = e.component.totalCount();

		if (!e.component.getSelectedRowKeys().length) {
			e.component.selectRowsByIndexes([countRows - 1]);
			e.component.focus(e.component.getCellElement(countRows - 1, 1));
		}
	}

	onSelectionChanged(e) {
	}

	onRowPrepared(e) {
	}

	onRowClick(e) {
		let component = e.component;
		let prevClickTime = component.lastClickTime;

		component.lastClickTime = new Date();

		if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
			//Double click code
			console.log('double click');
		}
		else {
			//Single click code
			console.log('single click');
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
			}
		}
	}

	//
	//
	//
	getData() {
		this.getDxData();
	}

	getDxData(): void {
		this.operationsService
			.getOperations()
			.takeWhile(() => this.aliveSubscribe)
			.subscribe(
			data => this.dsDxData = data,
			error => this.errorMessage = <any>error);
	}
}
