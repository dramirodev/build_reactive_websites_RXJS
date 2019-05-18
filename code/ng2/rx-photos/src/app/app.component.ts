import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from './analytics.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router, private analytics: AnalyticsService) { } // (1)

  ngOnInit() {
    this.router.events // (2)
    .pipe(
      filter(event => event instanceof NavigationEnd) // (3)
    )
    .subscribe(event => {
      this.analytics.recordPageChange(event); // (4)
    });
  }
}
