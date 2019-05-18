import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PhotosService } from '../photos.service';

import {debounceTime} from 'rxjs/operators';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {
  searchQuery = new FormControl();
  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.searchQuery.valueChanges
    .pipe(
      debounceTime(333),
      filter(Boolean)
    )
    .subscribe(query => {
      this.photosService.searchPhotos(query);
    });
  }

}
