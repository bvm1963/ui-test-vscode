import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EJAngular2Module } from 'ej-angular2';
import { UiModule } from '../ui/index';

import { NewDocumentComponent } from './components/new-document/new-document.component';

@NgModule({
		declarations: [
				NewDocumentComponent
		],
		imports: [
				BrowserModule,
				FormsModule,
				ReactiveFormsModule,
				EJAngular2Module.forRoot(),
				UiModule
		],
		providers: [
		],
		exports: [
				NewDocumentComponent
		]
})

export class ExamplesModule { }