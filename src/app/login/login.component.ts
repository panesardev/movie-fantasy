import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Payload } from '../models/payload.dto';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	username: string;
	password: string;
	error: string;

	constructor(
		private readonly userService: UserService,
		private readonly router: Router
	) { }

	async login() {
		if (!this.username || !this.password) {
			this.error = 'Enter username & password';
		} else {
			const response: Payload = await this.userService.login({
				username: this.username,
				password: this.password
			});

			if (response.success) {
				this.router.navigate(['/home']);
			}
			else {
				this.error = response.message;
			}
		}
	}

}
