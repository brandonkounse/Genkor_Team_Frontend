import { Component } from '@angular/core';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css'
})
export class HighlightsComponent {
  public highlightsImagePath: string = '../../assets/images/highlights.png'
  public mediaPlaceholderImagePath: string = '../../assets/images/media_window.png'
}
