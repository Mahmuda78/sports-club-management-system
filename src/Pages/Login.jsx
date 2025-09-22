import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";
import signInLottie from '../assets/lottie/Sign up.json'
import Lottie from 'lottie-react';

import { provider } from "../Provider/AuthProvider";
import { AuthContext } from "../Provider/AuthContext/AuthContext";



const Login = () => {
    const [error, setError] = useState("");
    const { signIn, googleSignIn } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                // console.log(user);

                toast("You are successfully Login")
                setTimeout(() => {
                    navigate(location.state ? location.state : "/");
                }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;

                setError(errorCode);
                toast.error("Somthing Wrong!")
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn(provider)
            .then(result => {
                const user = result.user;
                // console.log(" Logged in:", user);
                
                toast(`Welcome ${user.displayName}`);
                setTimeout(()=>{navigate(`${location.state ? location.state : "/"}`);},4000);
            })
            .catch(error => {
                console.error(" Error during sign-in:", error);
            });
    };
    return (
          <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '200px' }} animationData={signInLottie} loop={true} ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
                <h2 className="font-semibold text-2xl text-center">
                    Login your account
                </h2>
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="fieldset">
                        {/* email  */}
                        <label className="label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input"
                            placeholder="Email"
                            required
                        />
                        {/* passowrd  */}
                        <label className="label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="input"
                            placeholder="Password"
                            required
                        />
                        <div>
                            <Link to="/forgotPw"> <p className="link link-hover">Forgot password?</p></Link>
                        </div>

                        {error && <p className="text-red-400 text-xs">{error}</p>}

                        <button type="submit" className="btn btn-neutral mt-4">
                            Login
                        </button>
                        <p className="text-2xl font-bold text-center">or</p>
                        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                        <p className="font-semibold text-center pt-5">
                            Dont’t Have An Account ?{" "}
                            <Link className="text-secondary" to="/register">
                                Register
                            </Link>
                        </p>
                    </fieldset>
                </form>
                <ToastContainer />
            </div>
        </div>
        </div>
        </div>
    );
};

export default Login;