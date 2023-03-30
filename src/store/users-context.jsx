import { Component, createContext } from "react";
import axios from "axios";

export const UserContext = createContext({
  usersData: [],
});

class UsersContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=5")
      .then((response) => this.setState({ usersData: response.data.results }))
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.usersData}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UsersContextProvider;
