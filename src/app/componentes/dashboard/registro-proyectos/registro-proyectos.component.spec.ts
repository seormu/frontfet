import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProyectosComponent } from './registro-proyectos.component';

describe('RegistroProyectosComponent', () => {
  let component: RegistroProyectosComponent;
  let fixture: ComponentFixture<RegistroProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroProyectosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
