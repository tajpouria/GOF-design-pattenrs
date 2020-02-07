class HTMLBuilder {
  private children: [string, string][] = [];

  constructor(private rootElementName: string) {}

  addChild(childName: string, childContent: string) {
    this.children.push([childName, childContent]);
    return this; // Fluent Builder
  }

  get str() {
    return `
    <${this.rootElementName}>
      ${this.children.map(
        ([childName, childContent]) =>
          `<${childName}>${childContent}</${childName}>`,
      )} 
    </${this.rootElementName}>
    `;
  }
}

const htmlBuilder = new HTMLBuilder("ul");
htmlBuilder.addChild("li", "foo").addChild("li", "bar");

console.log(htmlBuilder.str);
