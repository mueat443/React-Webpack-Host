import React, { useContext, useEffect, useState } from "react";
import { LanguageStateContext } from "../context/LanguageStateContext";
import { LoginStateContext } from "../context/LoginStateContext";
import ProductComponent from "./ProductComponent";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProductStateContext, useProductStateContext } from "../context/ProductStateContext";
import { useWeatherStateContext } from "../context/WeatherStateContext";

const ProfileComponent = () => {
  const { cart } = useProductStateContext(); 
  const { languageState } = useContext(LanguageStateContext);
  const { userName } = useContext(LoginStateContext);
  const { country, setCountry } = useWeatherStateContext();
  const countryOptions = ["Tokyo", "Bangkok", "London", "NewYork", "Seoul"];
  const handleChange = (e) => {
    console.log('handleChange',e);
    const selectedCountry = e.target.value;
    setCountry(selectedCountry); // Trigger fetchWeather  
    };
  return (
    <div className="mt-10 font-kanit text-3xl w-full pl-52">
      <p>
        {usernameConvert(languageState)}: {userName}
      </p>

      <Link to="/language" className="text-blue-500 hover:underline">
        <p>
          {selectLanguageConvert(languageState)}:{" "}
          {languageConvert(languageState)}
        </p>
      </Link>
      <label htmlFor="dropdown">{selectConvert(languageState)}</label>
      <select id="dropdown" value={country} onChange={handleChange}>
        <option value="">-{selectConvert(languageState)}-</option>
        {countryOptions.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <p>Cart: {cart}</p>
    </div>
  );
};

export default ProfileComponent;

function languageConvert(languageKey) {
  if (languageKey === "th") {
    return "Thai";
  } else if (languageKey === "en") {
    return "English";
  } else if (languageKey === "my") {
    return "ဗမာဘာသာစကား";
  } else if (languageKey === "km") {
    return "ភាសាខ្មែរ";
  } else {
    return "Unknown Language";
  }
}

function selectConvert(languageKey) {
  if (languageKey === "th") {
    return "กรุณาเลือกเมือง: ";
  } else if (languageKey === "en") {
    return "Select an option: ";
  } else {
    return "Unknown Language";
  }
}
function usernameConvert(languageKey) {
  if (languageKey === "th") {
    return "ชื่อผู้ใช้";
  } else if (languageKey === "en") {
    return "UserName";
  } else {
    return "Unknown Language";
  }
}
function selectLanguageConvert(languageKey) {
  if (languageKey === "th") {
    return "ภาษา";
  } else if (languageKey === "en") {
    return "Language";
  } else {
    return "Unknown Language";
  }
}
