import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Counter.css";

class Counter extends Component {
  constructor() {
    super(); // always call super () in constructor
    this.state = {
      counter: 0,
    };
    this.increment = this.increment.bind(this); //bind method to class
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div className="counter">
        <br />
        {/*<LearningComponents />*/}
        <CounterButton
          by={1}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <CounterButton
          by={5}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <CounterButton
          by={10}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <span className="count">{this.state.counter}</span>
        <div>
          <button className="reset" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }

  reset() {
    this.setState((preState) => {
      return { counter: 0 };
    });
  }
  increment(by) {
    this.setState((preState) => {
      return { counter: preState.counter + by };
    });
  }

  decrement(by) {
    this.setState((preState) => {
      return { counter: preState.counter - by };
    });
  }
}

class CounterButton extends Component {
  /*
  constructor() {
    super();
    this.state = {
      counter: 0
    };
    this.increment = this.increment.bind(this); //bind method to class
    this.decrement = this.decrement.bind(this);
  }*/

  render() {
    return (
      <div className="counter">
        <button onClick={() => this.props.incrementMethod(this.props.by)}>
          +{this.props.by}
        </button>
        <button onClick={() => this.props.decrementMethod(this.props.by)}>
          -{this.props.by}
        </button>
      </div>
    );
  }

  /* increment() {
    this.setState(prevState => {
      return { counter: prevState.counter + this.props.by };
    });

    this.props.incrementMethod(this.props.by);
  }

  decrement() {
    this.setState(prevState => {
      return { counter: prevState.counter - this.props.by };
    });

    this.props.decrementMethod(this.props.by);
  }*/
}

CounterButton.defaultProps = {
  by: 1,
};

CounterButton.propsTypes = {
  by: PropTypes.number,
};

export default Counter;
