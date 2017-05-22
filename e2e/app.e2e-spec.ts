import { CodemirrorTestPage } from './app.po';

describe('codemirror-test App', () => {
  let page: CodemirrorTestPage;

  beforeEach(() => {
    page = new CodemirrorTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
