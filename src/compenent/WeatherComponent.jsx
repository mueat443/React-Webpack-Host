import React, { useContext, useEffect, useState } from "react";
import { LanguageStateContext } from "../context/LanguageStateContext";
import { ProductStateContext } from "../context/ProductStateContext"; // นำเข้า LoginStateContext
import { LoginStateContext } from "../context/LoginStateContext"; // นำเข้า LoginStateContext
import ProductComponent from "./ProductComponent";
import { Link } from "react-router-dom";

const WeatherState = () => {
  const [flutterState, setFlutterState] = useState(null);
  const [country, setCountry] = useState(() => {
    // เช็คว่าใน Local Storage มีค่าของ country อยู่ไหม
    const savedCountry = localStorage.getItem("selectedCountry");
    return savedCountry ? savedCountry : "--Please choose an option--"; // ถ้ามีใช้ค่าใน Local Storage
  });
  const { languageState } = useContext(LanguageStateContext);
  const { userName } = useContext(LoginStateContext);
  const { cart } = useContext(ProductStateContext);

  const countryOptions = ["Tokyo", "Bangkok", "London", "NewYork", "Seoul"];

  useEffect(() => {
    const onFlutterReady = (event) => {
      const exportedState = event.detail;
      setFlutterState(exportedState);
    };
    window.addEventListener("flutter-weather", onFlutterReady);

    return () => {
      window.removeEventListener("flutter-weather", onFlutterReady);
    };
  }, []);

  const handleChange = (e) => {
    const selectedCountry = e.target.value;
    if (flutterState && flutterState.fetchWeather) {
      flutterState.fetchWeather(selectedCountry);
      setCountry(selectedCountry);
      localStorage.setItem("selectedCountry", selectedCountry); // บันทึกค่า country ลงใน Local Storage
    }
  };

  return (
    <div className="m-10 font-kanit text-3xl w-full pl-52">
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
      <p>cart: {cart.length}</p>
      {/* <ProductComponent /> */}
    </div>
  );
};

export default WeatherState;

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
