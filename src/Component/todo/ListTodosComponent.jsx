import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";
class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this);
    this.state = {
      messageSuccess: null,
      messageFailed: null,
      todos: [
        /*{
          id: 1,
          descritption: "Learn React",
          done: false,
          targetDate: new Date(),
        },
        {
          id: 2,
          descritption: "Learn Datastructure",
          done: false,
          targetDate: new Date(),
        },
        {
          id: 3,
          descritption: "Learn Spring microservices",
          done: false,
          targetDate: new Date(),
        }*/
      ],
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.refreshTodos();
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  deleteTodoClicked(id) {
    let userName = AuthenticationService.getLoggedInUserName();
    TodoDataService.deleteTodo(userName, id)
      .then((response) => {
        this.setState({
          messageSuccess: `ID : ${id} todo is deleted`,
        });

        this.refreshTodos();
      })
      .catch((error) => {
        this.setState({
          messageFailed: `Something went wrong !`,
        });
      });
  }

  addTodoClicked() {
    this.props.history.push("/todos/-1");
  }

  updateTodoClicked(id) {
    this.props.history.push(`/todos/${id}`);
  }
  refreshTodos() {
    let userName = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveAllTodos(userName)
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch((error) => {
        this.setState({
          messageFailed: `Something went wrong !`,
        });
      });
  }
  render() {
    return (
      <div className="overflow-auto">
        <div>
          <h2>List Of Todos</h2>
          <button className="btn btn-primary" onClick={this.addTodoClicked}>
            Add Todo
          </button>
        </div>
        <br />
        <div>
          {this.state.messageSuccess && (
            <div className="alert alert-success">
              {this.state.messageSuccess}
            </div>
          )}
          {this.state.messageFailed && (
            <div className="alert alert-danger">{this.state.messageFailed}</div>
          )}{" "}
        </div>
        <div className="container overflow-auto">
          <table className="table">
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th>TARGET DATE</th>
                <th>IS COMPLETED</th>
                <th>DELETE</th>
                <th>UPDATE</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{moment(todo.targetDate).format("DD MMM YYYY")}</td>
                  <td>{todo.isDone}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateTodoClicked(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteTodoClicked(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ListTodosComponent;
