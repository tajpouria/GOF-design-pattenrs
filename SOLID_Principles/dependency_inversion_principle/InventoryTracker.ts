// bad approach

class HttpRequester {
  constructor(public items: string[]) {}

  public send() {
    console.info("Sending use Http policy");
  }
}

class WebSocketRequester {
  constructor(public items: string[]) {}

  public send() {
    console.info("Sending use WebSocket policy");
  }
}

class BadInventoryTracker {
  private httpRequester: HttpRequester;
  private webSocketRequester: WebSocketRequester;

  constructor(public items: string[]) {
    this.httpRequester = new HttpRequester(items);
    this.webSocketRequester = new WebSocketRequester(items);
  }

  sendItems() {
    this.httpRequester.send();
    this.webSocketRequester.send();
  }
}

// right approach

class Requester {
  constructor(private requesterStrategy: HttpRequester | WebSocketRequester) {}

  send() {
    this.requesterStrategy.send();
  }
}

class GoodInventoryTracker {
  constructor(public items: string[], public requester: Requester) {}

  sendItems() {
    this.requester.send();
  }
}
