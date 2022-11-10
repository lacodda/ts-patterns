// ITemplate
interface ITemplate {
  name: string;
  template: string;
}

// Nofify
class Nofify {
  send(template: string, to: string): void {
    console.log(`Send ${template}: ${to}`);
  }
}

// Logger
class Logger {
  log(msg: string): void {
    console.log(`Log: ${msg}`);
  }
}

// Template
class Template {
  private readonly templates: ITemplate[] = [
    { name: 'hello', template: '<p>Hello world!</p>' }
  ];

  getByName(name: string): ITemplate | undefined {
    return this.templates.find(t => t.name === name);
  }
}

// NotificationFacade
class NotificationFacade {
  private readonly notify: Nofify;
  private readonly logger: Logger;
  private readonly template: Template;

  constructor() {
    this.notify = new Nofify();
    this.template = new Template();
    this.logger = new Logger();
  }

  send(to: string, templateName: string): void {
    const data = this.template.getByName(templateName);
    if (!data) {
      this.logger.log(`Template "${templateName}" not found!`);
      return;
    }
    this.notify.send(data.template, to);
    this.logger.log(`Template "${templateName}" sent!`);
  }
}

// Use
const notification = new NotificationFacade();
notification.send('user@mail.com', 'hello');
notification.send('user@mail.com', 'zero');
