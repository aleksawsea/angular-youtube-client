import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchResultsComponent } from './search-results/search-results.component';
import { VideoDetailsComponent } from './video-details/video-details.component';

const routes: Routes = [
  { path: '', component: SearchResultsComponent },
  { path: 'videos/:videoId', component: VideoDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
