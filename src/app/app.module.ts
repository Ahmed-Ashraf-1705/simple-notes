import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatFormFieldModule,
         MatInputModule,
         MatCardModule,
         MatGridListModule,
         MatDialogModule,
         MatIconModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteComponent } from './components/note/note.component';
import { ModifyNoteDialog } from './components/modify-note/modify-note.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { FIREBASE_APP } from './config/firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { UserService } from './services/user.service';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotesListComponent,
    NoteComponent,
    ModifyNoteDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    AngularFireModule.initializeApp(FIREBASE_APP),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgFlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  providers: [AuthGuard, UserService],
  bootstrap: [AppComponent],
  entryComponents: [ModifyNoteDialog]
})
export class AppModule { }
