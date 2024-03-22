import React from 'react'
import { useContext } from 'react'
import myContext from '../Context'
import '../Register/UpdateUser.css' 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UpdateUser = () => {
  const { users, setUsers, userData, setUserData } = useContext(myContext);
  const navigate = useNavigate();

  const currentUserData = userData.find((data) => data.email === users[0].email);

  const [formValues, setFormValues] = useState({
    username: currentUserData?.username || '',
    email: currentUserData?.email || '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case 'username':
        return /^[A-Za-z0-9]{3,16}$/.test(value)
          ? ''
          : 'Username must contain 3-16 characters and should not contain any special characters';
          case 'email':
            return /^\S+@\S+$/.test(value) ? '' : 'Email address should be valid';
      case 'password':
        return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(value)
          ? ''
          : 'Password should be 8-16 characters and contain at least 1 letter, 1 number, and 1 special character';
      case 'confirmPassword':
        return value === formValues.password ? '' : "The given password doesn't match";
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for validation errors before updating
    if (Object.values(errors).some((error) => error !== '')) {
      alert('Please fix the validation errors before updating.');
      return;
    }

    // Update the user in the users array
    const updatedUsers = users.map((user) => {
      if (user.email === currentUserData.email) {
        return {
          ...user,
          username: formValues.username,
          email: formValues.email,
        };
      }
      return user;
    });

    // Update the state with the new users array
    setUsers(updatedUsers);

    // Update the corresponding user data in the userData array
    const updatedUserData = userData.map((data) => {
      if (data.email === currentUserData.email) {
        return {
          ...data,
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
          confirmPassword: formValues.confirmPassword,
        };
      }
      return data;
    });

    // Update the state with the new userData array
    setUserData(updatedUserData);

    alert('Profile has been updated');
    console.log('updated user data', updatedUserData);
    console.log('user', users);
  };
  return (
    <div className='update-user'>
      <h3>User Profile</h3>
      <div className='user-details'>
        <img src='https://static.thenounproject.com/png/3201587-200.png'
        alt='User Avatar'
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
        }}></img>
        <h3>{currentUserData?.username}</h3>
        <p>{currentUserData?.email}</p>  
      </div>
      <div className='user-update'>
        <h3>Update Profile</h3>
        <form className='update-form' onSubmit={handleSubmit}>
          <label>User Name:</label>
          <input
            type='text'
            name='username'
            value={formValues.username}
            onChange={handleChange}
            required
          />
          <p className='error-message'>{errors.username}</p>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formValues.email}
            onChange={handleChange}
            required
          />
          <p className='error-message'>{errors.email}</p>
          <label> New Password:</label>
          <input
            type='password'
            name='password'
            value={formValues.password}
            onChange={handleChange}
            required
          />
          <p className='error-message'>{errors.password}</p>
          <label>Confirm new password:</label>
          <input
            type='password'
            name='confirmPassword'
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />
          <p className='error-message'>{errors.confirmPassword}</p>
          
          <button type='submit'>Update PROFILE</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;