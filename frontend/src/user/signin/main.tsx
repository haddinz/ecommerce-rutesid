import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/custom/button";
import { useSigninMutation } from "../../../components/hook/userHooks";
import { ApiError } from "../../../types/ApiError";
import { getError } from "../../../utils/getError";
import { Store } from "../../../utils/store";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../../components/layout";

function Signin() {
  const { search } = useLocation();
  const params = new URLSearchParams(search).get("redirect");
  const redirect = params ? params : "/";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync } = useSigninMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ email, password });
      dispatch({ type: "AUTH", payload: data });
      toast.success("Login Success", { autoClose: 1000 });
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error as ApiError), { autoClose: 1000 });
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  return (
    <Layout title="Signin" description="Signin Page">
      <div className="container">
        <div className="flex justify-center items-center flex-col mb-14 ">
          <h3 className="text-2xl md:text-4xl font-bold text-cyan-700 mb-5">
            Welcome To Signin Pages
          </h3>
          <p className="text-sm md:text-base w-full md:max-w-sm text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            euismod, lacus ac interdum sagittis{" "}
          </p>
        </div>
        <div className="flex items-center flex-col">
          <form className="w-full md:w-[450px]" onSubmit={submitHandler}>
            <div className="mb-3 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="text-sm md:text-base px-4 py-4 mt-2 focus:outline-none bg-cyan-700 rounded-lg"
                type="email"
                autoFocus
                required
                value={email}
                id="email"
                placeholder="Input Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-7 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="text-sm md:text-base px-4 py-4 mt-2 focus:outline-none bg-cyan-700 rounded-lg"
                type="password"
                required
                value={password}
                id="password"
                placeholder="Input Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <Button text="Sign In" condition="on" />
            </div>
            <div className="mt-5 text-sm md:text-base">
              <span>
                Don't have an account{" "}
                <Link
                  to={`/user/register?redirect=${redirect}`}
                  className="text-yellow-400"
                >
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Signin;
