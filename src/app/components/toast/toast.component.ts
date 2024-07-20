import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Input() type: 'success' | 'info' | 'warning' | 'error' = 'info';

  hideToast(): void {
    this.show = false;
  }

  get icon(): string {
    switch (this.type) {
      case 'success':
        return '✓'; 
      case 'error':
        return '✗'; 
      case 'warning':
        return '⚠'; 
      default:
        return 'ℹ';
    }
  }

  get backgroundColorClass(): string {
    switch (this.type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      default:
        return 'toast-info';
    }
  }
}