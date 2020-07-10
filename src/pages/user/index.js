import React, { Component } from "react";
import api from "./../../services/api";
import "./styles.css";

export default class User extends Component {
  state = {
    user: {},
    ad: {}
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/users/${id}`);

    this.setState({
      user: response.data.data,
      ad: response.data.ad
    });
  };

  render() {
    const { user, ad } = this.state;

    return (
      <div className="user-info">
        <div className="profile-pic">
          <img src={user.avatar} alt={user.first_name + " profile image"}></img>
        </div>
        <div>
          <strong>{user.first_name + " " + user.last_name}</strong>
          <p className="email">{user.email}</p>
          <p>Company: {ad.company}</p>
          <p>Description: {ad.text}</p>
        </div>
      </div>
    );
  }
}
