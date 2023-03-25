import { CommonModule } from "@angular/common";
import { AfterViewInit, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ThemeButtonComponent } from "@app/components/theme-button/theme-button.component";
import { ThemeService } from "@app/services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeButtonComponent],
})
export class AppComponent implements AfterViewInit {
  constructor(private themService: ThemeService) {}

  ngAfterViewInit(): void {
    this.themService.matchMedia();
  }
}
