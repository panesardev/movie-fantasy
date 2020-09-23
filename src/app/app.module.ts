import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieComponent } from './movie/movie.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';
import { LoadingComponent } from './loading/loading.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { ViewMovieComponent } from './view-movie/view-movie.component';
import { SearchComponent } from './search/search.component';

@NgModule({
	declarations: [
		AppComponent,
		MovieListComponent,
		MovieComponent,
		HeaderComponent,
		HomeComponent,
		ProfileComponent,
		LoginComponent,
		SignupComponent,
		LoadingComponent,
		ViewMoviesComponent,
		ViewMovieComponent,
		SearchComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
		MovieService,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
