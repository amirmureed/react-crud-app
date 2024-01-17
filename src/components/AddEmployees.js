import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddEmployees(props) {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !age) {
      props.setErrors("You shouldn't leave age or name empty.");
    } else {
      props.setEmpArr([
        ...props.empArr,
        { id: uuidv4(), Name: userName, Age: age },
      ]);
      setAge("");
      setUserName("");
      props.setErrors("");
    }
  };

  return (
    <>
    <p className="contact-info"> Hello Usman, Whatsapp me at +923039715758 , Please Don't Ask Contact details on Fiverr. Fiverr can block our accounts. </p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Your Age"
          />
          <button className="btn submit-btn">Add</button>
        </form>
        {props.error && <p className="error"> {props.error} </p>}
      </div>
    </>
  );
}

export default AddEmployees;
