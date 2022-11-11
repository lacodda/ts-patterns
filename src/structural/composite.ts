// DeliveryItem
abstract class DeliveryItem {
  items: DeliveryItem[] = [];

  addItem(item: DeliveryItem): void {
    this.items.push(item);
  }

  getItemPrices(): number {
    return this.items.reduce((sum: number, i: DeliveryItem) => sum + i.getPrice(), 0);
  }

  abstract getPrice(): number;
}

// DeliveryShop
class DeliveryShop extends DeliveryItem {
  constructor(private readonly deliveryFee: number) {
    super();
  }

  getPrice(): number {
    return this.getItemPrices() + this.deliveryFee;
  }
}

// Package
class Package extends DeliveryItem {
  getPrice(): number {
    return this.getItemPrices();
  }
}

// Product
class Product extends DeliveryItem {
  constructor(public price: number) {
    super();
  }

  getPrice(): number {
    return this.price;
  }
}

// Use
const shop = new DeliveryShop(100);
shop.addItem(new Product(1000));
const pack1 = new Package();
pack1.addItem(new Product(200));
pack1.addItem(new Product(300));
shop.addItem(pack1);
const pack2 = new Package();
pack2.addItem(new Product(30));
shop.addItem(pack2);
console.log(shop.getPrice());
