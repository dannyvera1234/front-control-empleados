import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
public readonly selectedItem = signal('empleados');
}
