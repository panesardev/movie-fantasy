import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Movie } from '../models/movie.dto';

@Injectable({ providedIn: 'root' })
export class MovieService {

	// private host = 'http://localhost:3000/movie';
	private host = 'https://panesar-cors-anywhere.herokuapp.com/http://movies-nest-api.herokuapp.com/movie';

	private searchUrl = `${this.host}/search`;
	private trendingUrl = `${this.host}/trending`;
	private recommendedUrl = `${this.host}/recommended`;
	private popularUrl = `${this.host}/popular`;
	private getUrl = `${this.host}/get`;
	private keywordsUrl = `${this.host}/keywords`;
	private upcomingUrl = `${this.host}/upcoming`;

	constructor(
		private readonly http: HttpClient,
		private readonly userService: UserService
	) { }

	search(text: string): Promise<Movie[]> {
		return this.http.get<Movie[]>(`${this.searchUrl}/${text}`).toPromise();
	}

	trending(all: boolean = false): Promise<Movie[]> {
		return all ? this.http.get<Movie[]>(`${this.trendingUrl}/all`).toPromise() : this.http.get<Movie[]>(this.trendingUrl).toPromise();
	}

	popular(all: boolean = false): Promise<Movie[]> {
		return all ? this.http.get<Movie[]>(`${this.popularUrl}/all`).toPromise() : this.http.get<Movie[]>(this.popularUrl).toPromise();
	}

	movie(id: number): Promise<Movie> {
		return this.http.get<Movie>(`${this.getUrl}/${id}`).toPromise();
	}

	keywords(id: number): Promise<any> {
		return this.http.get(`${this.keywordsUrl}/${id}`).toPromise();
	}

	upcoming(all: boolean = false): Promise<Movie[]> {
		return all ? this.http.get<Movie[]>(`${this.upcomingUrl}/all`).toPromise() : this.http.get<Movie[]>(this.upcomingUrl).toPromise();
	}

	recommended(): Promise<Movie[]> {
		if (null === this.userService.user) {
			return;
		}
		const genreId: number = this.userService.user.type;
		return this.http.get<Movie[]>(`${this.recommendedUrl}/${genreId}`).toPromise();
	}

}
