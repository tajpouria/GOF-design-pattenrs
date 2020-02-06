namespace react2 {
  class Shape {
    private shouldSyncHeightAndWidth = false;
    constructor(private _width: number, private _height: number) {
      if (_height === _width) this.shouldSyncHeightAndWidth = true;
    }

    get width(): number {
      return this._width;
    }
    set width(value: number) {
      this._width = value;
      if (this.shouldSyncHeightAndWidth) {
        this._height = value;
      }
    }

    get height(): number {
      return this._height;
    }
    set height(value: number) {
      this._height = value;

      if (this.shouldSyncHeightAndWidth) {
        this._width = value;
      }
    }

    get toStr(): string {
      return `Width: ${this._width}, Height: ${this._height}`;
    }
  }

  class RectAngle extends Shape {}

  class Square extends Shape {}

  function areaCalculator(rect: RectAngle): number {
    return rect.height * rect.width;
  }

  const rect = new RectAngle(10, 5);
  rect.height = 10;
  rect.width = 5;

  const sq = new RectAngle(2, 2);
  sq.width = 10;
  /* 
  LSP::
    if Square is instance of RectAngel then you should be able to use :
    ReactAngle whenever you used Square 
  */

  console.info(rect.toStr, "--->", areaCalculator(rect));
  console.info(sq.toStr, "--->", areaCalculator(sq));
}
