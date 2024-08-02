import React, { useState, useEffect } from 'react';

function FormComponent() {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null); // State to store and display localStorage data

  // Validation function
  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    if (!name.trim()) {
      validationErrors.name = "Name is required";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      validationErrors.email = "Valid email is required";
      isValid = false;
    }

    if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const userData = { name, email, password };
      
      // Save data to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Update the displayed data
      setUserData(userData);

      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');

      // Optionally, provide feedback to the user
      alert('Form submitted successfully!');
    }
  };

  // Retrieve data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Display stored data */}
      {userData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Stored User Data:</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Password:</strong> {userData.password}</p>
        </div>
      )}
    </div>
  );
}

export default FormComponent;
