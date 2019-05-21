export class Login {
  email = 'marge@simpson.com';
  password = 'secret';

  login(e) {
    console.log(`Trying to log in ${this.email}`);
  }
}
