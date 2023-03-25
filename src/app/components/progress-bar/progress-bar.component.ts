import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-progress-bar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./progress-bar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnChanges, AfterViewInit {
  /**
   * Progress bar in the view
   */
  @ViewChild("bar") bar: ElementRef<HTMLDivElement>;

  /**
   * Value to received for progress bar
   */
  @Input() value: number = 0;

  /**
   * Value for the progress bar limited in range
   */
  get progressValue(): number {
    const { value } = this;
    if (value >= 0 && value <= 100) {
      return value;
    } else if (value > 100) {
      return 100;
    }
    return 0;
  }

  constructor(private render: Renderer2) {}

  ngOnChanges({ value }: SimpleChanges): void {
    if (value?.currentValue !== value?.previousValue) {
      this.updateProgress();
    }
  }

  ngAfterViewInit(): void {
    this.firstUpdate();
  }

  /**
   * Called once when the view is ready
   */
  private firstUpdate(): void {
    this.updateProgress();
  }

  /**
   * Upate the progress bar
   */
  private updateProgress(): void {
    const { bar, render, progressValue } = this;
    if (bar) {
      const barElement = bar.nativeElement;
      render.setStyle(barElement, "width", `${progressValue}%`);
    }
  }
}
