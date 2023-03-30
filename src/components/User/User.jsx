import { Component } from "react";
import classes from "./User.module.css";

class User extends Component {
  render() {
    return (
      <li className={classes["user-item"]}>
        <div>
          <img
            src={this.props.photo}
            alt={`${this.props.first} ${this.props.last}`}
          />
        </div>
        <p>
          <span>Name:</span>
          {`${this.props.title} ${this.props.first} ${this.props.last}`}
        </p>
        <p>
          <span>Country: </span> {this.props.country}
        </p>
        <p>
          <span>City:</span> {this.props.city}
        </p>
        <p>
          <span>Age: </span> {this.props.age}
        </p>
      </li>
    );
  }
}
export default User;
