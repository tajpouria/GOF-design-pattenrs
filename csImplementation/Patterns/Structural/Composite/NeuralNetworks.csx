using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;

class ExtentionMethods
{
    public static void ConnectTo(IEnumerable<Neoron> self, IEnumerable<Neoron> other)
    {
        if (ReferenceEquals(self, other)) return;

        foreach (var from in self)
        {
            foreach (var to in other)
            {
                from.Out.Add(to);
                to.In.Add(from);
            }
        }
    }

}

class Neoron : IEnumerable<Neoron>
{
    public float Value;

    public List<Neoron> In, Out;

    public void ConnectTo(Neoron other)
    {
        Out.Add(other);
        other.In.Add(this);
    }

    public IEnumerator<Neoron> GetEnumerator()
    {
        yield return this;
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

class NeoronLayer : Collection<Neoron>
{ }