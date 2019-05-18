import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhotosService, IPhoto } from '../photos.service';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {
  saving: boolean;
  photo$: any;
  tagInput: string;

  constructor(
    private currentRoute: ActivatedRoute, // (1)
    private photosService: PhotosService // (2)
  ) {}

  ngOnInit() {
    this.photo$ = this.currentRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.photosService.getSinglePhoto(params.get('photoId'))
        )
      );
  }

  addTag(photo: IPhoto) {
    photo.tags.push(this.tagInput);
    this.tagInput = '';
  }

  savePhoto(photo: IPhoto) {
    this.saving = false;
    this.photosService.savePhoto(photo)
    .subscribe({
      complete: () => this.saving = false
    });
  }

}
