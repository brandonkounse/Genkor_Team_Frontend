import { Component } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public headerImagePath: string = '../assets/images/header_logo.png'

  constructor(private scrollService: ScrollService) { }

  scrollTo(elementId: string): void {
    this.scrollService.scrollTo(elementId);
  }
}
