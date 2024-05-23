import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

import endpoints from "../../constants/endpoints";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

const Users = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(endpoints.users, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => err);
  }, []);

  return (
    <div className="post-list-page mt-10">
      <div className="page-header flex justify-between px-7 mb-7">
        <div className="page-title text-3xl text-zinc-900 font-bold">Users</div>
        <div>
          <h1>Theme Switcher</h1>
          <button onClick={toggleTheme}>Toggle Theme ({theme})</button>
        </div>
      </div>
      <div className="page-body mt-10">
        {/* <Table columns={columns} rows={rows} /> */}
        <Table striped bordered hover responsive variant={theme}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Address</th>
              <th>PostalCode</th>
              <th>City</th>
              <th>Country</th>
              <th>SubDepartment</th>
              <th>Manager</th>
              <th>Avatar</th>
              <th>Department</th>
              <th>Group</th>
              <th>Division</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((row: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <a
                        // href="#"
                        onClick={() => navigate(`/work/${row.id}`)}
                        style={{ color: "blue" }}
                      >
                        {index + 1}
                      </a>
                    </td>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td>{row.position}</td>
                    <td>{row.phone}</td>
                    <td>{row.address}</td>
                    <td>{row.postalCode}</td>
                    <td>{row.city}</td>
                    <td>{row.country}</td>
                    <td>{row.subDepartment?.title}</td>
                    <td>
                      {row.manager?.firstName + " " + row.manager?.lastName}
                    </td>
                    <td>
                      <Image src={row.avatar?.link} fluid />
                    </td>
                    <td>{row.department?.title}</td>
                    <td>{row.group}</td>
                    <td>{row?.division?.title}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
