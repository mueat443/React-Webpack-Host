import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ConnectSocketPage from "./page/ConnectSocketPage";
import "./index.scss";
import FlutterWithReactPage from "./page/LanguagePage";
import { BrowserRouter as Router, Routes, Route,useNavigate  } from "react-router-dom";
import { LanguageStateProvider } from "./context/LanguageStateContext";
import { LoginStateProvider } from "./context/LoginStateContext";
import LogInPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import ProductPage from "./page/ProductPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProductStateProvider } from "./context/ProductStateContext";
import SynconyzePage from "./page/SynconyzePage"; // นำเข้าหน้า Synconyze ที่เราจะสร้าง
import ProfileWithRedirect from "./page/SynconyzePage"; // นำเข้าหน้า Synconyze ที่เราจะสร้าง
import { FlutterProvider } from './context/FlutterInitializer'
// import AdjustFlutterContainer from "./page/ProviderPage"; // นำเข้าหน้า Synconyze ที่เราจะสร้าง
import {FlutterStylesProvider} from './context/FlutterStyleContext'
const theme = createTheme({
  palette: {
    primary: {
      main: "#b8f416", // สีหลัก (Primary Color)
    },
  },
});

const App = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <FlutterStylesProvider>
      {/* <FlutterProvider src="http://localhost:8089/flutter.js"> */}
      <FlutterProvider>
        <LoginStateProvider>
          <LanguageStateProvider>
            <ProductStateProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<LogInPage />} />
                  <Route path="/language" element={<FlutterWithReactPage />} />
                  <Route path="/coreLan" element={<ConnectSocketPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/synconyze" element={<SynconyzePage />} />
                  {/* <Route path="/provider" element={<AdjustFlutterContainer />} /> */}
                </Routes>
              </Router>
            </ProductStateProvider>
          </LanguageStateProvider>
        </LoginStateProvider>
        </FlutterProvider>
        </FlutterStylesProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
