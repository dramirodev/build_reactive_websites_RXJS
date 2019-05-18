import { Component, OnInit } from '@angular/core';
import { PhotosService, IPhoto } from '../photos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.css']
})
export class SavedListComponent implements OnInit {

  savedPhotos$: Observable<IPhoto[]>;
  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.savedPhotos$ = this.photosService.getSavedPhotos();
  }
}
