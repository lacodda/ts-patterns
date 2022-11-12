// Person
class Person {
  constructor(public userId: number) {}
}

// CommandHistory
class CommandHistory {
  public commands: Command[] = [];

  push(command: Command): void {
    this.commands.push(command);
  }

  remove(command: Command): void {
    this.commands = this.commands.filter(c => c.commandId !== command.commandId);
  }
}

// Command
abstract class Command {
  public commandId: number;

  abstract exec(): void;

  constructor(public history: CommandHistory) {
    this.commandId = Math.random();
  }
}

// AddUserCommand
class AddUserCommand extends Command {
  constructor(
    private readonly user: Person,
    private readonly receiver: UserService,
    history: CommandHistory
  ) {
    super(history);
  }

  exec(): void {
    this.receiver.saveUser(this.user);
    this.history.push(this);
  }

  undo(): void {
    this.receiver.deleteUser(this.user.userId);
    this.history.remove(this);
  }
}

// UserService
class UserService {
  saveUser(user: Person): void {
    console.log(`Save user with id ${user.userId}`);
  }

  deleteUser(userId: number): void {
    console.log(`Delete user with id ${userId}`);
  }
}

// UserController
class UserController {
  receiver?: UserService;
  history: CommandHistory = new CommandHistory();

  addReceiver(receiver: UserService): void {
    this.receiver = receiver;
  }

  run(): void {
    if (!this.receiver) {
      console.log('No receiver');
      return;
    }
    const addUserCommand = new AddUserCommand(
      new Person(1),
      this.receiver,
      this.history
    );
    addUserCommand.exec();
    console.log(addUserCommand.history);
    addUserCommand.undo();
    console.log(addUserCommand.history);
  }
}

// Use
const userController = new UserController();
userController.addReceiver(new UserService());
userController.run();
