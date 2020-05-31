import axios from "axios";
import { API_URL, USER_NAME_SESSION_ATTRIBUTE_NAME } from "../../Constants";

class AuthenticationService {
  executeBasicAuthenticationService(username, password) {
    let basicAuthheader = this.careateBasicAuthToken(username, password);
    return axios.get(`${API_URL}/basicauth`, {
      headers: {
        authorization: basicAuthheader,
      },
    });
  }

  executeJwtAuthenticationService(username, password) {
    return axios.post(`${API_URL}/authenticate`, {
      username,
      password,
    });
  }

  careateBasicAuthToken(username, password) {
    return "Basic " + window.btoa(username + ":" + password);
  }

  createJwtToken(token) {
    return "Bearer " + token;
  }

  registerSuccessfulLogin(username, password) {
    let basicAuthheader = this.careateBasicAuthToken(username, password);

    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(basicAuthheader);
  }

  registerSuccessfulLoginForJwt(username, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createJwtToken(token));
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return false;
    }
    return true;
  }
  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return "";
    }
    return user;
  }

  setupAxiosInterceptors(token) {
    /*  let userName = "dummy";
    let password = "dummy";

    let basicAuthheader = "Basic " + window.btoa(userName + ":" + password);
*/
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn) {
        config.headers.authorization = token;
      }
      return config;
    });
  }
}
export default new AuthenticationService();
