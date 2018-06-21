///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

import { ApiService } from '../providers/api-service.service';


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

  ngOnInit() {
  }

  constructor(
    private apiService: ApiService,
    private router: Router) { }

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
      this.apiService.getStatus(uuid).subscribe(result => {
        Observable.interval(1000)
          .switchMap(() => this.apiService.getStatus(uuid))
          .do(status => {
            console.log('DATA', status);
            this.status = (<any>status).status;
            if ((<any>result).finished) {
              this.apiService.getReport(uuid).subscribe(report => {
                this.uiStatus = 'success';
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
            },
            error => this.uiStatus = 'error');
      }, error => {
        this.uiStatus = 'error';

      });
    }, error => {
      this.uiStatus = 'error';
    });
  }

}
