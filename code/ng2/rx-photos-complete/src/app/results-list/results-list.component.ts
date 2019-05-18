import { Component, OnInit } from '@angular/core';
import { PhotosService, IPhoto } from '../photos.service';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {
  photos: IPhoto[];
  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.photosService.latestPhotos
      .subscribe(photos => {
        this.photos = photos;
      });
  }
}
