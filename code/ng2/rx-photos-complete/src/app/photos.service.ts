import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface IPhoto {
  url: string;
  id: number;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  latestPhotos = new BehaviorSubject([]);
  api = 'http://localhost:3000/api/ng2ajax';
  constructor(private http: HttpClient) { }

  searchPhotos(searchQuery: string) {
    this.http.get<string[]>(this.api + '/imgSearch/' + searchQuery)
      .subscribe(photos => this.latestPhotos.next(photos));
  }

  getSavedPhotos() {
    return this.http.get<IPhoto[]>(this.api + '/savedPhotos');
  }

  addNewPhoto(photoUrl: string) {
    this.http.post<IPhoto>(this.api + '/addNewPhoto', {
      url: photoUrl
    })
      .subscribe();
  }

  savePhoto(photo: IPhoto) {
    return this.http.put(this.api + '/updatePhoto', photo);
  }

  getSinglePhoto(photoId) {
    return this.http.get<IPhoto>(this.api + '/getSinglePhoto/' + photoId);
  }
}
