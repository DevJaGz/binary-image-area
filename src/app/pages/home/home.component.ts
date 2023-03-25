import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ImageLoaderComponent } from "@app/components/image-loader/image-loader.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, ImageLoaderComponent],
  templateUrl: "./home.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
