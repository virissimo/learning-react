import React, { useState, useEffect } from "react";
import api from "./../../services/api";
import "./styles.css";

const User = (props) => {
  const [user, setUser] = useState({});
  const [ad, setAd] = useState({});

  const loadUser = async () => {
    const { id } = props.match.params;
    const response = await api.get(`/users/${id}`);

    setUser(response.data.data);
    setAd(response.data.ad);
  };

  useEffect(() => {
    loadUser();
  });

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
};

export default User;
