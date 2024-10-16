import React from "react";
import LoginComponent from "../compenent/LoginComponent";
import aisIcon from "../assets/ais.png";

const LogInPage = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center font-kanit">
      <p className="text-center">
        Login Page{" "}
        <span className="inline-flex items-center">
          <img src={aisIcon} alt="React Icon" className="ml-2 h-7 w-10 mt-5" />
        </span>
      </p>
      <LoginComponent />
    </div>
  );
};

export default LogInPage;
