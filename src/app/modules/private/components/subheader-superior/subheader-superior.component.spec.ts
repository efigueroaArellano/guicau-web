import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheaderSuperiorComponent } from './subheader-superior.component';

describe('SubheaderSuperiorComponent', () => {
  let component: SubheaderSuperiorComponent;
  let fixture: ComponentFixture<SubheaderSuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubheaderSuperiorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubheaderSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
