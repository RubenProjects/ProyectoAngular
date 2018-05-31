import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Injectable } from '@angular/core'; //Definir servicios e injectarlo en cualquier otro componente

import { UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import { Publication} from '../../models/publication';
import { PublicationService} from '../../services/publication.service';


@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	providers: [ UserService, PublicationService]
})
export class SidebarComponent implements OnInit, DoCheck {
	
	public identity;
	public token ;
	public page;
	public url;
	public status;
	public stats;
    public publication : Publication;
	

	constructor(
		private _userService: UserService,
	    private _publicationService: PublicationService

	) {
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.stats = this._userService.getStats();
		this.url = GLOBAL.url;
		this.publication = new Publication("","","","", this.identity._id);
		
	}

	ngOnInit(){
		console.log("sidebar ha sido cargado");
	}

	ngDoCheck(){
		this.stats = this._userService.getStats();
	}

	onSubmit(form){

		this._publicationService.addPublication(this.token, this.publication).subscribe(

			response => {
				      	
				        if(response.publication){
				        	// this.publication = response.publication;
				        	this.status = 'success';
				        	form.reset();
				        }else{
				        	this.status = 'error';
				        }

				      },
				      error => {
				         var errorMessage = <any>error;
				         console.log(errorMessage);
				         if(errorMessage != null){
				         	this.status = 'error';
				         }
				      }
		)
	}

	updateStats(){
		this._userService.getCounters().subscribe(
				      response => {
				      	this.stats.following+=1;
				      	console.log(this.stats.following);
				        localStorage.setItem('stats',JSON.stringify(response));
				        

				        console.log('hola');
				        

				      },
				      error => {
				        console.log(<any>error);
				      }
				    )
				 
	}

	
}
