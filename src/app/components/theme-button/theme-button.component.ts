import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ThemeService, ThemeType } from "@app/services/theme.service";
import { map, Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-theme-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./theme-button.component.html",
})
export class ThemeButtonComponent implements OnInit, OnDestroy {
  /**
   * Flag to avoid NG0100: ExpressionChangedAfterItHasBeenCheckedError
   */
  isDarkTheme: boolean = false;

  /**
   * Notify the component has been destroyed
   */
  destroyed$ = new Subject<void>();

  /**
   * Current theme in the app
   */
  isDarkTheme$ = this.themService.currentTheme$.pipe(
    map((state) => state === ThemeType.Dark)
  );

  constructor(
    private themService: ThemeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const { destroyed$, isDarkTheme$ } = this;
    isDarkTheme$.pipe(takeUntil(destroyed$)).subscribe({
      next: (isDarkTheme) => {
        this.isDarkTheme = isDarkTheme;
        this.cd.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Called each time the checkbox changes
   * @param eventTarget - Data sent by the checkbox
   */
  changeTheme(eventTarget: EventTarget): void {
    const checkbox = eventTarget as HTMLInputElement;
    if (checkbox.checked) {
      this.themService.setDark();
      return;
    }
    this.themService.setLight();
  }
}
