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
  public async getUserById(): Promise <User | undefined> {
      return new Promise((resolve, reject)=>{
          this.nedb.find({ id: userId }, (err: Error, docs: any[]) => {
            if (err) {
                reject(err);
              } else {
                if(docs.length == 0) {
                    resolve(undefined)
                } else {
                    resolve(docs[0])
                }
              }
          })
      })
  }
}
