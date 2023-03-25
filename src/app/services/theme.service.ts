import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

export enum ThemeType {
  Dark,
  Light,
}

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  /**
   * Subject to handle the curernt theme
   */
  private _currentTheme$ = new Subject<ThemeType>();

  /**
   * Notify the current theme
   */
  get currentTheme$(): Observable<ThemeType> {
    return this._currentTheme$.asObservable();
  }

  /**
   * Set theme based on user device settings
   */
  matchMedia(): void {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.setDark();
    } else {
      this.setLight();
    }
  }

  /**
   * Set dark theme
   */
  setDark(): void {
    document.documentElement.classList.add("dark");
    this._currentTheme$.next(ThemeType.Dark);
  }

  /**
   * Set light theme
   */
  setLight(): void {
    document.documentElement.classList.remove("dark");
    this._currentTheme$.next(ThemeType.Light);
  }
}
