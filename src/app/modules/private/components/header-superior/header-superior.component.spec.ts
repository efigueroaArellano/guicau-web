import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSuperiorComponent } from './header-superior.component';

describe('HeaderSuperiorComponent', () => {
  let component: HeaderSuperiorComponent;
  let fixture: ComponentFixture<HeaderSuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSuperiorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
