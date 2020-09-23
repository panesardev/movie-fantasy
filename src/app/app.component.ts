import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
	selector: 'app-root',
	template: `
		<main class="container">
			<div *ngIf="loading; else show">
				<p class="loading-server py-2 px-3 center">Setting up server, please wait</p>
				<app-loading></app-loading>
			</div>
			<ng-template #show>
				<app-header></app-header>
				<app-search></app-search>
				<div class="mt-2 mb-5 pb-5">
					<router-outlet></router-outlet>
				</div>
			</ng-template>
		</main>
	`,
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	loading: boolean = false;
	
	constructor(private movieService: MovieService) {
	}

	async ngOnInit() {
		this.loading = true;
		await this.movieService.trending();
		this.loading = false;
	}
}
