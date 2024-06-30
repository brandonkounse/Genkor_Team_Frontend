import { Component, OnInit } from '@angular/core';

import { TeamService } from '../../team/team.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public splashPaths: Array<string> = []

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    for (let splash in this.teamService.teamSplash) {
      this.splashPaths.push(splash);
    }
  }
}
