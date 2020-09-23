import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	template: `
	<header class="py-3 px-3 px-sm-0">
		<button class="px-2 text-sky-blue" (click)="toggle()"><i class="fas fa-bars"></i></button>
		<a routerLink="/home" class="brand">Movie Fantasy</a>
		<ul id="list">
			<li><a routerLink="/profile" class="px-3 py-1" routerLinkActive="active"> Profile </a></li>
			<li><a routerLink="/login" class="px-3 py-1" routerLinkActive="active"> Login </a></li>
			<li><a routerLink="/sign-up" class="px-3 py-1" routerLinkActive="active"> Sign up </a></li>
			<li><a class="px-3 py-1" (click)="logout()"> Logout </a></li>
		</ul>
	</header>`,
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	search: string;

	constructor(
		private readonly userService: UserService,
		private readonly router: Router
	) { }

	toggle(): void {
		document.getElementById('list').classList.toggle('show');
	}

	logout(): void {
		this.userService.logout();
		this.router.navigate(['/login']);
	}

}
