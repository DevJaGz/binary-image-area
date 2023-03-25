import { Injectable } from "@angular/core";
import { ILoadingState } from "@app/interfaces/app-state.interface";
import { StateService } from "@app/services/state.service";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  /**
   * Loading state in the service
   */
  private loadingState: Partial<ILoadingState> = null;

  constructor(private stateService: StateService) {}

  /**
   * Display to the user the spinner with a label and the progress bar
   * @param progress - Progress value
   * @param label - Label to be shown
   */
  activeLoadingWithProgress(progress: number, label?: string): void {
    const { stateService } = this;
    const state: Partial<ILoadingState> = {
      isLoading: true,
      showProgress: true,
      label,
      progress,
    };
    stateService.setLoading(state);
    this.loadingState = state;
  }

  /**
   * Display to the user the spinner with a label and the progress bar
   * @param progress - Progress value
   * @param label - Label to be shown
   */
  activeLoading(label?: string): void {
    const { stateService } = this;
    const state: Partial<ILoadingState> = {
      isLoading: true,
      showProgress: true,
      label,
    };
    stateService.setLoading(state);
    this.loadingState = state;
  }

  updateProgress(progress: number, label?: string): void {
    const { stateService, loadingState } = this;
    if (loadingState) {
      stateService.setLoading({
        ...loadingState,
        progress: progress,
        label: label || loadingState.label,
      });
    }
  }

  deactivateLoading(): void {
    const { stateService } = this;
    const state = {
      isLoading: false,
    };
    stateService.setLoading(state);
    this.loadingState = null;
  }
}
