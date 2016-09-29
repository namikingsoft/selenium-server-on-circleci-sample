import assert from 'power-assert';
import { Builder, Capabilities, By, until, logging } from 'selenium-webdriver';
import { ScreenShot } from './utils';

describe('Selenium Server on CircleCI', () => [
  'phantomjs',
  'chrome',
].forEach(browserName => context(`browser: ${browserName}`, () => {
  const screenshotDirPath = `./screenshot/${browserName}`;
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

  describe('example.com', () => {
    const screenshot = new ScreenShot(screenshotDirPath, 'example.com');

    it('should be access', async () => {
      await driver.get('http://example.com/');
      await screenshot.capture(driver);
    });

    it('should be correct document title', async () => {
      const title = await driver.executeScript(() => document.title);
      assert(title === 'Example Domain');
    });
  });
})));
