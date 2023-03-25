import { Injectable } from "@angular/core";
import { InitAppState } from "@app/constants/initialization.constant";
import { IAppState } from "@app/interfaces/app-state.interface";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StateService {
  /**
   * Handle the state
   */
  private _state$ = new BehaviorSubject<IAppState>(InitAppState);

  /**
   * Notify the App state
   */
  get selectState$(): Observable<IAppState> {
    return this._state$.asObservable();
  }

  /**
   * Notify the Loading state
   */
  get selectLoading$(): Observable<boolean> {
    return this._state$.asObservable().pipe(map((state) => state.isLoading));
  }

  /**
   * Upade the loading state
   * @param value - New value
   */
  updateLoading(value: boolean): void {
    this.updateState({ isLoading: value });
  }

  /**
   * Update the state based on partial state data
   * @param partialState - Data to update the state
   */
  private updateState(partialState: Partial<IAppState>): void {
    const currentState = this._state$.value;
    this._state$.next({
      ...currentState,
      ...partialState,
    });
  }
}
