import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockResultComponent } from './mock-result.component';

describe('MockResultComponent', () => {
  let component: MockResultComponent;
  let fixture: ComponentFixture<MockResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
