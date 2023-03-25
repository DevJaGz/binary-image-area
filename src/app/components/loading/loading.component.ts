import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./loading.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
