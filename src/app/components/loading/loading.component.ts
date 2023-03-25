import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressBarComponent } from "@app/components/progress-bar/progress-bar.component";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: "./loading.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  progressText = "Loading...";
}
