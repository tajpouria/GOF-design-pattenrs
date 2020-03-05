public enum State
{
    OffHook,
    Connecting,
    Connected,
    OnHold
}

enum Trigger
{
    CallDialed,
    HungUp,
    CallConnected,
    PlacedOnHold,
    TakenOffHold,
    LeftMessage
}

class Demo
{
    public static Dictionary<State, List<(Trigger, State)>> rules
      = new Dictionary<State, List<(Trigger, State)>>
      {
          [State.OffHook] = new List<(Trigger, State)>
        {
          (Trigger.CallDialed, State.Connecting)
        },
          [State.Connecting] = new List<(Trigger, State)>
        {
          (Trigger.HungUp, State.OffHook),
          (Trigger.CallConnected, State.Connected)
        },
          [State.Connected] = new List<(Trigger, State)>
        {
          (Trigger.LeftMessage, State.OffHook),
          (Trigger.HungUp, State.OffHook),
          (Trigger.PlacedOnHold, State.OnHold)
        },
          [State.OnHold] = new List<(Trigger, State)>
        {
          (Trigger.TakenOffHold, State.Connected),
          (Trigger.HungUp, State.OffHook)
        }
      };
}

var state = State.OffHook;
while (true)
{
    WriteLine($"The phone is currently {state}");
    WriteLine("Select a trigger:");

    for (var i = 0; i < Demo.rules[state].Count; i++)
    {
        var (t, _) = Demo.rules[state][i];
        WriteLine($"{i}. {t}");
    }


    int input = int.Parse(Console.ReadLine());

    var (_, s) = Demo.rules[state][input];
    state = s;
}