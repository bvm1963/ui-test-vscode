import { Component, OnInit, ViewChild, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { EJComponents } from 'ej-angular2';

import { AppDxDropDownBoxComponent } from '../../../ui/components/dx/dx-drop-down-box/dx-drop-down-box.component';

declare var require: any

@Component({
	selector: 'app-new-document',
	templateUrl: './new-document.component.html',
	styleUrls: ['./new-document.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class NewDocumentComponent implements OnInit {
	@ViewChild('newDocument') newDocument: EJComponents<any, any>;
	@ViewChild("popupOperations") popupOperations: AppDxDropDownBoxComponent;
	@ViewChild('dateDocument') dateDocument: EJComponents<any, any>;
	showOnInit: boolean;
	enablemodal: boolean;
	resize: boolean;
	responsive: boolean;
	target: any;
	inputError: boolean;
	//
	// ej-datepicker
	//
	locale: string;
	initDate: Date;

	constructor() {
		this.showOnInit = false;
		this.enablemodal = true;
		this.resize = false;
		this.responsive = false;
		this.target = ".area-modal";
		//
		// ej-datepicker
		//
		//this.locale = 'ru-RU';
		this.locale = 'de-DE';
		this.initDate = new Date();
		this.initDate.setDate(this.initDate.getDate() - 1);
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	onClick(args) {
		this.newDocument.widget.element.ejDialog('open');
}

	showDialog() {
		this.newDocument.widget.element.ejDialog('open');
	}

	onClose(args) {
		this.inputError = false;
	}

	@Output() clickOk = new EventEmitter<NewDocumentEventArgs>();
	onOK(args) {
		if (this.popupOperations.dropDownBox.text == '' ||
			this.dateDocument.widget.element[0].value.toString().length < 10) {
			this.inputError = true;
			return;
		}

		let dateValue: string[] = this.dateDocument.widget.element[0].value.split('.');
		let dd: string = dateValue[0];
		let mm: string = dateValue[1];
		let year: string = dateValue[2];

		let eventArgs = new NewDocumentEventArgs();
		eventArgs.operationsID = this.popupOperations.dropDownBox.value;
		eventArgs.dateDocument = mm + '.' + dd + '.' + year;
		eventArgs.dateDocumentStr = this.dateDocument.widget.element[0].value;
		this.clickOk.emit(eventArgs);

		this.inputError = false;
		this.newDocument.widget.element.ejDialog('close');

		console.log(this.popupOperations.dropDownBox.value);
		console.log(this.dateDocument.widget.element[0].value);
	}

	onCancel(args) {
		this.inputError = false;
		this.newDocument.widget.element.ejDialog('close');
	}
}

export class NewDocumentEventArgs {
	public operationsID: number;
	public dateDocument: string;
	public dateDocumentStr: string;
	constructor() {
	}
}
