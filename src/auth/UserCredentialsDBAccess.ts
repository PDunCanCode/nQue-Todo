import { UserCredentials } from "../shared/Model";

import * as NeDb from "nedb";
import Nedb from "nedb";

export class UserCredentialsDBAccess {
  private nedb: Nedb;
  constructor() {
    this.nedb = new Nedb("database/UserCredentials.db");
    this.nedb.loadDatabase();
  }

  public async putUserCredential(
    userCredentials: UserCredentials
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(userCredentials, (err, docs: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  public async getUserCredential(
    username: string,
    password: string
  ): Promise<UserCredentials | undefined> {
    return new Promise((resolve, reject) => {
      this.nedb.find(
        { username: username, password: password },
        (err: Error, docs: UserCredentials[]) => {
          if (err) {
            reject(err);
          } else {
            if (docs.length == 0) {
              resolve(undefined);
            } else {
              console.log("method finished");
              resolve(docs[0]);
            }
          }
        }
      );
    });
  }
}
