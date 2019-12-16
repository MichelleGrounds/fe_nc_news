import React from "react";
import UserCard from "./UserCard";

function UsersList(props) {
  const { users } = props;
  return (
    <div>
      <ul>
        {users.map(user => {
          return <UserCard user={user} key={user.username} />;
        })}
      </ul>
    </div>
  );
}

export default UsersList;
