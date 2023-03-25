import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ThemeButtonComponent } from "@app/components/theme-button/theme-button.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeButtonComponent],
})
export class AppComponent {}
