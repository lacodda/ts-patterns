// Form
class Form {
  constructor(public name: string) {}
}

// SaveForm
abstract class SaveForm<T> {
  public save(form: Form): void {
    const res = this.fill(form);
    this.log(res);
    this.send(res);
  }

  protected abstract fill(form: Form): T;
  protected log(data: T): void {
    console.log(data);
  }
  protected abstract send(data: T): void;
}

// FirstApi
class FirstApi extends SaveForm<string> {
  protected fill(form: Form): string {
    return form.name;
  }

  protected send(data: string): void {
    console.log(`Sent: ${data}`);
  }
}

// SecondApi
class SecondApi extends SaveForm<{ name: string }> {
  protected fill(form: Form): { name: string } {
    return { name: form.name };
  }

  protected send(data: { name: string }): void {
    console.log(`Sent: ${data.name}`);
  }
}

// Use
const firstForm = new FirstApi();
firstForm.save(new Form('John'));

const secondForm = new SecondApi();
secondForm.save(new Form('John'));
