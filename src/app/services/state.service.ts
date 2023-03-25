import { Injectable } from "@angular/core";
import {
  InitAppState,
  InitLoadingState,
} from "@app/constants/initialization.constant";
import {
  IAppState,
  IImageState,
  ILoadingState,
} from "@app/interfaces/app-state.interface";
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
   * =================================
   *            SELECTORS
   * =================================
   */

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
   * Notify the Image state
   */
  get selectImageState$(): Observable<IImageState> {
    return this._state$.asObservable().pipe(map((state) => state.imageState));
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
   * Current state in the service
   */
  get currentState(): IAppState {
    return this._state$.value;
  }

  /**
   * =================================
   *            ACTIONS
   * =================================
   */

  /**
   * Update the image state
   * @param value - New state
   */
  setImageState(value: Partial<IImageState>): void {
    if (value) {
      const { currentState } = this;
      this.updateState({
        ...currentState,
        imageState: {
          ...currentState.imageState,
          ...value,
        },
      });
    }
  }

  /**
   * Upade the loading state
   * @param value - New state
   */
  setLoadingState(value: Partial<ILoadingState>): void {
    if (value) {
      const { currentState } = this;
      this.updateState({
        ...currentState,
        loadingState: {
          ...InitLoadingState,
          ...value,
        },
      });
    }
  }

  /**
   * Update the state wit a new value
   * @param value - Value to update the state
   */
  private updateState(value: IAppState): void {
    this._state$.next(value);
  }
}
