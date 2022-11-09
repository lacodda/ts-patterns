enum ImageFormat {
  png = 'png',
  jpeg = 'jpeg'
}

interface IResolution {
  width: number;
  height: number;
}

interface IImageConversion extends IResolution {
  format: ImageFormat;
}

class ImageBuilder {
  private readonly formats: ImageFormat[] = [];
  private readonly resolutions: IResolution[] = [];

  addPng(): this {
    if (this.formats.includes(ImageFormat.png)) {
      return this;
    }

    this.formats.push(ImageFormat.png);
    return this;
  }

  addJpeg(): this {
    if (this.formats.includes(ImageFormat.jpeg)) {
      return this;
    }

    this.formats.push(ImageFormat.jpeg);
    return this;
  }

  addResolution(width: number, height: number): this {
    this.resolutions.push({ width, height });
    return this;
  }

  build(): IImageConversion[] {
    const res: IImageConversion[] = [];
    for (const { width, height } of this.resolutions) {
      for (const format of this.formats) {
        res.push({
          format,
          width,
          height
        });
      }
    }
    return res;
  }
}

console.log(new ImageBuilder()
  .addJpeg()
  .addPng()
  .addResolution(100, 500)
  .addResolution(100, 600)
  .build());
