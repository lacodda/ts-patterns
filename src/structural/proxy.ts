// IPaymentApi
interface IPaymentApi {
  getPaymentDetail: (id: number) => IPaymentDetail | undefined;
}

// IPaymentDetail
interface IPaymentDetail {
  id: number;
  sum: number;
}

// PaymentApi
class PaymentApi implements IPaymentApi {
  private readonly data = [{ id: 1, sum: 10000 }];
  getPaymentDetail(id: number): IPaymentDetail | undefined {
    return this.data.find(d => d.id === id);
  }
}

// PaymentAccessProxy
class PaymentAccessProxy implements IPaymentApi {
  constructor(private readonly api: PaymentApi, private readonly userId: number) {}
  getPaymentDetail(id: number): IPaymentDetail | undefined {
    if (this.userId === 1) {
      return this.api.getPaymentDetail(id);
    }
    console.log('Attempt to get payment details!');
    return undefined;
  }
}

// Use
const proxy1 = new PaymentAccessProxy(new PaymentApi(), 1);
console.log(proxy1.getPaymentDetail(1));
const proxy2 = new PaymentAccessProxy(new PaymentApi(), 2);
console.log(proxy2.getPaymentDetail(1));
