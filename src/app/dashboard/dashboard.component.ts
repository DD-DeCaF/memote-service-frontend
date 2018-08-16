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
  public errorMessage: any = '';

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
        if (error.status = 404) {
          this.errorMessage = 'Your model has not been found. Please check that the url entered is correct.';
        } else {
          this.errorMessage = 'Your model is still being processed. Try again later';
        }
        this.uiStatus = 'error';
      });
    }
  }

  ngOnInit() {
  }
}
