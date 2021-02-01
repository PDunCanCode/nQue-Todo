import { UserCredentialsDBAccess } from "../src/auth/UserCredentialsDBAccess";

class DbTest {
  public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}

new DbTest().dbAccess.putUserCredential({
  username: "fakeadmin",
  password: "eyeforgot",
  accessRights: [0, 1, 2, 3],
});
