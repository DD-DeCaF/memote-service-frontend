import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import * as Rx from 'rxjs/';

import {URLS} from '../api_urls';



@Injectable()
export class ApiService {

  public reportObservable: Rx.Observable<any>;
  private reportSubject: Rx.Subject<any>;
  public report: any;

  constructor(private http: HttpClient) {

    this.reportSubject = new Rx.Subject();
    this.reportObservable = this.reportSubject.asObservable();
  }

  getApiUrl(path) {
    return URLS[path];
  }

  upload(file) {
    const fd = new FormData();
    fd.append('model', file);
    return this.http.post(this.getApiUrl('submit'), fd);
  }

  getStatus(id) {
    const url = this.getApiUrl('status') + id;
    return this.http.get(url);
  }

  getReport(id) {
    const url = this.getApiUrl('report') + id;
    return this.http.get(url);
  }

  public setReport(data: any) {
    this.report = data;
    this.reportSubject.next(data);
  }

  public getReportData() {
    return this.report;
  }

}
