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
      .then((response) => {
        return response.data.results.map((userData) => ({
          title: userData.name.title,
          first: userData.name.first,
          last: userData.name.last,
          photo: userData.picture.large,
          country: userData.location.country,
          city: userData.location.city,
          age: userData.dob.age,
        }));
      })
      .then((data) => this.setState({ usersData: data }))
      .catch((error) => {
        if (error.response) {
          throw new Error("Something went wrong!", error.message);
        } else if (error.request) {
          throw new Error("Ops! no response was received", error.message);
        } else {
          throw new Error("Error in setting up the request!", error.message);
        }
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
