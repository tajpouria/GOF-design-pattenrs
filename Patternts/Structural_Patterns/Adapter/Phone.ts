namespace Phone {
  interface IIPhone {
    useLightningCharger(): void;
  }

  interface IAndroid {
    useMicroUSBCharger(): void;
  }

  class IPhone implements IIPhone {
    public useLightningCharger() {
      console.info("Use a lightning charger");
    }
  }

  class GooglePixel implements IAndroid {
    public useMicroUSBCharger() {
      console.info("Use a microUSB charger");
    }
  }

  class LightningToMicroUSBAdapter implements IAndroid {
    constructor(private device: IPhone) {}

    useMicroUSBCharger(): void {
      this.device.useLightningCharger();
    }
  }
}
