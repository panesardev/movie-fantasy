import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { ViewMovieComponent } from './view-movie/view-movie.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'sign-up', component: SignupComponent },
	{ path: 'view-movies/:type', component: ViewMoviesComponent },
	{ path: 'view-movie/:id', component: ViewMovieComponent },
	{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
