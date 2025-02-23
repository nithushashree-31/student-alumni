import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  private user;

  constructor() {
    this.user = {};
  }

  setUser(user: any): void {
    this.user = user;
  }
  getUser(): any {
    return this.user;
  }
}
