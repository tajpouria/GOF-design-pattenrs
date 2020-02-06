interface IPrinter {
  print(): void;
}

interface IScanner {
  scan(): void;
}

interface IFax {
  fax(): void;
}

class MultiWorkMachine implements IPrinter, IScanner, IFax {
  fax(): void {
    throw new Error("Method not implemented.");
  }
  scan(): void {
    throw new Error("Method not implemented.");
  }
  print(): void {
    throw new Error("Method not implemented.");
  }
}

class OldFashionMachine implements IScanner, IFax {
  fax(): void {
    throw new Error("Method not implemented.");
  }
  scan(): void {
    throw new Error("Method not implemented.");
  }
}
