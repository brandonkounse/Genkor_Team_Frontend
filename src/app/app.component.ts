import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TeamComponent } from './team/team.component';
import { HeaderComponent } from './header/header.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamComponent, HeaderComponent, HighlightsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public bannerImagePath: string = '/assets/images/banner.png'

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.scrollService.scrollAction$.subscribe(elementId => {
      const element = document.getElementById(elementId);

      element?.scrollIntoView({
        behavior: 'smooth', block: 'start'
      });

    });
  }
}
