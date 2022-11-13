// IIterator
interface IIterator<T> {
  current: () => T | undefined;
  next: () => T | undefined;
  prev: () => T | undefined;
  index: () => number;
}

// Task
class Task {
  constructor(public priority: number) {

  }
}

// TaskList
class TaskList {
  private tasks: Task[] = [];

  public sortByPriority(): void {
    this.tasks = this.tasks.sort((a, b) => {
      if (a.priority > b.priority) {
        return 1;
      } else if (a.priority === b.priority) {
        return 0;
      } else {
        return -1;
      }
    });
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public count(): number {
    return this.tasks.length;
  }

  public getIterator(): PriorityTaskItetator {
    return new PriorityTaskItetator(this);
  }
}

// PriorityTaskItetator
class PriorityTaskItetator implements IIterator<Task> {
  private pos: number = 0;
  private readonly taskList: TaskList;

  constructor(taskList: TaskList) {
    taskList.sortByPriority();
    this.taskList = taskList;
  }

  current(): Task | undefined {
    return this.taskList.getTasks()[this.pos];
  }

  next(): Task | undefined {
    this.pos += 1;
    return this.taskList.getTasks()[this.pos];
  }

  prev(): Task | undefined {
    this.pos -= 1;
    return this.taskList.getTasks()[this.pos];
  }

  index(): number {
    return this.pos;
  }
}

// Use
const taskList = new TaskList();
taskList.addTask(new Task(8));
taskList.addTask(new Task(1));
taskList.addTask(new Task(3));
taskList.addTask(new Task(2));
const iterator = taskList.getIterator();
console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());
