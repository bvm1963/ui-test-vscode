import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ViewContainerRef } from '@angular/core';

import { GridOptions } from "ag-grid/main";
import { NavigateToNextCellParams } from "ag-grid/dist/lib/entities/gridOptions";
import { GridCellDef } from "ag-grid/dist/lib/entities/gridCell";

import { MagazinesService } from '../../../services/magazines.service';
import { IMagazines } from '../../../index';

@Component({
	selector: 'app-ag-grid',
	templateUrl: './ag-grid.component.html',
	styleUrls: ['./ag-grid.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AgGridComponent implements OnInit, OnDestroy {
	@ViewChild('grid', { read: ViewContainerRef }) grid;
	public errorMessage: string;
	public dsAgGridData: IMagazines[] = [];
	public prevRowIndex: number = 0;
	public gridOptions: GridOptions;
	public columnDefs: any[];
	// subscribe
	private aliveSubscribe: boolean = true;

	constructor(
		private magazinesService: MagazinesService) {
		this.gridOptions = <GridOptions>{
			rowHeight: 20,
			enableColResize: true,
			localeText: {
				noRowsToShow: 'loading data ...'
			},
			rowSelection: 'single',
			navigateToNextCell: (params: NavigateToNextCellParams): GridCellDef => {
				var previousCell = params.previousCellDef;
				var suggestedNextCell = params.nextCellDef;

				var KEY_UP = 38;
				var KEY_DOWN = 40;
				var KEY_LEFT = 37;
				var KEY_RIGHT = 39;

				switch (params.key) {
					case KEY_DOWN:
						previousCell = params.previousCellDef;
						// set selected cell on current cell + 1
						this.gridOptions.api.forEachNode((node) => {
							if (previousCell.rowIndex + 1 === node.rowIndex) {
								node.setSelected(true);
							}
						});
						return suggestedNextCell;
					case KEY_UP:
						previousCell = params.previousCellDef;
						// set selected cell on current cell - 1
						this.gridOptions.api.forEachNode((node) => {
							if (previousCell.rowIndex - 1 === node.rowIndex) {
								node.setSelected(true);
							}
						});
						return suggestedNextCell;
					case KEY_LEFT:
					case KEY_RIGHT:
						return suggestedNextCell;
					default:
						throw "this will never happen, navigation is always on of the 4 keys above";
				}
			}
		};

		this.gridOptions.rowStyle = { 'font-size': '12px' };

		this.columnDefs = [
			{ headerName: "ID", field: "Id", width: 40, editable: false, cellClass: 'text-align-left' },
			{ headerName: "Document", field: "NameOperation", width: 140, cellClass: 'text-align-left' },
			{ headerName: "Document number", field: "NumberDocument", width: 100, cellClass: 'text-align-left' },
			{ headerName: "Document date", field: "DateDocument", width: 70, cellClass: 'text-align-right' },
			{ headerName: "Operation code", field: "CodeOperation", width: 80, editable: false, cellClass: 'text-align-right' },
			{ headerName: "User", field: "UserName", width: 60, editable: false, cellClass: 'text-align-right' },
			{ headerName: "UserID", field: "UserID", width: 40, editable: false, cellClass: 'text-align-right' },
			{ headerName: "Recording date", field: "DateRecord", width: 100, editable: false, cellClass: 'text-align-left' }
		];
	}

	ngOnInit() {
		this.getData();
	}

	ngOnDestroy() {
		this.aliveSubscribe = false;
	}

	ngAfterViewInit() {
	}

	onGridReady(params) {
		params.api.sizeColumnsToFit();
		this.gridOptions.columnApi.setColumnWidth("DateRecord", 140, true);
	}

	onRowDataChanged(arg) {
		let rowCount = this.gridOptions.api.getDisplayedRowCount() - 1;
		if (rowCount > 0) {
			this.gridOptions.api.ensureIndexVisible(rowCount);
			this.gridOptions.api.setFocusedCell(rowCount, 'Id', null);
		}
	}

	onSelectionChanged(args) {
	}

	onCellFocused(args) {
		let row = this.gridOptions.api.getRowNode(args.rowIndex);
		if (row != undefined) {
			if (args.rowIndex != this.prevRowIndex) {
				this.prevRowIndex = args.rowIndex;
				console.log(row.data["CodeOperation"]);

				this.gridOptions.api.forEachNode(function (node) {
					if (node.rowIndex === args.rowIndex) {
						node.setSelected(true);
					}
				});
			}
		}
	}

	//
	//
	//
	getData() {
		this.getAgGridData();
	}

	getAgGridData(): void {
		this.magazinesService
			.getMagazines()
			.takeWhile(() => this.aliveSubscribe)
			.subscribe(
			data => this.dsAgGridData = data,
			error => this.errorMessage = <any>error);
	}
}
