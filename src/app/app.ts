import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { mountRootParcel } from 'single-spa';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mfe-dispatch',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  session: any;
  @ViewChild('parcelContainer', { static: false }) parcelContainer!: ElementRef;

  constructor(@Inject('SINGLE_SPA_PROPS') private props: any) {}

  ngOnInit(): void {
    // Receive session data passed via Shell customProps
    this.session = this.props?.session;
  }

  async ngAfterViewInit(): Promise<void> {
    try {
      // Dynamic import of MFE 1's exposed DriverBadgeParcel
      const mfeDriverModule = await import(/* @vite-ignore */ 'http://localhost:4201/main.js');
      const parcelConfig = mfeDriverModule.DriverBadgeParcel;

      if (parcelConfig && this.parcelContainer) {
        mountRootParcel(parcelConfig, {
          domElement: this.parcelContainer.nativeElement,
          driverName: 'Alex Mercer (Assigned)',
          status: 'En Route',
          vehicleId: 'TRK-8802',
          rating: '4.95'
        });
      }
    } catch (err) {
      console.error('Failed to load MFE 1 DriverBadgeParcel into MFE 2:', err);
    }
  }
}