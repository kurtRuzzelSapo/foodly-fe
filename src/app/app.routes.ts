import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { HomepageComponent } from './features/user/homepage/homepage.component';
import { AuthGuard } from './core/services/authService/auth.guard';

export const routes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'

  },

  { path: 'login',
    component: LoginComponent
  },

  { path: 'register',
    component: RegisterComponent },

  { path: 'homepage',
    component: HomepageComponent,
  },

  //This is for the Authorize Doings
  // { path: 'homepage',
  //   component: HomepageComponent,
  //   canActivate: [AuthGuard],
  //   data: { role: 'admin' }, // Restrict to admin role
  // },



  { path: '**', component: PagenotfoundComponent }
];
