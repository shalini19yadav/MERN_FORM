import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const [forms, setForms] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("New York");
  const [dateOfRegister, setDateOfRegister] = useState("");
  const [existingId, setexistingId] = useState(null);

  const fetchForms = async () => {
    const response = await axios.get("http://localhost:5000/forms");
    setForms(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, gender, contact, city, dateOfRegister };
    if (existingId) {
      await axios.put(`http://localhost:5000/forms/${existingId}`, formData);
      setexistingId(null);
    } else {
      await axios.post("http://localhost:5000/forms", formData);
    }
    setName("");
    setEmail("");
    setGender("Male");
    setContact("");
    setCity("New York");
    setDateOfRegister("");
    fetchForms();
  };

  const handleEdit = (form) => {
    setName(form.name);
    setEmail(form.email);
    setGender(form.gender);
    setContact(form.contact);
    setCity(form.city);
    setDateOfRegister(form.dateOfRegister.split("T")[0]);
    setexistingId(form._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/forms/${id}`);
    fetchForms();
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
        <input
          type="date"
          value={dateOfRegister}
          onChange={(e) => setDateOfRegister(e.target.value)}
          required
        />
        <button type="submit">{existingId ? "Update" : "Add"}</button>
      </form>

      <div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">sno</th>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">mobile</th>
      <th scope="col">city</th>
      <th scope="col">gender</th>
      <th scope="col">date</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
   {forms.map((form,index) => (
             <tr key={form._id}>
            <th scope="row">{index+1}</th>
            <td>{form.name}</td> 
            <td>{form.email}</td>
            <td>{form.contact}</td>
            <td>{form.city}</td>
            <td>{form.gender}</td>
            <td>{form.dateOfRegister}</td>
            {/* <td> {new Date(form.dateOfRegister).toLocaleDateString()}{" "}</td> */}
            <td> <button onClick={() => handleEdit(form)}>Edit</button>{" "}</td>
            <td>  <button onClick={() => handleDelete(form._id)}>Delete</button></td>
          </tr>))}
    
  </tbody>
</table>
    </div>
    </div>
  );
};

export default Form;