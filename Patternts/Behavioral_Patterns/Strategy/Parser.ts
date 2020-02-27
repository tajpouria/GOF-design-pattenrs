export {};

interface ParseStrategy {
  parse(value: [string, string[]]): string;
}

namespace parser {
  export class HTMLParser implements ParseStrategy {
    parse(value: [string, string[]]): string {
      const [type, content] = value;

      return content
        .reduce((acc, curr) => acc + curr + "\n", `<${type}>`)
        .concat(`</${type}>`);
    }
  }

  export class MarkDownParser implements ParseStrategy {
    parse(value: [string, string[]]): string {
      const [type, content] = value;

      return content.map(c => `${type} `.concat(`${c}\n`)).join("");
    }
  }
}

namespace drawer {
  export class Drawer {
    constructor(private parseStrategy: ParseStrategy) {}

    public draw(tagType: string, tagContent: string[]) {
      return this.parseStrategy.parse([tagType, tagContent]);
    }
  }
}

namespace client {
  const { Drawer } = drawer;
  const { HTMLParser, MarkDownParser } = parser;

  const htmlDrawer = new Drawer(new HTMLParser());
  const mdDrawer = new Drawer(new MarkDownParser());

  console.log(
    htmlDrawer.draw("li", ["foo", "bar"]),
    "\n",
    mdDrawer.draw("*", ["foo", "bar"]),
  );
}
