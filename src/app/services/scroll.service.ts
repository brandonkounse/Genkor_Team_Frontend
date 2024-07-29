import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private scrollSubject = new Subject<string>();
  public scrollAction$ = this.scrollSubject.asObservable();

  public scrollTo(elementId: string) {
    const element: HTMLElement | null = document.getElementById(elementId);
    const header: HTMLElement | null = document.querySelector('.fixed-header');
    const headerHeight: number = header?.clientHeight || 0;
    const elementPosition: number = element?.getBoundingClientRect().top || 0;
    const offsetPosition: number = elementPosition + window.scrollY - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}