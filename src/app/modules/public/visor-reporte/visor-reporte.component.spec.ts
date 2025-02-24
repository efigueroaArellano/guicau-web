import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorReporteComponent } from './visor-reporte.component';

describe('VisorReporteComponent', () => {
  let component: VisorReporteComponent;
  let fixture: ComponentFixture<VisorReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
