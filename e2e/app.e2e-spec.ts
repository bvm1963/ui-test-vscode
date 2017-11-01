import { UiTestVscodePage } from './app.po';

describe('ui-test-vscode App', () => {
  let page: UiTestVscodePage;

  beforeEach(() => {
    page = new UiTestVscodePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
