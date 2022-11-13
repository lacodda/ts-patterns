// IObserver
interface IObserver {
  update: (subj: ISubject) => void;
}

// ISubject
interface ISubject {
  attach: (observer: IObserver) => void;
  detach: (observer: IObserver) => void;
  notify: () => void;
}

// Lead
class Lead {
  constructor(public name: string, public phone: string) {}
}

// NewLead
class NewLead implements ISubject {
  private readonly observers: IObserver[] = [];
  public state?: Lead;

  attach(observer: IObserver): void {
    if (this.observers.includes(observer)) {
      return;
    }
    this.observers.push(observer);
  }

  detach(observer: IObserver): void {
    const observerInd = this.observers.indexOf(observer);
    if (observerInd === -1) {
      return;
    }
    this.observers.splice(observerInd, 1);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

// NotificationService
class NotificationService implements IObserver {
  update(subj: ISubject): void {
    console.log('NotificationService received notification');
    console.log(subj);
  }
}

// LeadService
class LeadService implements IObserver {
  update(subj: ISubject): void {
    console.log('LeadService received notification');
    console.log(subj);
  }
}

// Use
const subj = new NewLead();
subj.state = new Lead('John', '123456');
const notificationService = new NotificationService();
const leadService = new LeadService();
subj.attach(notificationService);
subj.attach(leadService);
subj.notify();
subj.detach(leadService);
subj.notify();
