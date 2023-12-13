import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://localhost:44310',
            redirectUrl: 'http://localhost:4200/callback',
            postLogoutRedirectUri: window.location.origin,
            clientId: 'acme_web',
            scope: 'openid', // 'openid profile ' + your scopes
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            silentRenewUrl: window.location.origin + '/silent-renew.html',
            renewTimeBeforeTokenExpiresInSeconds: 30,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
