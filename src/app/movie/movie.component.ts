import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.dto';

@Component({
	selector: 'app-movie',
	template: `
	<div class="col-sm-2 px-1 animate__animated animate__zoomIn animate__faster">
		<div class="movie" [ngClass]="mt ? 'mt-3' : ''">
			<a class="text-light" routerLink="/view-movie/{{ movie.id }}">
				<img [src]="backdropUrl" alt="backdrop" height="270">
			</a>
		</div>
	</div>`,
	styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

	@Input() movie: Movie;
	@Input() mt: boolean;

	title: string;
	backdropUrl: string;

	constructor() { }

	ngOnInit(): void {
		this.backdropUrl = 'https://image.tmdb.org/t/p/original' + this.movie.poster_path;
		if (this.movie.title.includes('(')) {
			const i = this.movie.title.indexOf('(');
			this.title = this.movie.title.slice(0, i);
		} else {
			this.title = this.movie.title;
		}
	}

}
