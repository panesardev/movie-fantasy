import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Payload } from '../models/payload.dto';
import { LoginData } from '../models/login.dto';

@Injectable({ providedIn: 'root' })
export class UserService {

	// private url = 'http://localhost:3000/user';
	private url = 'https://panesar-cors-anywhere.herokuapp.com/http://movies-nest-api.herokuapp.com/user';

	private loggedUser: User;

	constructor(private readonly http: HttpClient) {}

	async login(data: LoginData): Promise<Payload> {
		const response: Payload = await this.http.post<Payload>(`${this.url}/login`, data).toPromise();
		if (response.success) {
			this.loggedUser = response.payload;
			localStorage['user'] = JSON.stringify(this.loggedUser);
			return response;
		}
		return response;
	}

	async signUp(user: User): Promise<Payload> {
		const response: Payload = await this.http.post<Payload>(`${this.url}/sign-up`, user).toPromise();
		if (response.success) {
			this.loggedUser = response.payload;
			localStorage['user'] = JSON.stringify(this.loggedUser);
			return response;
		}
		return response;
	}

	async update(user: User): Promise<Payload> {
		const response: Payload = await this.http.put<Payload>(`${this.url}/update`, user).toPromise();
		if (response.success) {
			this.loggedUser = response.payload;
			localStorage['user'] = JSON.stringify(this.loggedUser);
			return response;
		}
		return response;
	}

	async updatePassword(password: string) {
		const body = { username: this.user.username, password };
		const response: Payload = await this.http.put<Payload>(`${this.url}/update-password`, body).toPromise();
		if (response.success) {
			this.loggedUser = response.payload;
			localStorage['user'] = JSON.stringify(this.loggedUser);
			return response;
		}
		return response;
	}

	logout(): void {
		this.loggedUser = null;
		localStorage['user'] = null;
	}

	get user(): User {
		try {
			return JSON.parse(localStorage['user']);
		} catch {
			return null;	
		}
	}

}
