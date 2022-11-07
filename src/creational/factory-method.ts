interface IDelivery {
  id: number;
  status: number;
  setWeight(weight: number): void;
  setAddress(address: string): void;
  calculate(): Promise<number>;
}

// FirstDelivery
class FirstDelivery implements IDelivery {
  id!: number;
  status: number = 0;
  private weight: number = 0;
  private address: string = '';

  setWeight(weight: number): void {
    this.weight = weight;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  async calculate(): Promise<number> {
    const res = await fetch('/first', {
      method: 'POST',
      body: JSON.stringify({ weight: this.weight, city: this.address }),
    });
    const data = await res.json();
    return data.sum;
  }
}

// SecondDelivery
class SecondDelivery implements IDelivery {
  id!: number;
  status: number = 0;
  private weight: number = 0;
  private address: string = '';

  setWeight(weight: number): void {
    this.weight = weight;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  async calculate(): Promise<number> {
    const res = await fetch('/second', {
      method: 'POST',
      body: JSON.stringify({ weight: this.weight, address: this.address }),
    });
    const data = await res.json();
    return data.result;
  }
}

// DeliveryFactory
abstract class DeliveryFactory {
  db: any;

  abstract createDelivery(): IDelivery;

  saveHistory(ins: IDelivery) {
    this.db.save(ins.id, ins.status);
  }
}

// FirstDeliveryFactory
class FirstDeliveryFactory extends DeliveryFactory {
  createDelivery(): FirstDelivery {
    return new FirstDelivery();
  }
}

// SecondDeliveryFactory
class SecondDeliveryFactory extends DeliveryFactory {
  createDelivery(): SecondDelivery {
    return new SecondDelivery();
  }
}

// Use
const firstDeliveryFactory = new FirstDeliveryFactory();
const instance = firstDeliveryFactory.createDelivery();
firstDeliveryFactory.saveHistory(instance);
