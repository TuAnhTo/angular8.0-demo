import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { httpInterceptorProviders } from "./services/auth/auth-interceptor";
import { AdminComponent } from "./users/admin/admin.component";
import { LoginComponent } from "./users/login/login.component";
import { PmComponent } from "./users/pm/pm.component";
import { ProfileComponent } from "./users/profile/profile.component";
import { RegisterComponent } from "./users/register/register.component";
import { UserComponent } from "./users/user/user.component";
import { HeaderComponent } from './header/header.component';
import {WindowService} from './services/window.service';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [
    httpInterceptorProviders,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
