import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	template: `
		<div class="center">
			<button class="float-left btn-yellow px-3 py-1" 
			*ngIf="btnShow"
			(click)="back()"><i class="fas fa-chevron-left"></i></button>

			<p *ngIf="searchError">We cannot find movie with that name.</p>
			
			<form (submit)="searchMovie()">
				<input type="text" [ngClass]="error ? 'error' : ''" [(ngModel)]="search" name="search" class="px-3 py-1" placeholder="Search movies . . .">
				<button class="btn-yellow py-1 px-3 ml-2" type="submit"><i class="fas fa-search"></i></button>
			</form>
		</div>
	`,
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	search: string;
	error = false;	
	searchError = false;
	btnShow: boolean;

	constructor(
		private readonly movieService: MovieService,
		private readonly router: Router
	) { }

	ngOnInit(): void {
		this.router.events.subscribe(() => this.showHideBtn());
	}

	async searchMovie() {
		if (this.search) {
			const response = await this.movieService.search(this.search);
			if (response.length !== 0) {
				this.router.navigate([`/view-movie/${response[0].id}`]);
				this.search = '';
			} else {
				this.searchError = true;
			}
		} else {
			this.error = true;
		}
	}

	showHideBtn(): void {
		this.btnShow = this.router.url !== '/home';
	}

	back(): void {
		window.history.back();
	}

}
