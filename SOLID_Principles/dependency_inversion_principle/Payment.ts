// bad Pattern

class Stripe {
  constructor(public userName: string) {}

  applyPayment(cashInCent: number) {
    console.info(`${this.userName} payed ${cashInCent}`);
  }
}

class Paypal {
  applyPayment(userName: string, cashInDollar: number) {
    console.info(`${userName} payed ${cashInDollar}`);
  }
}

class BadStore {
  private stripe: Stripe;

  private userName: string;
  private paypal = new Paypal();

  constructor(userName: string) {
    this.stripe = new Stripe(userName);

    this.userName = userName;
  }

  buyHamlet(quantity: number) {
    this.stripe.applyPayment((quantity * 10) / 100);
    this.paypal.applyPayment(this.userName, quantity * 10);
  }
}

// right pattern

class StripePaymentProcessor {
  private stripe: Stripe;

  constructor(private userName: string) {
    this.stripe = new Stripe(userName);
  }

  pay(cash: number) {
    this.stripe.applyPayment(cash / 100);
  }
}

class PaypalPaymentProcessor {
  private payPal = new Paypal();

  constructor(private userName: string) {}

  pay(cash: number) {
    this.payPal.applyPayment(this.userName, cash);
  }
}

class RightStore {
  constructor(
    private paymentProcessor: StripePaymentProcessor | PaypalPaymentProcessor,
  ) {}

  buyHamlet(quantity: number) {
    this.paymentProcessor.pay(quantity & 10);
  }
}
