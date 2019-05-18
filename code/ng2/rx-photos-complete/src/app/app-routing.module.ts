import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsListComponent } from './results-list/results-list.component';
import { SavedListComponent } from './saved-list/saved-list.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

const routes: Routes = [{
  path: '',
  component: ResultsListComponent
}, {
  path: 'savedphotos',
  component: SavedListComponent
}, {
  path: 'edit/:photoId',
  component: EditPhotoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
