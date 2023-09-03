import React, { Fragment, useEffect, useState } from "react";
import Employees from "./Employees";
import "../DisplayEmployees.css";
import AddEmployees from "./AddEmployees";
import EditEmployees from "./EditEmployees";
import axios from "axios";

function DisplayEmployees() {
  const [empArr, setEmpArr] = useState(Employees);
  const [emptoUpdate, setEmptoUpdate] = useState({});
  const [isEdit, setIsEdit] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    axios
      .get("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1")
      .then((response) => {
        setEmpArr(
          response.data.map((apiitem) => {
            return {
              id: apiitem.id,
              Name: apiitem.firstName,
              Age: apiitem.age,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    console.log("Deleted Id is: " + id);
    const newEmployees = empArr.filter((employee) => employee.id !== id);
    setEmpArr(newEmployees);
  }

  const handleEdit = (id, name, age) => {
    let tempObj = { id, name, age };
    setEmptoUpdate(tempObj);
    setIsEdit(true);
  };

  const updateEmployees = (data) => {
    setEmpArr(data);
    setIsEdit(false);
  };

  return (
    <Fragment>
      {isEdit && (
        <EditEmployees
          empArr={empArr}
          setEmpArr={updateEmployees}
          // handleUpdate={(data) => {
          //   setEmpArr(data);
          //   setIsEdit(false);
          // }}
          empObj={emptoUpdate}
          setErrors={setErrors}
          error={errors}
        />
      )}
      {!isEdit && (
        <AddEmployees
          empArr={empArr}
          setEmpArr={setEmpArr}
          setErrors={setErrors}
          error={errors}
        />
      )}
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
          {empArr && empArr.length > 0
            ? empArr.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.Name}</td>
                    <td>{item.Age}</td>
                    <td>
                      <span
                        className="edit"
                        onClick={() => handleEdit(item.id, item.Name, item.Age)}
                      >
                        Edit
                      </span>{" "}
                      |
                      <span
                        className="delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })
            : "No record Found"}
        </table>
      </div>
    </Fragment>
  );
}

export default DisplayEmployees;
