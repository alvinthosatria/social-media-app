import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { makeRequest } from "../../axios";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const Register = () => {

  const [profile, setProfile] = useState(null);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  })

  const [err, setErr] = useState(null)

  const upload = async (file) => {
    console.log("this is the file: " + file)
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      return res.data;

    } catch(err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  //make registration request.
  //don't forget to put the async await functions since it is an API request
  const handleClick = async (e) => {
    e.preventDefault()

    try {
      let profileUrl;
      profileUrl = profile && await upload(profile);
      console.log(profileUrl);
      await axios.post("http://localhost:8800/api/auth/register", {...inputs, profilePic: profileUrl});

      setProfile(null);
      alert("You have registered an account!");

    } catch(err) {
      setErr(err.response.data)
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social app.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form>

            <div className="file">
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img src={profile ? URL.createObjectURL(profile) : "/upload/" + profile} alt="" />
                  <InsertPhotoOutlinedIcon className="icon" />
                </div>
              </label>
              <input type="file" id="profile" onChange={(e) => setProfile(e.target.files[0])} />
            </div>


            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <input type="text" placeholder="Name" name="name" onChange={handleChange} />
            {err && err}
            <button onClick={handleClick}>Register</button>

            <div className="mobile-login">
              <p>Have an account?</p>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
