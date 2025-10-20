import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { youtube_v3 } from '@googleapis/youtube';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiKey = 'AIzaSyDan-rr4nhKNswVyDAtdmXzOXdN6dTk9r4';
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  searchVideos(
    query: string,
    maxResults: number = 12
  ): Observable<youtube_v3.Schema$SearchListResponse> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', query)
      .set('maxResults', maxResults.toString())
      .set('type', 'video')
      .set('key', this.apiKey);

    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  getVideoDetails(videoId: string): Observable<youtube_v3.Schema$VideoListResponse> {
    const params = new HttpParams()
      .set('part', 'snippet,statistics')
      .set('id', videoId)
      .set('key', this.apiKey);

    return this.http.get(`${this.apiUrl}/videos`, { params });
  }
}
