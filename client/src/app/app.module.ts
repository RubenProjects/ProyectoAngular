import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
//import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
 import { routing, appRoutingProviders} from './app.routing';
//Cargar componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent} from './components/users/user.component';
import { SidebarComponent} from './components/sidebar/sidebar.component';
import { TimelineComponent} from './components/timeline/timeline.component';
import { PublicationService} from './services/publication.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent, 
    SidebarComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule
    //HttpModule
  ],
  providers: [
  	appRoutingProviders, PublicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
