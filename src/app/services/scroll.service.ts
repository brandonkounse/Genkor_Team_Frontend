import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private scrollSubject = new Subject<string>();
  public scrollAction$ = this.scrollSubject.asObservable();

  public scrollTo(elementId: string) {
    this.scrollSubject.next(elementId);
  }
}