import { Component } from "react";
import { UserContext } from "../../store/users-context";
import User from "../User/User";
import classes from "./UsersList.module.css";

class UsersList extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = { isShown: true };
    this.toggleUsersList = this.toggleUsersList.bind(this);
  }

  toggleUsersList() {
    this.setState((prevState) => ({ isShown: !prevState.isShown }));
  }

  render() {
    const usersElements = this.props.users.map((user) => (
      <User key={user.first} {...user} />
    ));

    let content = "";
    if (this.context.isError)
      content = <p className={classes.loading}>{this.context.errorMessage}</p>;
    else if (usersElements.length) content = <ul>{usersElements}</ul>;
    else if (!usersElements.length && this.props.target.length)
      content = (
        <p className={classes.loading}> No User names with this letters ... </p>
      );
    else if (!usersElements.length)
      content = <p className={classes.loading}> Users pending ... </p>;

    return (
      <>
        <section className={classes.toggle}>
          <button onClick={this.toggleUsersList}>
            {this.state.isShown ? "Hide Users" : "Show Users"}
          </button>
        </section>
        {this.state.isShown && content}
      </>
    );
  }
}

export default UsersList;
