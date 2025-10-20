import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { youtube_v3 } from '@googleapis/youtube';
import { YoutubeService } from './youtube.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private resultsSubject = new BehaviorSubject<youtube_v3.Schema$SearchResult[]>([]);
  private lastQuerySubject = new BehaviorSubject<string>('');

  loading$ = this.loadingSubject.asObservable();
  results$ = this.resultsSubject.asObservable();
  lastQuery$ = this.lastQuerySubject.asObservable();

  constructor(private youtubeService: YoutubeService) {}

  searchVideos(query: string): void {
    if (!query.trim()) return;

    this.loadingSubject.next(true);
    this.lastQuerySubject.next(query);

    this.youtubeService.searchVideos(query).subscribe({
      next: (response) => {
        const filteredResults = (response.items || []).filter(
          (item) => item.id && item.id.kind === 'youtube#video' && item.id.videoId
        );
        this.resultsSubject.next(filteredResults);
        this.loadingSubject.next(false);
      },
      error: (error) => {
        console.error('Error searching videos', error);
        this.resultsSubject.next([]);
        this.loadingSubject.next(false);
      },
    });
  }

  get currentResults(): youtube_v3.Schema$SearchResult[] {
    return this.resultsSubject.getValue();
  }

  get isLoading(): boolean {
    return this.loadingSubject.getValue();
  }
}
