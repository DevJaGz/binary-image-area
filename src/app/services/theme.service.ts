import { Injectable } from "@angular/core";
import { LocalStorageService } from "@app/services/local-storage.service";
import { Observable, Subject } from "rxjs";

export enum ThemeType {
  Dark,
  Light,
}

export const themeKeyName = "bia-theme";

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

  constructor(private localStorageService: LocalStorageService) {}

  /**
   * Set theme based on user device settings
   * @param savedFirst - If it is true, then the saved value of theme overwrite the preference in the system
   */
  matchMedia(savedFirst = true): void {
    const savedTheme = this.localStorageService.getItem(themeKeyName);
    if (savedFirst) {
      if (savedTheme === ThemeType.Dark) {
        this.setDark();
      } else {
        this.setLight();
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
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
    const theme = ThemeType.Dark;
    this._currentTheme$.next(theme);
    this.localStorageService.setItem(themeKeyName, theme);
  }

  /**
   * Set light theme
   */
  setLight(): void {
    document.documentElement.classList.remove("dark");
    const theme = ThemeType.Light;
    this._currentTheme$.next(theme);
    this.localStorageService.setItem(themeKeyName, theme);
  }
}
