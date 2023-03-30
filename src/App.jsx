import UsersContextProvider from "./store/users-context";
import { Component } from "react";
import SearchUser from "./components/SearchUser/SearchUser";
import classes from "./App.module.css";

class App extends Component {
  render() {
    return (
      <main className={classes.container}>
        <UsersContextProvider>
          <SearchUser />
        </UsersContextProvider>
      </main>
    );
  }
}

export default App;
