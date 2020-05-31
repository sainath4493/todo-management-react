import React, { Component } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthenticationService from "./AuthenticationService";
import TodoDataService from "../../api/todo/TodoDataService";
class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      description: " ",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
      isDone: "false",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (this.state.id === -1) {
      return;
    } else {
      let userName = AuthenticationService.getLoggedInUserName();
      TodoDataService.retrieveTodo(userName, this.state.id).then((response) =>
        this.setState({
          description: response.data.description,
          targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
        })
      );
    }
  }
  onSubmit(values) {
    let userName = AuthenticationService.getLoggedInUserName();

    let todo = {
      id: this.state.id,
      isDone: values.isDone,
      username: userName,
      description: values.description,
      targetDate: values.targetDate,
    };
    if (this.state.id === "-1") {
      TodoDataService.createTodo(userName, todo).then(() => {
        this.props.history.push("/todos");
      });
    } else {
      TodoDataService.updateTodo(userName, this.state.id, todo).then(() => {
        this.props.history.push("/todos");
      });
    }
  }

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atlist 5 character in Description";
    }
    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a valid Target Date";
    }
    return errors;
  }

  render() {
    /* let description = this.state.description;
    let targetDate = this.state.targetDate;*/
    let { description, targetDate, isDone } = this.state;
    return (
      <div>
        <h1>Todo</h1>
        <div className="container overflow-auto">
          <Formik
            initialValues={{
              /*description: description,
              targetDate: targetDate,
              */
              description,
              targetDate,
              isDone,
            }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label>IS COMPLETED</label>
                  <Field
                    className="form-control"
                    type="radio"
                    name="isDone"
                    value="TRUE"
                  ></Field>
                  <label>True</label>

                  <Field
                    className="form-control"
                    type="radio"
                    name="isDone"
                    value="FALSE"
                  ></Field>
                  <label>False</label>
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default TodoComponent;
