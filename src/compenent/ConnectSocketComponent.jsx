import React, { useContext, useEffect, useState } from "react";
import { LanguageStateContext } from "../context/LanguageStateContext";
import Navbar from "./Navbar";
import reactIcon from "../assets/react.svg";
import { useSocketContext } from "../context/SocketContext";

const ConnectSocketComponent = () => {
  const { languageState, setLanguageState } = useContext(LanguageStateContext);
  const { protocolVersion, flutterState } = useSocketContext(); 
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 font-kanit">
      <div className="flex justify-center items-center w-full h-full px-4">
        <div className="flex flex-col items-center w-5/12">
          <p className="text-center text-4xl mt-11">
            Connect Socket in Flutter
            <span className="inline-flex items-center cursor-pointer">
              <img
                src={reactIcon}
                alt="React Icon"
                className="ml-2 h-10 w-10"
              />
            </span>
          </p>
          <input
            className="text-center w-full h-10 mt-5 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 transition-all"
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder={inputText(languageState)}
          />

          <div className="flex flex-row justify-center items-center mt-5 w-full space-x-5">
            <button
              onClick={async () => {
                flutterState.sendMessage(text);
              }}
              className="bg-green text-white h-10 w-1/4 rounded-lg hover:bg-green-600 transition-colors"
            >
              {sendCommandButton(languageState)}
            </button>
            <button
              onClick={async () => {
                flutterState.sendMessageInterval(text);
              }}
              className="bg-green text-white h-10 w-1/4 rounded-lg hover:bg-green-600 transition-colors"
            >
              {sendIntervalCommandButton(languageState)}
            </button>
            <button
              onClick={async () => {
                flutterState.stopInterval();
              }}
              className="bg-green text-white h-10 w-1/4 rounded-lg hover:bg-green-600 transition-colors"
            >
              {stopIntervalCommandButton(languageState)}
            </button>
          </div>

          <div className="flex flex-col justify-start items-start mt-8 w-full">
            <div className="flex flex-row justify-start w-full">
              <p className="font-semibold">{responeText(languageState)}:</p>
            </div>
            <pre className="text-xs mt-5 border w-full h-80 overflow-auto rounded-lg p-2">
              {protocolVersion
                ? JSON.stringify(protocolVersion, null, 2)
                : "No data received"}{" "}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectSocketComponent;

function sendCommandButton(languageKey) {
  if (languageKey === "th") {
    return "ส่ง Command";
  } else if (languageKey === "en") {
    return "Send Command";
  } else if (languageKey === "my") {
    return "အမိန့်ပေးပို့ပါ။";
  } else if (languageKey === "km") {
    return "ផ្ញើពាក្យបញ្ជា";
  } else {
    return "Unknown Language";
  }
}
function sendIntervalCommandButton(languageKey) {
  if (languageKey === "th") {
    return "ส่ง Interval";
  } else if (languageKey === "en") {
    return "Send Interval";
  } else if (languageKey === "my") {
    return "ကြားကာလ ပေးပို့ပါ။";
  } else if (languageKey === "km") {
    return "ផ្ញើចន្លោះពេល";
  } else {
    return "Unknown Language";
  }
}
function stopIntervalCommandButton(languageKey) {
  if (languageKey === "th") {
    return "หยุด Interval";
  } else if (languageKey === "en") {
    return "Stop Interval";
  } else if (languageKey === "my") {
    return "ကြားကာလကို ရပ်တန့်ပါ။";
  } else if (languageKey === "km") {
    return "បញ្ឈប់ចន្លោះពេល";
  } else {
    return "Unknown Language";
  }
}
function connectSocketButton(languageKey) {
  if (languageKey === "th") {
    return "เชื่อมต่อ Socket";
  } else if (languageKey === "en") {
    return "Connect Socket";
  } else if (languageKey === "my") {
    return "Socket ချိတ်ဆက်ပါ။";
  } else if (languageKey === "km") {
    return "ភ្ជាប់រន្ធ";
  } else {
    return "Unknown Language";
  }
}
function inputText(languageKey) {
  if (languageKey === "th") {
    return "ข้อความ";
  } else if (languageKey === "en") {
    return "Message";
  } else if (languageKey === "my") {
    return "သတင်းစကား";
  } else if (languageKey === "km") {
    return "សារ";
  } else {
    return "Unknown Language";
  }
}

function responeText(languageKey) {
  if (languageKey === "th") {
    return "Response";
  } else if (languageKey === "en") {
    return "Response";
  } else if (languageKey === "my") {
    return "တုံ့ပြန်မှု";
  } else if (languageKey === "km") {
    return "ការឆ្លើយតប";
  } else {
    return "Unknown Language";
  }
}
// return (
//   <div className="flex flex-col  w-full h-screen">
//     <Navbar />
//     <div className="flex flex- justify-center font-kanit w-full h-full">
//       <div className="flex flex-col items-center w-full justify-center">
//       <button
//             className=" bg-green h-10 w-2/4 rounded-lg mt-5"
//             onClick={() => {
//               window.conectSocket();
//             }}
//           >
//             {connectSocketButton(languageState)}
//           </button>
//       <input
//             className="items-center text-center w-3/4 h-10 mt-5 rounded-lg border-2"
//             type="text"
//             value={text}
//             onChange={handleInputChange}
//             placeholder={inputText(languageState)}
//           />
//         <div className="flex flex-row justify-center items-center mt-1 w-full">

//           <button
//             onClick={() => {
//               window.sendMessage("Send Message to Socket");
//             }}
//             className=" bg-green h-10 w-1/4 rounded-lg m-5"
//           >
//             {sendCommandButton(languageState)}
//           </button>
//           <button
//             onClick={() => {
//               window.sendMessageInterval("Send Message to Socket");
//             }}
//             className=" bg-green h-10 w-1/4 rounded-lg m-5 "
//           >
//             {sendIntervalCommandButton(languageState)}
//           </button>
//           <button
//             onClick={() => {
//               window.stopInterval();
//             }}
//             className=" bg-green h-10 w-1/4 rounded-lg m-5"
//           >
//             {stopIntervalCommandButton(languageState)}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col justify-start items-start mt-8 w-full ">
//         <div className="flex flex-row justify-start w-full">
//         <p>{responeText(languageState)} : </p>
//         </div>
//         <pre className="text-xs mt-5 bg-gray-light w-10/12 h-full" style={{ fontSize: "8px" }}>
//           {protocolVersion
//             ? JSON.stringify(protocolVersion, null, 2)
//             : "No data received"}{" "}
//         </pre>
//       </div>
//     </div>
//   </div>
// );



