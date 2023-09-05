import React, { useState, useEffect } from "react";

function EditEmployees(props) {
  const [userName, setUserName] = useState(props.empObj.name);
  const [age, setAge] = useState(props.empObj.age);

  const handleupdate = (e) => {
    e.preventDefault();
    if (!userName || !age) {
      props.setErrors("You shouldn't leave age or name empty.");
    } else {
      var index = props.empArr.findIndex((item) => item.id === props.empObj.id);
      var newEmpArr = props.empArr;
      newEmpArr[index] = {
        id: index + 1,
        Name: userName || props.empObj.name,
        Age: age || props.empObj.age,
      };
      props.setEmpArr(newEmpArr);
      props.setErrors("");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleupdate}>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            value={age}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Your Age"
          />
          <button className="btn submit-btn">Update</button>
        </form>
        {props.error && <p className="error"> {props.error} </p>}
      </div>
    </>
  );
}

export default EditEmployees;
