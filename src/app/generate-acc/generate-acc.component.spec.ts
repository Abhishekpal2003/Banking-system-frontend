import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAccComponent } from './generate-acc.component';

describe('GenerateAccComponent', () => {
  let component: GenerateAccComponent;
  let fixture: ComponentFixture<GenerateAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateAccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
