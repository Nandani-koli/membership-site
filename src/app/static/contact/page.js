'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Contact = () => {

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [msg, setMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [CheckboxOptions, setCheckboxOptions] = useState([]);
  const [Radio, setRadio] = useState('');
  const [dropdown, setdropdown] = useState();
  const [responseMsg, setresponseMsg] = useState('');

  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErr = {};

    if (!name) {
      validateErr.name = 'Name is required';
    } else if (!isValidName(name)) {
      validateErr.name = 'Name should only contain letters';
      console.log(name);
    }

    if (!email) {
      validateErr.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      validateErr.email = 'Invalid email format';
    }
    if (!msg) {
      validateErr.message = 'Message is required';
    } else if (msg.length > 200) {
      validateErr.message = 'Message should not exceed 200 characters';
    }
    if (!phone) {
      validateErr.phone = 'Phone number is required';
    } else if (!isValidNumber(phone)) {
      validateErr.phone = 'Phone number should contain 10 digit number';
    }

    if (!CheckboxOptions.length) {
      validateErr.CheckboxOptions = 'Please select an option';
    }
    if (!dropdown) {
      validateErr.dropdown = 'Please select an option';
    }
    if (Radio == '') {
      validateErr.Radio = 'Please select an option';
    }

    if (Object.keys(validateErr).length > 0) {
      setErrors(validateErr);
    } else {
      setErrors({});

      const data = {
        name: name,
        email: email,
        message: msg,
        phone: phone,
        radio: Radio,
        dropdown: dropdown,
        CheckboxOptions: CheckboxOptions
      }

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        let result = await res.json();

        if (res.ok) {
          setresponseMsg(result.message);
          setTimeout(() => {
            setName(''), setMail(''), setMsg(''), setPhone(''), setRadio(''), setdropdown(''), setCheckboxOptions([]),setresponseMsg('');
          }, 2000)
          router.refresh();
        }

      } catch (error) {
        throw new Error(err);
      }
    }

  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidNumber = (phone) => {
    const phonereg = /^[0-9]{10}$/;
    return phonereg.test(phone);
  }

  const isValidName = (name) => {
    const namereg = /^[A-Za-z\s]+$/;
    return namereg.test(name);
  }

  const handleOptionChange = (option) => {
    const updatedOptions = CheckboxOptions.includes(option) ? CheckboxOptions.filter((item) => item !== option) : [...CheckboxOptions, option];
    setCheckboxOptions(updatedOptions);
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="m-5 text-center">Contact Us</h1>
            {responseMsg && <h4 className="text-success">{responseMsg}</h4>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="your-name"
                    name="your-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <span className="text-danger">{errors.name}</span>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="your-email"
                    name="your-email"
                    value={email}
                    onChange={(e) => setMail(e.target.value)}
                  />
                  {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">I&apos;m Looking For:</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="softwaredeveloper"
                      name="software-developer"
                      onChange={() => handleOptionChange('Software Developer')}
                    />
                    <label className="form-check-label" >
                      Software Developer
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="softwaredeveloper"
                      name="backend-developer"
                      onChange={() => handleOptionChange('Backend Developer')}
                    />
                    <label className="form-check-label" >
                      Backend Developer
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="softwaredeveloper"
                      name="frontend-developer"
                      onChange={() => handleOptionChange('Frontend Developer')}
                    />
                    <label className="form-check-label" >
                      Frontend Developer
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="softwaredeveloper"
                      name="other"
                      onChange={() => handleOptionChange('other')}
                    />
                    <label className="form-check-label">
                      other
                    </label>
                  </div>

                  {errors.CheckboxOptions && <span className="text-danger">{errors.CheckboxOptions}</span>}
                </div>


                <div className="col-md-6">
                  <label className="form-label">Hire For : </label>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="hirefor" value="remote" checked={Radio === 'remote'} onChange={() => setRadio('remote')} />
                    <label className="form-check-label">
                      Remote
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="hirefor" value="onsite" checked={Radio === 'onsite'} onChange={() => setRadio('onsite')} />
                    <label className="form-check-label" >
                      On-Site
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="hirefor" value="other" checked={Radio === 'other'} onChange={() => setRadio('other')} />
                    <label className="form-check-label" >
                      Other
                    </label>
                  </div>
                  {errors.Radio && <span className="text-danger">{errors.Radio}</span>}
                </div>


                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <span className="text-danger">{errors.phone}</span>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">We are:</label>
                  <select className="form-control" value={dropdown} onChange={(e) => setdropdown(e.target.value)}>
                    <option disabled>Select an option</option>
                    <option>MNC</option>
                    <option>Startup</option>
                    <option>NGO</option>
                    <option>Unicorn</option>
                    <option>Other</option>
                  </select>
                  {errors.dropdown && <span className="text-danger">{errors.dropdown}</span>}
                </div>

                <div className="col-12">
                  <label className="form-label">Your Message</label>
                  <textarea
                    className="form-control"
                    id="your-message"
                    name="your-message"
                    rows="5"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  ></textarea>
                  {errors.message && <span className="text-danger">{errors.message}</span>}
                </div>

                <div className="col-12">
                  <div className="row">
                    <div className="col-md-6">
                      <button type="submit" className="btn btn-success w-100 fw-bold">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default Contact;

