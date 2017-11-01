import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    apiURI: string;

    constructor() {
        this.apiURI = 'api/';
    }

    getApiURI(controller: string) {
        return this.apiURI + controller;
    }
}