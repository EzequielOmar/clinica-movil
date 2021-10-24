import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//env
import { environment } from '../environments/environment';
//firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
//modules
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from './modules/feather-icons/feather.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, ErrorComponent],
=======
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { DbService } from './services/db/db.service';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    AdminDashboardComponent,
  ],
>>>>>>> parent of de85c4a... casi terminando logueo
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    NgbModule,
    NoopAnimationsModule,
    IconsModule,
=======
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    NgbModule
>>>>>>> parent of de85c4a... casi terminando logueo
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
