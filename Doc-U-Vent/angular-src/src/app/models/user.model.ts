export class User {
  private email;
  private userId;

  constructor(email: string, id: string)
  {
    this.email = email;
    this.userId = id;
  }

  getEmail(): string {
    return this.email;
  }

  getUserId() : string {
    return this.userId;
  }
}
