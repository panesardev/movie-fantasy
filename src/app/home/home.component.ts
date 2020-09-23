import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { Movie } from '../models/movie.dto';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	userLogged: boolean = false;

	trending: Movie[] = [];
	trendingBackdrops: string[] = [];

	popular: Movie[] = [];
	popularBackdrops: string[] = [];

	recommended: Movie[] = [];
	recommendedBackdrops: string[] = [];

	upcoming: Movie[] = [];
	upcomingBackdrops: string[] = [];

	loading: boolean = false;

	constructor(
		private readonly movieService: MovieService,
		private readonly userService: UserService
	) { }

	async ngOnInit() {
		this.loading = true;
		this.trending = await this.movieService.trending();
		this.trending.forEach(movie => {
			this.trendingBackdrops.push(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
		});

		this.popular = await this.movieService.popular();
		this.popular.forEach(movie => {
			this.popularBackdrops.push(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
		});

		this.upcoming = await this.movieService.upcoming();
		this.upcoming.forEach(movie => {
			this.upcomingBackdrops.push(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
		});

		if (this.userService.user !== null) {
			this.userLogged = true;
			this.recommended = await this.movieService.recommended();
			this.recommended.forEach(movie => {
				this.recommendedBackdrops.push(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
			});
		} else {
			this.userLogged = false;
		}

		this.recommended.forEach(movie => {
			if (movie.title.includes('(')) {
				const i = movie.title.indexOf('(');
				const title = movie.title.slice(0, i);
				movie.title = title;
			}
		});
		this.trending.forEach(movie => {
			if (movie.title.includes('(')) {
				const i = movie.title.indexOf('(');
				const title = movie.title.slice(0, i);
				movie.title = title;
			}
		});
		this.upcoming.forEach(movie => {
			if (movie.title.includes('(')) {
				const i = movie.title.indexOf('(');
				const title = movie.title.slice(0, i);
				movie.title = title;
			}
		});
		this.popular.forEach(movie => {
			if (movie.title.includes('(')) {
				const i = movie.title.indexOf('(');
				const title = movie.title.slice(0, i);
				movie.title = title;
			}
		});

		this.loading = false;
	}

}
