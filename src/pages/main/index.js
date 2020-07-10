import React, { useState, useEffect } from "react";
import api from "./../../services/api";
import "./styles.css";
import { Link } from "react-router-dom";

const Main = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [hasNext, setHasNext] = useState();
  const [hasPrev, setHasPrev] = useState();

  const loadUsers = async (searchPage) => {
    const response = await api.get(`/users?page=${searchPage}`);

    setUsersInfo(response.data.data);
    setPage(response.data.page);
    setTotalPages(response.data.total_pages);

    verifyNext();
    verifyPrev();
  };

  const prevPage = () => {
    const nextPageNumber = page - 1;
    loadUsers(nextPageNumber);
  };

  const nextPage = () => {
    const nextPageNumber = page + 1;
    loadUsers(nextPageNumber);
  };

  const verifyNext = () => {
    setHasNext(page === totalPages);
  };

  const verifyPrev = () => {
    setHasPrev(page === 1);
  };

  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    loadUsers(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="user-list">
      {usersInfo.map((user) => (
        <article key={user.id}>
          <div className="profile-pic">
            <img
              src={user.avatar}
              alt={user.first_name + " profile image"}
            ></img>
          </div>
          <div>
            <strong>{user.first_name + " " + user.last_name}</strong>
            <p>{user.email}</p>
            <Link to={`/user/${user.id}`}>Detalhe...</Link>
          </div>
        </article>
      ))}
      <div className="actions">
        <button onClick={prevPage} disabled={hasPrev}>
          Anterior
        </button>
        <button onClick={nextPage} disabled={hasNext}>
          Próximo
        </button>
      </div>
    </div>
  );
  // }
};

export default Main;
