import assert from 'power-assert';
import { Builder, Capabilities, By, until, logging } from 'selenium-webdriver';
import { ScreenShot, msec } from './utils';

describe('Selenium Server on CircleCI', () => [
  'phantomjs',
  'firefox',
  'chrome',
].forEach(browserName => context(`browser: ${browserName}`, () => {
  const screenshotDirPath = `./screenshot/${browserName}`;
  let driver;

  before(async () => {
    const prefs = new logging.Preferences();
    prefs.setLevel(logging.Type.DRIVER, logging.Level.SEVERE); // quiet INFO
    driver = await new Builder()
    .usingServer('http://127.0.0.1:4444/wd/hub')
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

  if (browserName !== 'firefox') describe('google.co.jp', () => {
    const screenshot = new ScreenShot(screenshotDirPath, 'google.co.jp');

    it('should be access', async () => {
      await driver.get('http://www.google.co.jp/');
      await screenshot.capture(driver);
    });

    it('should be correct document title', async () => {
      const title = await driver.executeScript(() => document.title);
      assert(title === 'Google');
    });

    it('should be search website', async () => {
      await driver.wait(until.elementLocated(By.css('input[name="q"]')), 5000);
      await driver.findElement(By.css('input[name="q"]')).sendKeys('Greeting');
      await screenshot.capture(driver);
      await driver.findElement(By.css('form[name="f"]')).submit();
      await driver.wait(until.titleContains('Greeting'), 5000);
      await msec(1000);
      await screenshot.capture(driver);
    });
  });
})));
