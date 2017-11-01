import { Component, OnInit, ViewChild, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { EJComponents } from 'ej-angular2';

@Component({
	selector: 'app-ej-message-ok',
	templateUrl: './ej-message-ok.component.html',
	styleUrls: ['./ej-message-ok.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class EjMessageOkComponent implements OnInit {
	@ViewChild('messageOk') messageOk: EJComponents<any, any>;
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
		this.messageOk.widget.element.ejDialog('open');
	}

	onClose(args) {
	}

	@Output() clickOk = new EventEmitter<MessageOkEventArgs>();
	onOK(args) {
		let eventArgs = new MessageOkEventArgs();
		this.clickOk.emit(eventArgs);
		this.messageOk.widget.element.ejDialog('close');
	}

	@Output() clickCancel = new EventEmitter<MessageOkEventArgs>();
	onCancel(args) {
		let eventArgs = new MessageOkEventArgs();
		this.clickCancel.emit(eventArgs);
		this.messageOk.widget.element.ejDialog('close');
	}

	onClick(args) {
		this.message = "Hello";
		this.messageOk.widget.element.ejDialog('open');
	}
}

export class MessageOkEventArgs {

	constructor() {
	}
}

