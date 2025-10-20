import { Component, Input, OnInit } from '@angular/core';
import { youtube_v3 } from '@googleapis/youtube';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  @Input() videoId?: string | null;
  @Input() isDetailedView = false;
  isLoading = false;
  videoDetails: youtube_v3.Schema$Video | null = null;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    if (this.videoId) {
      this.isLoading = true;
      this.youtubeService.getVideoDetails(this.videoId).subscribe({
        next: (response) => {
          if (response.items && response.items.length > 0) {
            this.videoDetails = response.items[0];
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading video details', err);
          this.isLoading = false;
        },
      });
    }
  }

  getBottomLineColor(): string {
    if (!this.videoDetails?.snippet?.publishedAt) {
      return '#1a73e8';
    }

    const publishDate = new Date(this.videoDetails.snippet.publishedAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return '#1a73e8';
    } else if (diffDays < 30) {
      return '#0f9d58';
    } else if (diffDays < 180) {
      return '#fbbc04';
    } else {
      return '#ae1212ff';
    }
  }
}
