import Nedb from "nedb";
import { User } from "../shared/Model";

export class UsersDBAccess {
  private nedb: Nedb;
  constructor() {
    this.nedb = new Nedb("database/Users.db");
    this.nedb.loadDatabase();
  }
  public async putUser(user: User) {
    return new Promise<void>((resolve, reject) => {
      this.nedb.insert(user, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
