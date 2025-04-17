import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateListComponent } from './generate-list.component';

describe('GenerateListComponent', () => {
  let component: GenerateListComponent;
  let fixture: ComponentFixture<GenerateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
