import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-view-movies',
	template: `
		<section>
			<h1 class="text-yellow font-2rem">{{ title }}</h1>
			<div *ngIf="loading; else trending">
				<app-loading></app-loading>
			</div>
			<ng-template #trending>
				<div *ngFor="let movie of movies">
					<app-movie [movie]="movie" [mt]="true"></app-movie>
				</div>
			</ng-template>
		</section>`
})
export class ViewMoviesComponent implements OnInit {

	movies: Movie[];
	loading = false;
	title: string;

	constructor(
		private readonly movieService: MovieService,
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(async data => {
			this.loading = true;
			const type = data.type;

			switch (type) {
				case 'trending':
					this.title = 'Trending Movies';
					this.movies = await this.movieService.trending(true);
					break;
				case 'popular':
					this.title = 'Popular Movies';
					this.movies = await this.movieService.popular(true);
					break;
				case 'upcoming':
					this.title = 'Upcoming Movies';
					this.movies = await this.movieService.upcoming(true);
					break;
				default:
					this.router.navigate(['/home']);
					break;
			}
			this.loading = false;
 		});
	}

}
