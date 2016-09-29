import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

export type Driver = any;

export const msec: (_:number) => Promise<void>
= x => new Promise(resolve => setTimeout(resolve, x));

export const screenshot: (_:Driver) => (_:string) => Promise<void>
= driver => filename => new Promise((resolve, reject) =>
  driver.takeScreenshot().then(base64Image => {
    const decodedImage = new Buffer(base64Image, 'base64');
    fs.writeFile(filename, decodedImage, err => (
      err ? reject(err) : resolve()
    ));
  })
);

export class ScreenShot {
  name: string;
  dirpath: string;
  index: number;

  constructor(dirpath: string, name: string) {
    this.name = name;
    this.dirpath = dirpath;
    this.index = 0;
    mkdirp.sync(dirpath);
  }

  capture: (_:Driver) => Promise<void>
  = driver => screenshot(driver)(
    path.join(this.dirpath, `${this.name}--${(++this.index).toString(36)}.png`)
  );
}
