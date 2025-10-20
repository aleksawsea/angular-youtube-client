import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { youtube_v3 } from '@googleapis/youtube';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent implements OnInit {
  videoDetails?: youtube_v3.Schema$Video;
  isLoading = false;
  videoId?: string | null;

  constructor(private youtubeService: YoutubeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.videoId = routeParams.get('videoId');
    if (this.videoId) {
      this.isLoading = true;
      this.youtubeService.getVideoDetails(this.videoId).subscribe({
        next: (response) => {
          if (response.items && response.items.length) {
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
}
