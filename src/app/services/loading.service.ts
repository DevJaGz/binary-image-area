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
   * Display to the user the loading modal
   * @param progress - Progress value
   * @param label - Label to display
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
   * Display to the user the spinner with a label
   * @param label - Label to display
   */
  activeLoading(label?: string): void {
    const { stateService } = this;
    const state: Partial<ILoadingState> = {
      isLoading: true,
      showProgress: false,
      label,
    };
    stateService.setLoading(state);
    this.loadingState = state;
  }

  /**
   * Update the progress and label values
   * @param progress - new Progress
   * @param label - Label to display
   */
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

  /**
   * Update the label
   * @param label - Label to display
   */
  updateLabel(label: string): void {
    const { stateService, loadingState } = this;
    if (loadingState) {
      stateService.setLoading({
        ...loadingState,
        label: label || loadingState.label,
      });
    }
  }

  /**
   * Hide the loading modal
   */
  deactivateLoading(): void {
    const { stateService } = this;
    const state = {
      isLoading: false,
    };
    stateService.setLoading(state);
    this.loadingState = null;
  }
}
