import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MollyModule } from '../molly.module';
import { FlashCardComponent } from './flash-card.component';

describe('FlashCardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlashCardComponent],
      providers: []
    }).compileComponents();
  }));

  it('works', () => {
    const fixture = TestBed.createComponent(FlashCardComponent);
    expect(fixture).toMatchSnapshot();
  });
});
