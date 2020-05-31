import axios from "axios";

class HelloWorldService {
  executeHelloWorldService() {
    //console.log("executed service");
    return axios.get("http://localhost:8080/hello-world");
  }
  executeHelloWorldBeanService() {
    //console.log("executed service");
    return axios.get("http://localhost:8080/hello-world-bean");
  }
  executeHelloWorldPathVariableService(name) {
    //console.log("executed service");
    /* let userName = "dummy";
    let password = "dummy";

    let basicAuthheader = "Basic " + window.btoa(userName + ":" + password);*/

    return axios.get(
      `http://localhost:8080/hello-world/path-variable/${name}`
      /*,
      {
        headers: {
          authorization: basicAuthheader,
        },
      }*/
    );
  }
}
export default new HelloWorldService();
