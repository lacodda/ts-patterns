// IMediator
interface IMediator {
  notify: (sender: string, event: string) => void;
}

// Mediated
abstract class Mediated {
  mediator?: IMediator;
  setMediator(mediator: IMediator): void {
    this.mediator = mediator;
  }
}

// Notifications
class Notifications {
  send(): void {
    console.log('Notification sent');
  }
}

// Log
class Log {
  log(message: string): void {
    console.log(`Logger: ${message}`);
  }
}

// EventHandler
class EventHandler extends Mediated {
  event(): void {
    this.mediator?.notify('EventHandler', 'event');
  }
}

// NotificationMediator
class NotificationMediator implements IMediator {
  constructor(
    public notifications: Notifications,
    public logger: Log,
    public eventHandler: EventHandler
  ) {}

  notify (_: string, event: string): void {
    switch (event) {
      case 'event':
        this.notifications.send();
        this.logger.log('sent');
        break;

      default:
        break;
    }
  }
}

// Use
const notifications = new Notifications();
const logger = new Log();
const eventHandler = new EventHandler();

const notificationMediator = new NotificationMediator(notifications, logger, eventHandler);
eventHandler.setMediator(notificationMediator);
eventHandler.event();
