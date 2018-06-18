///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import { Router } from '@angular/router';

import { ApiService } from "../providers/api-service.service";


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
    if(event){
      if (this.checkExtension(event.target.files[0].name)) {
        this.file = event.target.files[0]
      } else {
        alert('Format not valid, please upload .xml or .json');
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  checkExtension(filename) {
    var parts = filename.split('.');
    return (parts[parts.length - 1] === 'xml' || parts[parts.length - 1] === 'json');
  }

  uploadFiles() {
    this.uiStatus = 'loading';
    this.apiService.upload(this.file).subscribe(data => {
      const uuid = (<any>data).uuid;
      this.apiService.getStatus(uuid).subscribe(data => {
        Observable.interval(1000)
          .switchMap(() => this.apiService.getStatus(uuid))
          .do(data =>
          {
            console.log('DATA', data);
            this.status = (<any>data).status;
            if((<any>data).finished) {
              this.apiService.getReport(uuid).subscribe(data => {
                this.uiStatus = 'success';
                this.apiService.setReport(data);
                this.router.navigate(['dashboard', uuid]);
                }, error => {
                this.uiStatus = 'error';
              });
            }
          })
          .takeWhile((data) =>  !(<any>data).finished)
          .subscribe(
            (data) => {
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
