import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

}
