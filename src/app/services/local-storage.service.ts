import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  /**
   * Set an item in the local storage
   * @param key - Key be stored
   * @param value - Value to be stored
   */
  setItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get an item from the local storage
   * @param key - Key to find
   * @param parse - If it is true return the value parsed
   */
  getItem<T = any>(key: string, parse = true): T | string {
    const value = localStorage.getItem(key);
    if (value) {
      return parse ? (JSON.parse(value) as T) : value;
    }
    return null;
  }
}
