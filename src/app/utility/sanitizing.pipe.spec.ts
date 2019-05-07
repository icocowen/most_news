import { SanitizingPipe } from './sanitizing.pipe';

describe('SanitizingPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizingPipe();
    expect(pipe).toBeTruthy();
  });
});
