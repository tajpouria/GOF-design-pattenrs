# Adapter

Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.

The Adapter acts as a wrapper between two objects. It catches calls for one object and transforms them to format and interface recognizable by the second object.

![Adapter](https://refactoring.guru/images/patterns/content/adapter/adapter.png)

[ ./Target.ts ](./Target.ts)

```ts
namespace target {
  class Target {
    request() {
      return "The default Target's behavior";
    }
  }

  export class Adaptee {
    specificRequest() {
      return ".eetpadA eht fo roivaheb laicepS";
    }
  }

  export class Adaptor extends Target {
    constructor(private adaptee: Adaptee) {
      super();
    }

    request() {
      const result = this.adaptee
        .specificRequest()
        .split("")
        .reverse()
        .join("");

      return result;
    }
  }
}

namespace demo {
  const { Adaptee, Adaptor } = target;

  const ada = new Adaptee();

  const adaptor = new Adaptor(ada);

  console.log(adaptor.request());
}
```

[./VectorRaster.ts](./VectorRaster.ts)

```ts
export {};

namespace geometry {
  export class Point {
    constructor(public x: number, public y: number) {}
  }

  export class Line {
    constructor(public start: Point, public end: Point) {}
  }

  class VectorObject {
    begin() {}

    end() {}
  }

  export class VectorRectangle extends VectorObject {
    private _lines: Array<Line> = new Array();

    public get lines() {
      return this._lines;
    }

    constructor(
      private x: number,
      private y: number,
      private width: number,
      private height: number,

      private _Point = Point,
      private _Line = Line,
    ) {
      super();
      this.reset(x, y, width, height);
    }

    reset(x: number, y: number, width: number, height: number) {
      const { _lines, _Point, _Line } = this;

      _lines.push(new _Line(new _Point(x, y), new _Point(x + width, y)));
      _lines.push(
        new Line(new _Point(x + width, y), new _Point(x + width, y + height)),
      );
      _lines.push(new Line(new _Point(x, y), new _Point(x, y + height)));
      _lines.push(
        new Line(new _Point(x, y + height), new _Point(x + width, y + height)),
      );
    }
  }
}

namespace pixelDrawer {
  const { Point, VectorRectangle } = geometry;

  class PixelDrawer {
    constructor(private pixels: Array<Point>) {}

    draw() {
      this.pixels.map(p => console.log(p.x, p.y));
    }
  }

  // ADAPTER

  export class LineToPixelAdapter extends PixelDrawer {
    // @ts-ignore
    constructor(private adaptee: VectorRectangle) {
      const pixels = adaptee.lines.map((line: any) => {
        // Some how convert line to points
      });

      super(pixels);
    }
  }

  const drawer = new LineToPixelAdapter(new VectorRectangle(1, 1, 1, 1));

  drawer.draw();
}
```
