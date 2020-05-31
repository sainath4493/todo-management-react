import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponet extends Component {
  constructor(props) {
    super(props);
    this.retriveWelcomeMessgae = this.retriveWelcomeMessgae.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      welcomeMessage: "",
    };
  }
  render() {
    return (
      <>
        <h1>Welcome!</h1>
        <div className="container">
          Welcome {this.props.match.params.name}. You can manage todos{" "}
          <Link to="/todos">here</Link>.
        </div>
        <br />
        <div className="container">
          Click here to get customized welcome message.{" "}
          <button
            onClick={this.retriveWelcomeMessgae}
            className="btn btn-success"
          >
            Click
          </button>
        </div>
        <div className="container">
          <b>{this.state.welcomeMessage}</b>
        </div>
      </>
    );
  }

  retriveWelcomeMessgae() {
    /* HelloWorldService.executeHelloWorldService().then((response) =>
      this.handleSuccessfulResponse(response)
    ); */
    /* HelloWorldService.executeHelloWorldBeanService().then((response) =>
      this.handleSuccessfulResponse(response) */

    HelloWorldService.executeHelloWorldPathVariableService(
      this.props.match.params.name
    )
      .then((response) => this.handleSuccessfulResponse(response))
      .catch((error) => this.handleError(error));
  }

  handleSuccessfulResponse(response) {
    this.setState({
      welcomeMessage: response.data.message,
    });
  }

  handleError(error) {
    let errorMessage = "";
    if (error.message) {
      errorMessage += error.message;
    }

    if (error.response && error.response.data) {
      errorMessage += error.response.data.message;
    }

    this.setState({
      welcomeMessage: errorMessage,
    });
  }
}
export default WelcomeComponet;
