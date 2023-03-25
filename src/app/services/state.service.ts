import { Injectable } from "@angular/core";
import {
  InitAppState,
  InitLoadingState,
} from "@app/constants/initialization.constant";
import { IAppState, ILoadingState } from "@app/interfaces/app-state.interface";
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
  get selectLoadingState$(): Observable<ILoadingState> {
    return this._state$.asObservable().pipe(map((state) => state.loadingState));
  }

  /**
   * Notify the is Loading value
   */
  get selectIsLoading$(): Observable<boolean> {
    return this._state$
      .asObservable()
      .pipe(map((state) => state.loadingState.isLoading));
  }

  /**
   * Upade the loading state
   * @param param - New state
   */
  setLoading(value: Partial<ILoadingState>): void {
    if (value) {
      this.updateState({
        loadingState: {
          ...InitLoadingState,
          ...value,
        },
      });
    }
  }

  /**
   * Update the state based on a partial state value
   * @param partialState - Value to update the state
   */
  private updateState(partialState: Partial<IAppState>): void {
    const currentState = this._state$.value;
    this._state$.next({
      ...currentState,
      ...partialState,
    });
  }
}
