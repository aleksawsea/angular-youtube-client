import { Component } from '@angular/core';

import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchQuery = '';

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    if (!this.searchQuery.trim()) return;
    this.searchService.searchVideos(this.searchQuery);
  }
}
