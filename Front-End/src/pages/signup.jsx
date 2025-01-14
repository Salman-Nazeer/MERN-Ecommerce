import React, { useState } from "react";
import PicIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ImageToBase64 from "../helpers/imageToBase64";
import SummaryAPI from "../common/index";
import { toast } from "react-toastify";

const signup = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilepic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const profileImg = await ImageToBase64(file);
    setdata((preve) => {
      return {
        ...preve,
        profilepic: profileImg,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmpassword) {
      const dataResponse = await fetch(SummaryAPI.signUp.url, {
        method: SummaryAPI.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data), // This refers to your user input data
      });

      if (!dataResponse.ok) {
        throw new Error(`Request failed with status ${dataResponse.status}`);
      }

      const userData = await dataResponse.json(); // Renamed to avoid conflict

      if (userData.success) {
        toast.success(userData.message);
        navigate("/login");
      }
      if (userData.error) {
        toast.error(userData.message);
      }
    } else {
      toast.error("Password did not match");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilepic || PicIcon} alt="login icone" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-50 bg-slate-200 pb-4  cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadPic}
                  />
                </div>
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-200 p-2 rounded-lg">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-200 p-2 rounded-lg">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password :</label>
              <div className="bg-slate-200 p-2 flex items-center rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setshowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password :</label>
              <div className="bg-slate-200 p-2 flex items-center rounded-lg">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  name="confirmpassword"
                  value={data.confirmpassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setshowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              SignUp
            </button>
          </form>

          <p className="text-sm block w-fill m-3">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 hover:text-blue-700 hover:underline text-md"
            >
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default signup;
