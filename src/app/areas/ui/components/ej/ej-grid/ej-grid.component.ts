import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { EJComponents } from 'ej-angular2';

import { MagazinesService } from '../../../services/magazines.service';
import { IMagazines } from '../../../index';

@Component({
	selector: 'app-ej-grid',
	templateUrl: './ej-grid.component.html',
	styleUrls: ['./ej-grid.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class EjGridComponent implements OnInit, OnDestroy {
	@ViewChild('grid') grid: EJComponents<any, any>;
	public errorMessage: string;
	public dsEjGridData: IMagazines[] = [];
	public prevId: number = 0;
	public pagesize: number;
	public selectionMode: any;
	public custom: any;
	// subscribe
	private aliveSubscribe: boolean = true;

	constructor(
		private magazinesService: MagazinesService) {
		this.pagesize = 7;
		this.selectionMode = { selectionMode: ["cell"] };
	}

	ngOnInit() {
		this.getData();
	}

	ngOnDestroy() {
		this.aliveSubscribe = false;
	}

	ngAfterViewInit() {
	}

	onCellSelecting(args): void {
	}

	onCellSelected(args): void {
		if (this.prevId != args.selectedData.Id) {
			this.prevId = args.selectedData.Id;
			console.log(args.selectedData.CodeOperation);
		}
	}

	onActionBegin(args) {
	}

	onActionComplete(args) {
		try {
			if (args.requestType == "paging" || args.requestType == "refresh") {
					this.grid.widget.selectCells([[0, [1]]]);
			}
	}
	catch (e) { }
	}

	//
	//
	//
	getData() {
		this.getEjGridData();
	}

	getEjGridData(): void {
		this.magazinesService
			.getMagazines()
			.takeWhile(() => this.aliveSubscribe)
			.subscribe(
			data => this.dsEjGridData = data,
			error => this.errorMessage = <any>error);
	}
}
