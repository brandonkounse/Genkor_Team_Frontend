import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TeamService {
  private apiUrl: string = 'http://localhost:3000'
  public teamMembers: any[] = [];
  public teamSplash: any[] = [
    { "Kounse": "/assets/images/kounse.png" },
    { "TheJimmyO": "/assets/images/jimmy.png" },
    { "InfernalStro": "/assets/images/stro.png" },
    { "Benjix": "/assets/images/benjix.png" },
    { "TolkienBlack": "/assets/images/tolkien.png" },
  ];

  constructor(private http: HttpClient) { }

  public getTeamMembers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/team/members`)
  }

  public fetchTeamMembers(): void {
    this.getTeamMembers().subscribe(data => {
      this.teamMembers = data;
    })
  }
}