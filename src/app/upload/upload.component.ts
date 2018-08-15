///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../providers/api-service.service';
import {ReportDataService} from '../report-data.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UploadComponent implements OnInit {
  uiStatus = 'ideal';

  @ViewChild('file') fileInput: ElementRef;
  public file: File = null;
  public status: any = '';
  public url: any = '';


  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private report: ReportDataService) { }

  ngOnInit() {
    this.report.ngOnDestroy();
  }

  onFilesAdded(event) {
    if (event) {
      if (this.checkExtension(event.target.files[0].name)) {
        this.file = event.target.files[0];
      } else {
        alert('Format not valid, please upload .xml or .json');
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  checkExtension(filename) {
    const parts = filename.split('.');
    return (parts[parts.length - 1] === 'xml' || parts[parts.length - 1] === 'json');
  }

  uploadFiles() {
    this.uiStatus = 'loading';
    this.apiService.upload(this.file).subscribe(data => {
      const uuid = (<any>data).uuid;
      this.url = window.location.protocol + '//' + window.location.host + '/dashboard/' + uuid;
      this.apiService.getStatus(uuid).subscribe(result => {
        Observable.interval(1000)
          .switchMap(() => this.apiService.getStatus(uuid))
          .do(status => {
            console.log('DATA', status);
            this.status = (<any>status).status;
            if (this.status === 'finished') {
              console.log('IF THIS STATUS', this.status);
              this.apiService.getReport(uuid).subscribe(report => {
                this.uiStatus = 'success';
                console.log('REPOOOOOOOORT', report);
                this.apiService.setReport(report);
                this.router.navigate(['dashboard', uuid]);
                }, error => {
                this.uiStatus = 'error';
              });
            }
          })
          .takeWhile((observable) =>  !(<any>observable).finished)
          .subscribe(
            (observable) => {
              console.log('OBSERVABLE TAKE A WHILE', observable);
            }, error => this.uiStatus = 'error');
      }, error => {
        this.uiStatus = 'error';

      });
    }, error => {
      this.uiStatus = 'error';
    });
  }

}
