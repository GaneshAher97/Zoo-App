import React from "react";
import AppContext from "./AppContext";

export default class GlobalState extends React.Component {
  constructor(props) {
    super(props);

    this.setUserData = (data) => this.setState({ userDetails: data });

    this.unsetUserData = () => this.setState({ userDetails: null });

    this.state = {
      userDetails: props.userDetails,
      setUserData: this.setUserData,
      unsetUserData: this.unsetUserData,
    };
  }

  render = () => (
    <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  );
}
