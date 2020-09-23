import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.dto';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-view-movie',
	templateUrl: './view-movie.component.html',
	styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {

	movie: Movie = new Movie();
	poster: string;
	title: string;
	keywords: string[] = [];
	loading: boolean;

	private movieId: number;

	constructor(
		private readonly movieService: MovieService,
		private readonly route: ActivatedRoute
	) {
		this.route.params.subscribe(async value => {
			this.loading = true;

			this.movieId = value.id;
			this.movie = await this.movieService.movie(this.movieId);

			if (this.movie.title.includes('(')) {
				const i = this.movie.title.indexOf('(');
				this.title = this.movie.title.slice(0, i);
			} else {
				this.title = this.movie.title;
			}

			this.poster = `https://image.tmdb.org/t/p/original${this.movie.poster_path}`;
			
			this.loading = false;
		});
	}

	async ngOnInit() {

	}

}
