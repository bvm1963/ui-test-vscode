import { Component, OnInit, ViewChild, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { EJComponents } from 'ej-angular2';

@Component({
	selector: 'app-ej-message-okno',
	templateUrl: './ej-message-okno.component.html',
	styleUrls: ['./ej-message-okno.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class EjMessageOkNoComponent implements OnInit {
	@ViewChild('messageOkNo') messageOkNo: EJComponents<any, any>;
	showOnInit: boolean;
	enablemodal: boolean;
	resize: boolean;
	responsive: boolean;
	target: any;
	message: string;

	constructor() {
		this.showOnInit = false;
		this.enablemodal = true;
		this.resize = false;
		this.responsive = false;
		this.target = ".area-modal";
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	showDialog() {
		this.messageOkNo.widget.element.ejDialog('open');
	}

	onClose(args) {
	}

	@Output() clickOk = new EventEmitter<MessageOkNoEventArgs>();
	onOK(args) {
		let eventArgs = new MessageOkNoEventArgs();
		this.clickOk.emit(eventArgs);
		this.messageOkNo.widget.element.ejDialog('close');
	}

	@Output() clickCancel = new EventEmitter<MessageOkNoEventArgs>();
	onCancel(args) {
		let eventArgs = new MessageOkNoEventArgs();
		this.clickCancel.emit(eventArgs);
		this.messageOkNo.widget.element.ejDialog('close');
	}

	onClick(args) {
		//{ document.getElementById("cancel").style.display = "none"; }
		{ document.getElementById("cancel").style.display = "block"; }
		this.message = "Hello";
		this.messageOkNo.widget.element.ejDialog('open');
	}
}

export class MessageOkNoEventArgs {

	constructor() {
	}
}

