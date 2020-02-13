namespace vectorRaster2 {
  class Point {
    constructor(public x: number, public y: number) {}
  }

  class Line {
    constructor(public start: Point, public end: Point) {}
  }

  class VectorRectAngle {
    public vectors: Line[] = [];

    constructor(x: number, y: number, width: number, height: number) {
      this.vectors.push(new Line(new Point(x, y), new Point(x + width, y)));
      this.vectors.push(
        new Line(new Point(x + width, y), new Point(x + width, y + height)),
      );
      this.vectors.push(new Line(new Point(x, y), new Point(x, y + height)));
      this.vectors.push(
        new Line(new Point(x, y + height), new Point(x + width, y + height)),
      );
    }
  }

  class Drawer {
    public drawPoint(point: Point): string {
      return ".";
    }
  }

  class LineToPointAdapter {
    public static count = 0;

    public result: Point[] = [];

    constructor(line: Line) {
      console.log(
        `${++LineToPointAdapter.count}- Generating points form line [${
          line.start.x
        }, ${line.start.y}]-[${line.end.x}, ${line.end.y}]`,
      );

      const left = Math.min(line.start.x, line.end.x);
      const right = Math.max(line.start.x, line.end.x);
      const top = Math.min(line.start.y, line.end.y);
      const bottom = Math.max(line.start.y, line.end.y);
      const dx = right - left;
      const dy = line.end.y - line.start.y;

      if (dx == 0) {
        for (let y = top; y <= bottom; ++y) {
          this.result.push(new Point(left, y));
        }
      } else if (dy == 0) {
        for (let x = left; x <= right; ++x) {
          this.result.push(new Point(x, top));
        }
      }
    }
  }

  class PointToLineDrawerAdapter extends Drawer {
    constructor(private lineToPointAdapter: LineToPointAdapter) {
      super();
    }

    public drawLine() {
      const points = this.lineToPointAdapter.result;

      points.forEach(p => {
        this.drawPoint(p);
      });
    }
  }

  const vra = new VectorRectAngle(1, 1, 10, 10);
  vra.vectors.forEach(vector => {
    const ptla = new PointToLineDrawerAdapter(new LineToPointAdapter(vector));
    ptla.drawLine();
  });
}
