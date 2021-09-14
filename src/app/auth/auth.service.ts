import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //true or false for directly enter to discov page
  private _userIsAuthenticated = true;
  // this userId is set to xyz so not equal to places Service
  private _userId = 'abc';

  get userIsAuthenticated() {
    // eslint-disable-next-line no-underscore-dangle
    return this._userIsAuthenticated;
  }

  get userId() {
    // eslint-disable-next-line no-underscore-dangle
    return this._userId;
  }
  constructor() { }

  login() {
    // eslint-disable-next-line no-underscore-dangle
    this._userIsAuthenticated = true;
  }
  logout() {
    // eslint-disable-next-line no-underscore-dangle
    this._userIsAuthenticated = false;
  }
}
