enum OutputFormat
{
    Markdown,
    Html
}

interface IListStrategy
{
    void Start(StringBuilder sb);
    void End(StringBuilder sb);
    void AddListItem(StringBuilder sb, string item);
}
class MarkdownListStrategy : IListStrategy
{
    public void Start(StringBuilder sb)
    {
        // markdown doesn't require a list preamble
    }

    public void End(StringBuilder sb)
    {

    }

    public void AddListItem(StringBuilder sb, string item)
    {
        sb.AppendLine($" * {item}");
    }
}
class HtmlListStrategy : IListStrategy
{
    public void Start(StringBuilder sb)
    {
        sb.AppendLine("<ul>");
    }

    public void End(StringBuilder sb)
    {
        sb.AppendLine("</ul>");
    }

    public void AddListItem(StringBuilder sb, string item)
    {
        sb.AppendLine($"  <li>{item}</li>");
    }
}

class TextProcessor
{
    private StringBuilder sb = new StringBuilder();
    private IListStrategy listStrategy;


    public void SetOutputFormat(OutputFormat outputFormat)
    {
        switch (outputFormat)
        {
            case OutputFormat.Html:
                listStrategy = new HtmlListStrategy();
                break;
            case OutputFormat.Markdown:
                listStrategy = new MarkdownListStrategy();
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(outputFormat), outputFormat, null);
        }
    }

    public void AppendList(IEnumerable<string> items)
    {
        listStrategy.Start(sb);
        foreach (var item in items)
            listStrategy.AddListItem(sb, item);
        listStrategy.End(sb);
    }

    public StringBuilder Clear()
    {
        return sb.Clear();
    }

    public override string ToString()
    {
        return sb.ToString();
    }
}

var tp = new TextProcessor();
tp.SetOutputFormat(OutputFormat.Markdown);
tp.AppendList(new[] { "foo", "bar", "baz" });
WriteLine(tp);

tp.Clear();
tp.SetOutputFormat(OutputFormat.Html);
tp.AppendList(new[] { "foo", "bar", "baz" });
WriteLine(tp);