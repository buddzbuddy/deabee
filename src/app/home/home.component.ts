import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";

import { CamundaRestService } from '../camunda-rest.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private fileToUpload: File = null;
  private SUCCESS: boolean = false;
  title: string = "ИСУ";
  constructor(private camundaRestService: CamundaRestService,
    private oauthService: OAuthService,
    private httpClient: HttpClient) {
    }
  ngOnInit() {
    
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.camundaRestService.deployProcess(this.fileToUpload).subscribe(data => {
      this.SUCCESS = true;
      }, error => {
        console.log(error);
    });
  }

  public login() {
    this.oauthService.initImplicitFlow();
    //this.oidcSecurityService.authorize();
  }

  public logoff() {
      this.oauthService.logOut();
      //this.oidcSecurityService.logoff();
  }

  public get claims() {
      let claims = this.oauthService.getIdentityClaims();
      return claims;
  }
  apiData : any = null;
  callApi() {
      this.httpClient.get('http://localhost:5001/api/identity').subscribe(data => {
        this.apiData = data;
      });
  }
}
