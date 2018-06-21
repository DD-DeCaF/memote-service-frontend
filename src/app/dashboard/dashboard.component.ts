import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReportDataService } from './../report-data.service';
import { ApiService } from '../providers/api-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  private uuid: any;
  public uiStatus = 'ideal';

  constructor(
    public data: ReportDataService,
    private route: ActivatedRoute,
    private apiService: ApiService
    ) {
    this.route.params.subscribe( params => this.uuid = params['uuid']);
    if (!this.apiService.getReportData()) {
      this.uiStatus = 'loading';
      this.apiService.getReport(this.uuid).subscribe(result => {
        this.uiStatus = 'success';
        this.apiService.setReport(result);
      }, error => {
        this.uiStatus = 'error';
      });
    }
  }

  ngOnInit() {
  }



}
