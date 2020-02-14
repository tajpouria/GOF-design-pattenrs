namespace renderer {
  interface IRenderer {
    drawCircle(radius: number): void;
  }

  class VectorRenderer implements IRenderer {
    drawCircle(radius: number): void {
      console.info(`Rendering a circle using vectors by radius: ${radius}`);
    }
  }

  class RasterRenderer implements IRenderer {
    drawCircle(radius: number): void {
      console.info(`Rendering a circle using rasters by radius: ${radius}`);
    }
  }

  class Circle {
    constructor(public renderer: IRenderer, public radius: number) {}

    public draw(): void {
      this.renderer.drawCircle(this.radius);
    }
  }

  const vrd = new VectorRenderer();
  const c = new Circle(vrd, 10);
  c.draw();

  const rrd = new RasterRenderer();
  const c1 = new Circle(rrd, 10);
  c1.draw();
}
