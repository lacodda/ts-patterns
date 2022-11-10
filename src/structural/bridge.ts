// IProvider
interface IProvider {
  sendMessage: (msg: string) => void;
  connect: <T>(config: T) => void;
  disconnect: () => void;
}

// TelegramProvider
class TelegramProvider implements IProvider {
  sendMessage(msg: string): void {
    console.log('Telegram message:', msg);
  }

  connect<T>(config: T): void {
    console.log('Telegram connected:', config);
  }

  disconnect(): void {
    console.log('Telegram disconnected');
  }
}

// WhatsUpProvider
class WhatsUpProvider implements IProvider {
  sendMessage(msg: string): void {
    console.log('WhatsUp message:', msg);
  }

  connect<T>(config: T): void {
    console.log('WhatsUp connected:', config);
  }

  disconnect(): void {
    console.log('WhatsUp disconnected');
  }
}

// NotificationSender
class NotificationSender {
  constructor(private readonly provider: IProvider) {}

  send(): void {
    this.provider.connect<string>('config');
    this.provider.sendMessage('msg text');
    this.provider.disconnect();
  }
}

// DelayNotificationSender
class DelayNotificationSender extends NotificationSender {
  sendDelayed(): void {
    console.log('Send delayed');
    setTimeout(() => {
      this.send();
    }, 1000);
  }
}

// Use
const telegramSender = new NotificationSender(new TelegramProvider());
telegramSender.send();
const whatsUpSender = new NotificationSender(new WhatsUpProvider());
whatsUpSender.send();
const whatsUpDelaySender = new DelayNotificationSender(new WhatsUpProvider());
whatsUpDelaySender.sendDelayed();
