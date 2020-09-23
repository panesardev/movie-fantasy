import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-loading',
	template: `
	<div class="center mx-auto mt-5">
		<div class="lds-ripple"><div></div><div></div></div>
	</div>`,
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
