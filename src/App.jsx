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
                </Routes>
              </Router>
            </ProductStateProvider>
          </LanguageStateProvider>
        </LoginStateProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
