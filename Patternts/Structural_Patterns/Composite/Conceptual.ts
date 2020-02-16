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
