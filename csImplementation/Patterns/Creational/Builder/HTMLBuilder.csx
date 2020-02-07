using System;
using System.Collections.Generic;
using System.Text;

class HTMLElement
{
    public string Name, Text;
    public List<HTMLElement> Elements = new List<HTMLElement>();
    private const int indentSize = 2;

    public HTMLElement(string name, string text)
    {
        Name = name;
        Text = text;
    }

    private string ToStingImpl(int indent)
    {

        StringBuilder sb = new StringBuilder();
        string i = new string(' ', indent * indentSize);
        sb.AppendFormat("{0}<{1}>\n", i, Name);

        if (!string.IsNullOrWhiteSpace(Text))
        {
            sb.AppendFormat("{0}{1}\n", new string(' ', indent + 1 * indentSize), Text);
        }

        foreach (HTMLElement el in Elements)
        {
            sb.Append(el.ToStingImpl(indentSize + 1));
        }

        sb.AppendFormat("{0}</{1}>\n", i, Name);

        return sb.ToString();
    }

    public override string ToString()
    {
        return ToStingImpl(0);
    }
}

class HTMLBuilder
{
    private readonly string RootName;
    private HTMLElement Root;

    public HTMLBuilder(string rootName)
    {
        Clear();

        RootName = rootName;
        Root.Name = rootName;
    }

    public HTMLBuilder AppendChild(string childName, string childText)
    {
        Root.Elements.Add(new HTMLElement(childName, childText));
        return this;
    }

    public override string ToString()
    {
        return Root.ToString();
    }

    public void Clear()
    {
        this.Root = new HTMLElement(RootName, " ");
    }
}

StringBuilder sb = new StringBuilder();
List<string> lis = new List<string> { "foo", "bar" };

sb.Append("<ul>");
foreach (string li in lis)
{
    sb.AppendFormat("<li>{0}</li>", li);
}
sb.Append("</ul>");

Console.WriteLine(sb);

HTMLBuilder hb = new HTMLBuilder("ul");
hb.AppendChild("li", "foo").AppendChild("li", "bar");
Console.WriteLine(hb.ToString());