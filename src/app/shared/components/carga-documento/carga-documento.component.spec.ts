import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaDocumentoComponent } from './carga-documento.component';

describe('CargaDocumentoComponent', () => {
  let component: CargaDocumentoComponent;
  let fixture: ComponentFixture<CargaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
