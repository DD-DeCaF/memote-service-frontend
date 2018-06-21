import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { AppMaterialModule } from './app.material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UniversalCoreComponent } from './dashboard/universal-core/universal-core.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { ReportDataService } from './report-data.service';
import { KeysPipe } from './keys.pipe';
import { SystemInformationComponent } from './dashboard/system-information/system-information.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ResultButtonComponent } from './result-button/result-button.component';
import { VegaPlotComponent } from './vega-plot/vega-plot.component';
import { VegaBarChartComponent } from './vega-bar-chart/vega-bar-chart.component';
import { UploadComponent } from './upload/upload.component';
import { ApiService } from './providers/api-service.service';


const appRoutes: Routes = [
  { path: 'dashboard/:uuid', component: DashboardComponent },
  { path: 'upload', component: UploadComponent },
  { path: '',  redirectTo: '/upload',  pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    UniversalCoreComponent,
    StatisticsComponent,
    KeysPipe,
    SystemInformationComponent,
    AccordionComponent,
    ResultButtonComponent,
    VegaPlotComponent,
    VegaBarChartComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  exports: [
    BrowserModule,
    AppMaterialModule
  ],
  providers: [
    ReportDataService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {

  constructor(private reportDataService: ReportDataService) {
    // this.reportDataService.loadResults();
  }

  ngOnInit() {

  }
}
