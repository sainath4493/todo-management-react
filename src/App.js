import React, { Component } from "react";
/*import FirstComponent from "./Component/learning-example/FirstComponent";
import SecondComponent from "./Component/learning-example/SecondComponent";
import ThirdComponent from "./Component/learning-example/ThirdComponent";
import FourthComponent from "./Component/learning-example/FourthComponent";*/

import TodoApp from "./Component/todo/TodoApp";
import "./App.css";
import "./bootstrap.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter />*/}
        <TodoApp />
      </div>
    );
  }
}

/*class App extends Component {
 render() {
    return (
      <div className="App">
        // <LearningComponents />
        <CounterButton by={1} />
        <CounterButton by={5} />
        <CounterButton by={10} />
      </div>
    );
  } 
}*/

/*
class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        Hello World
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
        <FourthComponent />
      </div>
    );
  }
}*/
export default App;
