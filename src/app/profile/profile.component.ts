import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user: User;
	error: string;
	success: string;

	username: string;
	password: string;
	firstname: string;
	lastname: string;

	changePassword: string;
	changePasswordConfirm: string;

	passwordError: boolean = false;

	genres: { id: number, name: string }[];
	selectedGenre: number;

	showDetails: boolean = true;

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

	ngOnInit(): void {
		if (this.userService.user !== null) {
			this.user = this.userService.user;

			this.username = this.user.username;
			this.firstname = this.user.firstName;
			this.lastname = this.user.lastName;

			this.selectedGenre = this.user.type;
		} else {
			alert('You need to be logged in');
			this.router.navigate(['/login']);
		}
	}

	async update() {
		const res = await this.userService.update({
			username: this.username,
			firstName: this.firstname,
			lastName: this.lastname,
			type: this.selectedGenre
		});
		this.success = res.success ? 'updated' : null; 
	}

	async updatePassword() {
		if (!this.validatePassword()) {
			this.passwordError = true;
			return;
		}
		if (this.changePassword && this.changePasswordConfirm && this.changePassword === this.changePasswordConfirm) {
			const res = await this.userService.updatePassword(this.changePassword);
			this.success = res.success ? 'updated' : null;
		} else {
			this.error = 'Passwords did not match';
		}
	}

	validatePassword(): boolean {
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
		return regex.test(this.changePassword);
	}

}
