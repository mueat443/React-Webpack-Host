import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ConnectSocketPage from "./page/ConnectSocketPage";
import "./index.scss";
import FlutterWithReactPage from "./page/LanguagePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { LanguageStateProvider } from "./context/LanguageStateContext";
import { LoginStateProvider } from "./context/LoginStateContext";
import LogInPage from "./page/LoginPage";
import ProfilePage from "./page/ProfilePage";
import ProductPage from "./page/ProductPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProductStateProvider } from "./context/ProductStateContext";
import { FlutterProvider } from "./context/FlutterProvider";
import { SocketProvider } from "./context/SocketContext";
import { Provider, KeepAlive } from "react-keep-alive";
import BlocMultiPage from "./page/BlocMultiPage";
import BlocMultiPage2 from "./page/BlocMultiPage2";
import BlocMultiPage3 from "./page/BlocMultiPage3";
import { NavigationProvider } from "./context/NavigationProvider ";


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
        <FlutterProvider>
          <SocketProvider>
            <LoginStateProvider>
              <LanguageStateProvider>
                <ProductStateProvider>
                  <Provider>
                  <NavigationProvider>

                    <Router>
                      <Routes>
                        <Route path="/" element={<LogInPage />} />
                        <Route
                          path="/language"
                          element={<FlutterWithReactPage />}
                        />
                        <Route
                          path="/coreLan"
                          element={<ConnectSocketPage />}
                        />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/product" element={<ProductPage />} />
                        <Route path="/bloc-multi" element={<BlocMultiPage />} />
                        <Route path="/bloc-multi2" element={<BlocMultiPage2 />} />
                        <Route path="/bloc-multi3" element={<BlocMultiPage3 />} />
                      </Routes>
                    </Router>
                    </NavigationProvider>

                  </Provider>
                </ProductStateProvider>
              </LanguageStateProvider>
            </LoginStateProvider>
          </SocketProvider>
        </FlutterProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
