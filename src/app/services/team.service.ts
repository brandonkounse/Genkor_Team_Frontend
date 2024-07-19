import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs";

import { environment } from "../../environments/environment";
import { TeamMember } from "../models/team.interface";

@Injectable({ providedIn: 'root' })
export class TeamService {
  private apiUrl: string = environment.apiUrl;

  private teamSplash: { [key: string]: string } = {
    "Kounse": "/assets/images/kounse.png",
    "The JimmyO": "/assets/images/jimmy.png",
    "InfernalStro": "/assets/images/stro.png",
    "Benjix": "/assets/images/benjix.png",
    "TolkienBlack": "/assets/images/tolkien.png",
  }
    ;

  constructor(private http: HttpClient) { }

  public getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.apiUrl}/team_members`).pipe(
      map(members => members.map(member => ({
        ...member,
        splash: this.teamSplash[member.name] || `No splash found for ${member.name}`
      })))
    )
  }
}