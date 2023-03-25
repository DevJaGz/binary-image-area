import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoadingComponent } from "@app/components/loading/loading.component";
import { ThemeButtonComponent } from "@app/components/theme-button/theme-button.component";
import { StateService } from "@app/services/state.service";
import { ThemeService } from "@app/services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeButtonComponent, LoadingComponent],
})
export class AppComponent implements AfterViewInit {
  /**
   * Loading state
   */
  private isLoading$ = this.stateService.selectLoading$;

  /**
   * Flag to avoid NG0100: ExpressionChangedAfterItHasBeenCheckedError
   */
  isLoading = false;

  constructor(
    private themService: ThemeService,
    private stateService: StateService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.themService.matchMedia();
    this.isLoading$.subscribe({
      next: (value) => {
        this.isLoading = value;
        this.cd.detectChanges();
      },
    });
  }
}
