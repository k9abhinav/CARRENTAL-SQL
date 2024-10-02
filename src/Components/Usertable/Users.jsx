import React, { useEffect, useState } from "react";


function Users() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <th>ID</th>
            <th>Username</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
          <tr key={i}>
            <td>{d.user_id}</td>
            <td>{d.username}</td>
          </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
}

export default Users;
