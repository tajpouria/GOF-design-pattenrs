# Composite

![Composite](https://refactoring.guru/images/patterns/content/composite/composite-comic-1-en.png)

Composite is Structural design pattern that that allows composing objects into a tree-like structure and work with it likes it's just a singular object

[./Conceptual.ts](./Conceptual.ts)

```ts
namespace compositeConceptual {
  abstract class Component {
    private _parent: Component | null = null;

    public get parent(): Component | null {
      return this._parent;
    }
    public set parent(value: Component | null) {
      this._parent = value;
    }

    public add(component: Component) {}

    public remove(component: Component) {}

    public isComposite = false;

    public abstract operation(): string;
  }

  class Leaf extends Component {
    public operation(): string {
      return "Leaf";
    }
  }

  class Composite extends Component {
    protected children: Component[] = [];

    public isComposite = true;

    public add(comp: Component) {
      this.children.push(comp);

      comp.parent = this;
    }

    public remove(comp: Component) {
      const idx = this.children.indexOf(comp);

      this.children.splice(idx, 1);

      comp.parent = null;
    }

    public operation(): string {
      const result = [];

      for (let child of this.children) {
        result.push(child.operation());
      }

      return `branch ${result.join("+")}`;
    }
  }

  const simple = new Leaf();
  console.info(simple.operation());

  const tree = new Composite();

  const branch1 = new Composite();
  branch1.add(new Leaf());
  branch1.add(new Leaf());

  const branch2 = new Composite();
  branch2.add(new Leaf());
  branch2.add(new Leaf());

  tree.add(branch1);
  tree.add(branch2);

  console.info(tree.operation());
}
```

[./GeometricShapes.ts](./GeometricShapes.ts)

```ts
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
```
