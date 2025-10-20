import { Component, OnInit, OnDestroy } from '@angular/core';
import { youtube_v3 } from '@googleapis/youtube';

import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  results: youtube_v3.Schema$SearchResult[] = [];
  isLoading = false;
  currentQuery = '';
  private subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchService.results$.subscribe((results) => {
        this.results = results;
      }),

      this.searchService.loading$.subscribe((loading) => {
        this.isLoading = loading;
      }),

      this.searchService.lastQuery$.subscribe((query) => {
        this.currentQuery = query;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
