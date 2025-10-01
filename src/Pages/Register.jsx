import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthContext/AuthContext";
import Logo from "../Shared/Logo";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../hooks/useAxios";
import { provider } from "../Provider/AuthProvider";
 

const Register = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [previewPic, setPreviewPic] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();

  // Image upload handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    // Live preview
    setPreviewPic(URL.createObjectURL(image));

    if (!import.meta.env.VITE_image_upload_key) {
      toast.error("Image upload key is missing!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.success) {
        setProfilePic(data.data.url);
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image!");
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    const pwUppercase = /[A-Z]/.test(password);
    const pwLowercase = /[a-z]/.test(password);
    const isLong = password.length >= 6;

    if (!pwUppercase || !pwLowercase || !isLong) {
      setPasswordError(
        "Password must have at least 1 uppercase, 1 lowercase, and be at least 6 characters."
      );
      return;
    } else {
      setPasswordError("");
    }

    try {
      // 1️⃣ Create user in Firebase
      const result = await createUser(email, password);

      // 2️⃣ Update user profile in Firebase
      await updateUser({ displayName: name, photoURL: profilePic });

      // 3️⃣ Add user info to your backend
      const userInfo = {
        email,
        name,
        role: "user",
        photoURL: profilePic,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);

      toast.success(`Welcome ${name}`);
      setTimeout(() => navigate(from), 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    }
  };

  // Google Sign-In handler
   const handleGoogleSignIn = async () => {
      try {
        const result = await googleSignIn(provider);
        const user = result.user;
  
        // Prepare user info for backend
        const userInfo = {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL || "",
          role: "user",
          createdAt: new Date().toISOString(),
          isMember: false,
        };
  
        // Add or update user in backend
        await axiosInstance.post("/users", userInfo);
  
        toast.success(`Welcome ${user.displayName}`);
        setTimeout(() => navigate(location.state?.from || "/"), 2000);
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        toast.error("Google login failed");
      }
    };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gradient-to-br from-gray-900 to-gray-600 py-6">
      <Logo />
      <div className="card bg-white w-full max-w-sm shadow-2xl rounded-xl mt-6">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold mb-4">Create Account</h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            {/* Profile Photo */}
            <label className="label">Profile Photo</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input input-bordered w-full"
            />
            {previewPic && (
              <img
                src={previewPic}
                alt="Preview"
                className="w-24 h-24 rounded-full mt-2 mx-auto"
              />
            )}

            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />

            {/* Password */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

            <button className="btn btn-primary w-full mt-2">Register</button>
          </form>

          <div className="text-center text-lg font-semibold my-2">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn border border-gray-300 bg-white text-black flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-900 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
