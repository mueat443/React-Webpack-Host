import React, { useContext } from "react";
import { LoginStateContext } from "../context/LoginStateContext";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const { userName, setUserName, password, setPassword } =
    useContext(LoginStateContext);
    const navigate = useNavigate(); // ใช้สำหรับทำ routing

  const listUser = [
    {
      username: "user1",
      password: "1234",
    },
    {
      username: "user2",
      password: "1234",
    },
  ];
  const handleLogin = () => {
    const foundUser = listUser.find(
      (user) => user.username === userName && user.password === password
    );
    if (foundUser) {
      navigate("/language");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center text-center w-full m-10">
      <input
      className="w-5/12 text-center h-10 rounded-lg border"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
      className="w-5/12 text-center h-10 rounded-lg border mt-5"
      type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>

      <button 
      className="w-5/12 text-center h-10 rounded-lg bg-green"
      onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
