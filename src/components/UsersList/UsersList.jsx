import { Component } from "react";
import User from "../User/User";
import classes from "./UsersList.module.css";

class UsersList extends Component {
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
      <User
        key={user.name.first}
        title={user.name.title}
        first={user.name.first}
        last={user.name.last}
        photo={user.picture.large}
        country={user.location.country}
        city={user.location.city}
        age={user.dob.age}
      />
    ));

    const loading =
      usersElements.length > 0 ? (
        <ul>{usersElements}</ul>
      ) : this.props.target.length === 0 ? (
        <p className={classes.loading}> Users pending ... </p>
      ) : (
        <p className={classes.loading}> No User names with this letters ... </p>
      );

    return (
      <>
        <section className={classes.toggle}>
          <button onClick={this.toggleUsersList}>
            {this.state.isShown ? "Hide Users" : "Show Users"}
          </button>
        </section>
        {this.state.isShown && loading}
      </>
    );
  }
}

export default UsersList;
