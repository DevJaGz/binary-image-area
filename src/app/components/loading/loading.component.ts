import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { ProgressBarComponent } from "@app/components/progress-bar/progress-bar.component";
import { InitLoadingState } from "@app/constants/initialization.constant";
import { StateService } from "@app/services/state.service";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: "./loading.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements AfterViewInit {
  /**
   * View model
   */
  private viewModel = InitLoadingState;

  /**
   * Loading state coming app state
   */
  private loadingState$ = this.stateService.selectLoadingState$;

  /**
   * Label to show in the view
   */
  get label(): string {
    const { viewModel: loadinState } = this;
    return loadinState.label;
  }

  /**
   * progress to show in the view
   */
  get progress(): number {
    const { viewModel: loadinState } = this;
    return loadinState.progress;
  }

  /**
   * Notify if progress bar should be shown in the view. True is shown.
   */
  get showProgress(): boolean {
    const { viewModel: loadinState } = this;
    return loadinState.showProgress;
  }

  constructor(
    private stateService: StateService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.loadingState$.subscribe({
      next: (value) => {
        this.viewModel = value;
        this.cd.detectChanges();
      },
    });
  }
}
