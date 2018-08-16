import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ReportDataService } from './../report-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(
    private data: ReportDataService,
    private location: Location) { }

  ngOnInit() {
  }

  isNotUpload(): boolean {
    return this.location.path().indexOf('/upload') === -1;
  }
}
