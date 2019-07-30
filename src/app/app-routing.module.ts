import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./users/admin/admin.component";
import { LoginComponent } from "./users/login/login.component";
import { PmComponent } from "./users/pm/pm.component";
import { ProfileComponent } from "./users/profile/profile.component";
import { UserComponent } from "./users/user/user.component";
import { RegisterComponent } from "./users/register/register.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "user",
    component: UserComponent
  },
  {
    path: "pm",
    component: PmComponent
  },
  {
    path: "admin",
    component: AdminComponent
  },
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: RegisterComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
