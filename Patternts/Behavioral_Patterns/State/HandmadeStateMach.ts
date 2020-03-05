import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

namespace handmadeStateMachine {
  enum StateTypes {
    "OffHook" = "OffHook",
    "Connecting" = "Connecting",
    "Connected" = "Connected",
    "OnHold" = "OnHold",
  }

  enum TriggersTypes {
    "CallDialed" = "CallDialed",
    "HungUp" = "HungUp",
    "CallConnected" = "CallConnected",
    "PlacedOnHold" = "PlacedOnHold",
    "TakenOffHold" = "TakenOffHold",
    "LeftMessage" = "LeftMessage",
  }

  const rules: Record<StateTypes, [TriggersTypes, StateTypes][]> = {
    [StateTypes.OffHook]: [[TriggersTypes.CallDialed, StateTypes.Connecting]],

    [StateTypes.Connecting]: [
      [TriggersTypes.HungUp, StateTypes.OffHook],
      [TriggersTypes.CallConnected, StateTypes.Connecting],
    ],
    [StateTypes.Connected]: [
      [TriggersTypes.LeftMessage, StateTypes.OffHook],
      [TriggersTypes.HungUp, StateTypes.OffHook],
      [TriggersTypes.PlacedOnHold, StateTypes.OnHold],
    ],
    [StateTypes.OnHold]: [
      [TriggersTypes.TakenOffHold, StateTypes.Connected],
      [TriggersTypes.HungUp, StateTypes.OffHook],
    ],
  };

  let state = StateTypes.OffHook;

  rl.question(`The phone is currently ${state}\nPress anyThing:\n`, () => {
    rl.setPrompt("Select a trigger:\n");
    rl.prompt();
    for (let index = 0; index < Object.keys(rules[state]).length; index++) {
      const [t] = rules[state];
      console.info(`${index}. ${t}`);
    }

    rl.on("line", answer => {
      state = rules[state][parseInt(answer)][1];

      rl.setPrompt(`The phone is currently ${state}\n Select a trigger:\n`);
      rl.prompt();

      for (let index = 0; index < Object.keys(rules[state]).length; index++) {
        const [t] = rules[state];
        console.info(`${index}. ${t}`);
      }
    });
  });
}
