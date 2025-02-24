import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBoxComponent } from './code-box.component';

describe('CodeBoxComponent', () => {
  let component: CodeBoxComponent;
  let fixture: ComponentFixture<CodeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
