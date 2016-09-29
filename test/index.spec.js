import assert from 'power-assert';
import { Builder, Capabilities, By, until, logging } from 'selenium-webdriver';

describe('Selenium Server on CircleCI', () => [
  'phantomjs',
  'chrome',
].forEach(browserName => context(`browser: ${browserName}`, () => {
  let driver;

  before(async () => {
    const prefs = new logging.Preferences();
    prefs.setLevel(logging.Type.DRIVER, logging.Level.SEVERE); // quiet INFO
    driver = await new Builder()
    .withCapabilities({
      browserName,
    })
    .setLoggingPrefs(prefs)
    .buildAsync();
  });

  after(async () => {
    await driver.quit();
  });

  it('should be access http://example.com/', async () => {
    await driver.get('http://example.com/');
    const title = await driver.executeScript(() => document.title);
    assert(title === 'Example Domain');
  });
})));

