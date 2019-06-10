import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
  }
  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    //this.oauthService.loadDiscoveryDocumentAndLogin();//Login requied
    this.oauthService.loadDiscoveryDocumentAndTryLogin();//Login not required, call by click "Login" button
  }
}