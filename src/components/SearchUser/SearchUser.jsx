import { Component } from "react";
import { UserContext } from "../../store/users-context";
import UsersList from "../UsersList/UsersList";
import classes from "./SearchUser.module.css";

class SearchUser extends Component {
  static contextType = UserContext;
  state = {
    filteredUsers: () => this.context,
    targetUser: "",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.targetUser !== this.state.targetUser) {
      this.setState({
        filteredUsers: () =>
          this.context.filter((user) => {
            let fullName = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
            return fullName.includes(this.state.targetUser);
          }),
      });
    }
  }

  handleUserSearch = (e) => {
    this.setState({ targetUser: e.target.value.trim().toLowerCase() });
  };

  render() {
    return (
      <>
        <section className={classes.search}>
          <input
            type="search"
            onChange={this.handleUserSearch}
            value={this.state.targetUser}
            placeholder="Search by name"
          />
        </section>
        <UsersList
          users={this.state.filteredUsers()}
          target={this.state.targetUser}
        />
      </>
    );
  }
}

export default SearchUser;
