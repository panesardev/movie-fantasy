import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie.dto';

@Component({
	selector: 'app-movie-list',
	template: `
	<div class="col-md-2 movie-container" *ngFor="let movie of movies; let i = index">
		<div class="movie border">
			<a routerLink="/view-movie/{{ movie.id }}">
				<img [src]="backdrops[i]">
				<div class="overlay">
					<div class="text">{{ movie.title }}</div>
				</div>
			</a>
		</div>
	</div>`,
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

	@Input() movies: Movie[] = [];
	@Input() backdrops: string[] = [];

	showMovie = false;

	constructor() { }

}
