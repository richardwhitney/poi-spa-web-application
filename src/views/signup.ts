export class Signup {
  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';

  signup(e) {
    console.log(`Trying to sign up ${this.email}`);
  }
}
