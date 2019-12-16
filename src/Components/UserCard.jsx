import React from "react";
import { Link } from "@reach/router";

function UserCard(props) {
  const { user } = props;
  return (
    <div>
      <li>
        <Link
          user={user}
          className="userCardLink"
          to={`/users/${user.username}`}
        >
          {user.username}
        </Link>
      </li>
    </div>
  );
}

export default UserCard;
