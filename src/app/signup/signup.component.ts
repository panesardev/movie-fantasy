import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Payload } from '../models/payload.dto';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {

	username: string;
	password: string;
	firstname: string;
	lastname: string;

	error: string;
	passwordError: boolean = false;

	genres: { id: number, name: string }[];
	selectedGenre = 28;

	constructor(
		private readonly userService: UserService,
		private readonly router: Router
	) {
		this.genres = [
			{ id: 28, name: 'Action' },
			{ id: 12, name: 'Adventure' },
			{ id: 16, name: 'Animation' },
			{ id: 35, name: 'Comedy' },
			{ id: 80, name: 'Crime' },
			{ id: 99, name: 'Documentary' },
			{ id: 18, name: 'Drama' },
			{ id: 10751, name: 'Family' },
			{ id: 14, name: 'Fantasy' },
			{ id: 36, name: 'History' },
			{ id: 27, name: 'Horror' },
			{ id: 10402, name: 'Music' },
			{ id: 9648, name: 'Mystery' },
			{ id: 10749, name: 'Romance' },
			{ id: 878, name: 'Science Fiction' },
			{ id: 10770, name: 'TV Movie' },
			{ id: 53, name: 'Thriller' },
			{ id: 10752, name: 'War' },
			{ id: 37, name: 'Western' }
		];
	}

	async signUp() {
		if (!this.username || !this.password || !this.firstname) {
			this.error = 'Enter username & password';
			return;
		}
		if (!this.validatePassword()) {
			this.passwordError = true;
			return;
		}

		const response: Payload = await this.userService.signUp({
			username: this.username,
			password: this.password,
			firstName: this.firstname,
			lastName: this.lastname,
			type: this.selectedGenre
		});

		response.success ? this.router.navigate(['/home']) : this.error = response.message;
	}

	validatePassword(): boolean {
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
		return regex.test(this.password);
	}

}
