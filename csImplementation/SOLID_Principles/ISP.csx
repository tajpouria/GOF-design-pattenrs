interface IPrinter
{
    void Print();
}

interface IScanner
{
    void Scan();
}

interface IFax
{
    void Fax();
}

class IMultiWorkerMachine : IPrinter, IScanner, IFax
{
    public void Fax()
    {
        throw new NotImplementedException();
    }

    public void Print()
    {
        throw new NotImplementedException();
    }

    public void Scan()
    {
        throw new NotImplementedException();
    }
}

class OldFashionPrinter : IPrinter
{
    public void Print()
    {
        throw new NotImplementedException();
    }
}