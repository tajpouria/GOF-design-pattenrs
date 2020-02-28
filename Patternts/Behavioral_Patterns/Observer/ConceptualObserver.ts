export {};

interface ISubject {
  state: number;
  attach(subscriber: ISubscriber): void;
  deAttach(subscriber: ISubscriber): void;
  notify(): void;
}

class Subject implements ISubject {
  public state = 0;
  private subscribers: Array<ISubscriber> = [];

  public attach(subscriber: ISubscriber) {
    this.subscribers.push(subscriber);
  }

  public deAttach(subscriber: ISubscriber) {
    this.subscribers = this.subscribers.filter(s => s !== subscriber);
  }

  public notify() {
    this.subscribers.forEach(sub => sub.update(this));
  }

  public businessLogic() {
    this.state++;
    this.notify();
  }
}

interface ISubscriber {
  update(subject: ISubject): void;
}

class ConcreteSubscriberA implements ISubscriber {
  public update(subject: ISubject) {
    if (subject.state == 1)
      console.log("State is what SubscriberA is interested in");
  }
}

class ConcreteSubscriberB implements ISubscriber {
  public update(subject: ISubject) {
    if (subject.state == 2)
      console.log("State is what SubscriberB is interested in");
  }
}

function clientCode() {
  const subA = new ConcreteSubscriberA();
  const subB = new ConcreteSubscriberB();

  const subject = new Subject();
  subject.attach(subA);
  subject.attach(subB);

  subject.businessLogic();
  subject.businessLogic();
}

clientCode();
