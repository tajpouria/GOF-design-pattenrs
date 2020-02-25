namespace geometricShape {
  class ShapeObject {
    public children: ShapeObject[] = [];

    constructor(protected color: string = "", protected name = "Group") {}

    public toStr() {
      return this.print("", 0);
    }

    private print(sb: string, depth: number) {
      sb += "*".repeat(depth);
      sb += `${this.color} ${this.name}\n`;

      for (let child of this.children) {
        sb += child.print("", depth + 1);
      }

      return sb;
    }
  }

  class Circle extends ShapeObject {
    name = "Circle";
  }

  class Square extends ShapeObject {
    name = "Square";
  }

  const drawing = new ShapeObject("", "MyDrawing");
  drawing.children.push(new Circle("red"), new Square("blue"));

  const group = new ShapeObject();
  group.children.push(new Circle("Orange"), new Square("Green "));

  drawing.children.push(group);

  console.info(drawing.toStr());
}
