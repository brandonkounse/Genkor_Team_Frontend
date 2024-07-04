import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TeamService {
  private apiUrl: string = environment.apiUrl;
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
}