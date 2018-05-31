import { Injectable } from '@angular/core'; //Definir servicios e injectarlo en cualquier otro componente
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/Observable'; // poder recoger respuesta de la api
import {GLOBAL} from './global';
import { User} from '../models/user';

@Injectable()
export class UploadService {
	public url: string;
	
	constructor() {
		this.url = GLOBAL.url;
	}

	makeFileRequest(url:string, params: Array<string>,files:Array<File>,token: string, name:string){
		return new Promise(function(resolve, reject){
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();
			console.log('hola');
			console.log(token);
			for(var i=0; i<files.length;i++){
				formData.append(name,files[i],files[i].name);

			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));

					}else{
						reject(xhr.response);
					}
				}
			}
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization',token);
			xhr.send(formData);
		});
	}
}