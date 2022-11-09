// IPrototype
interface IPrototype<T> {
  clone: () => T;
}

// User
class User implements IPrototype<User> {
  createdAt: Date;

  constructor(public name: string, public email: string) {
    this.createdAt = new Date();
  }

  clone(): User {
    const target = new User(this.name, this.email);
    target.createdAt = this.createdAt;
    return target;
  }
}

// Use
const user1 = new User('User1', 'user@mail.com');
const user2 = user1.clone();
user2.name = 'User2';
console.log(user1);
console.log(user2);
