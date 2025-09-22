import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthContext/AuthContext";
import { provider } from "../Provider/AuthProvider";



const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const form = e.target;
    const name = form.name.value;



    if (name.length < 5) {
      setNameError("Name should be more then 5 character");
      return;
    } else {
      setNameError("");
    }
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const pwUppercase = /[A-Z]/.test(password);
    const pwLowercase = /[a-z]/.test(password);
    const isLong = password.length >= 6;

    if (!pwUppercase || !pwLowercase || !isLong) {
      setPasswordError("Password must have at least 1 uppercase, 1 lowercase, and be at least 6 characters.");
      return;
    } else {
      setPasswordError("");
    }
    // console.log({ name, photo, email, password });
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast(`Welcome ${user.displayName}`);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          })
          .catch((error) => {
            // console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage, errorCode);
        // ..
      });
  };


  const handleGoogleSignIn = () => {
        googleSignIn(provider)
          .then(result => {
            const user = result.user;
            // console.log("Logged in:", user);
            
            toast(`Welcome ${user.displayName}`);
            setTimeout(() => {
              navigate(`${location.state ? location.state : "/"}`);
            }, 4000);
          })
          .catch(error => {
            console.error("Error during sign-in:", error);
          });
      };
  return (
    <div className="flex justify-center min-h-screen items-center">
      
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Register your account
        </h2>

        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name  */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />

            {nameError && <p className="text-xs text-error">{nameError}</p>}

            {/* Photo URl  */}
            <label className="label">Photo URl </label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URl"
              required
            />

            {/* email  */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* password  */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            {passwordError && <p className="text-xs text-error">{passwordError}</p>}
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
            <p className="text-2xl font-bold text-center">or</p>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
<ToastContainer/>

            <p className="font-semibold text-center pt-5">
              Allready Have An Account ?{" "}
              <Link className="text-secondary" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>

    </div>
  );
};

export default Register;
