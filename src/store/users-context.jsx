import { Component, createContext } from "react";
import axios from "axios";

export const UserContext = createContext({
  usersData: [],
  isError: false,
  errorMessage: "",
});

class UsersContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersData: [],
      isError: false,
      errorMessage: "",
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
          this.setState({
            isError: true,
            errorMessage: `Something went wrong! ${error.message}`,
          });
          throw new Error(error.message);
        } else if (error.request) {
          this.setState({
            isError: true,
            errorMessage: `Ops! no response was received ${error.message}`,
          });
          throw new Error(error.message);
        } else {
          this.setState({
            isError: true,
            errorMessage: `Error in setting up the request! ${error.message}`,
          });
          throw new Error(error.message);
        }
      });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UsersContextProvider;
