namespace htmlBuilder2 {
  function space(times = 1): string {
    const sp = " ";
    return sp.repeat(times);
  }

  class HTMLElement {
    public name = " ";
    public text = " ";
    public indentSize = 2;
    public elements: Array<HTMLElement> = [];

    public toString(indent: number): string {
      const { name, text, elements, indentSize } = this;

      const res = [];

      const tarIndent = indent * indentSize;

      res.push(space(tarIndent));
      res.push(`<${name}>\n`);

      if (text?.trim()) {
        res.push(space(tarIndent));
        res.push(`${text}\n`);
      }

      if (elements.length) res.push(elements.map(e => e.toString(indent + 1)));

      res.push(space(tarIndent));
      res.push(`</${name}>\n`);

      return res.join("");
    }

    public appendChild(element: HTMLElement): void {
      this.elements.push(element);
    }
  }

  class HTMLBuilder {
    private _root = new HTMLElement();
    constructor(private rootName: string) {
      this.clear();
      this._root.name = rootName;
    }

    public appendChild(childName: string, childText: string): HTMLBuilder {
      const ele = new HTMLElement();
      ele.name = childName;
      ele.text = childText;

      this._root.appendChild(ele);

      return this;
    }

    public toString(): string {
      return this._root.toString(0);
    }

    public clear(): void {
      this._root = new HTMLElement();
    }
  }

  const hbl = new HTMLBuilder("ul");
  hbl.appendChild("li", "foo").appendChild("li", "bar");
  console.log(hbl.toString());
}
