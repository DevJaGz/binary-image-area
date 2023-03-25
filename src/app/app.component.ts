import { CommonModule } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoadingComponent } from "@app/components/loading/loading.component";
import { ThemeButtonComponent } from "@app/components/theme-button/theme-button.component";
import { ThemeService } from "@app/services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeButtonComponent, LoadingComponent],
})
export class AppComponent implements AfterViewInit {
  constructor(private themService: ThemeService) {}

  ngAfterViewInit(): void {
    this.themService.matchMedia();
  }
}
