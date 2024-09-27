import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeEdit.css';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);

  // Retrieve token from local storage
  const token = localStorage.getItem('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('No token found, please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', course);
    if (image) formData.append('image', image);

    try {
      // Removed the assignment to 'response' since it's not used
      await axios.post('http://localhost:5000/api/employees', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Employee created successfully');
    } catch (error) {
      console.error('Error creating employee:', error.response);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized access: Invalid or expired token.');
      } else {
        alert('Error creating employee. Please check the console for more details.');
      }
    }
  };

  return (
    <div className='container-eEdit'>

      <div className='screen-eEdit'>
        <h2>Create Employee</h2>
        <form className='form-edit' onSubmit={handleSubmit}>

          {/* -------------------------------------------------- */}
          <div className='label-group'>
            <div className="form-group">
              <label htmlFor='name'>
                Name:
                <input className='input-edit'
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

            </div>
            <div className="form-group">
              <label htmlFor='email'>
                Email:
                <input className='input-edit'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

            </div>
          </div>

          <div className='label-group'>
            <div className="form-group">
              <label htmlFor='contactNo'>
                Mobile No:
                <input className='input-edit'
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Image Upload:
                <input className='input-edit'
                  type="file"
                  accept=".jpg,.png"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className='label-group'>
            <div className="form-group">
              <label>
                Gender:
                <input className='m1'
                  type="radio"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={() => setGender('Male')}
                /> Male
                <input className='m1'
                  type="radio"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={() => setGender('Female')}
                /> Female
              </label>
             
            </div>
            <div className="form-group">
              <label>
                Course:
                <input className='m1'
                  type="checkbox"
                  value="MCA"
                  checked={course.includes('MCA')}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setCourse((prev) =>
                      checked ? [...prev, value] : prev.filter((c) => c !== value)
                    );
                  }}
                /> MCA
                <input className='m1'
                  type="checkbox"
                  value="BCA"
                  checked={course.includes('BCA')}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setCourse((prev) =>
                      checked ? [...prev, value] : prev.filter((c) => c !== value)
                    );
                  }}
                /> BCA
                <input className='m1'
                  type="checkbox"
                  value="BSC"
                  checked={course.includes('BSC')}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setCourse((prev) =>
                      checked ? [...prev, value] : prev.filter((c) => c !== value)
                    );
                  }}
                /> BSC
              </label>
            </div>
          </div>
          <label>
            Designation:
            <select className=' Designation'
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </label>
          
          
          <br />

          <br />
          <button className='update-btn' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
