// IAuthStrategy
interface IAuthStrategy {
  auth: (user: StrUser) => boolean;
}

// StrUser
class StrUser {
  jwtToken?: string;
  githubToken?: string;
}

// Auth
class Auth {
  constructor (private strategy: IAuthStrategy) {}

  public setStrategy(strategy: IAuthStrategy): void {
    this.strategy = strategy;
  }

  public authUser(user: StrUser): boolean {
    return this.strategy.auth(user);
  }
}

// JwtStrategy
class JwtStrategy implements IAuthStrategy {
  auth (user: StrUser): boolean {
    if (user.jwtToken) {
      return true;
    }
    return false;
  }
}

// GithubStrategy
class GithubStrategy implements IAuthStrategy {
  auth (user: StrUser): boolean {
    if (user.githubToken) {
      return true;
    }
    return false;
  }
}

// Use
const user = new StrUser();
user.jwtToken = 'token';
const authStr = new Auth(new JwtStrategy());
console.log(authStr.authUser(user));
authStr.setStrategy(new GithubStrategy());
console.log(authStr.authUser(user));
