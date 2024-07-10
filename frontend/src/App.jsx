
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { PhoneNumberProvider } from "./contexts/PhoneNumberContext"
import UploadCat from "./components/UploadCat";
import LoginPageProp from "./components/LoginPageProp";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
function App() {



  return (
    <><PhoneNumberProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="reg" element={<Register />} />
            <Route path="loginOtp" element={<LoginPage />} />
            <Route path="uploadCat" element={<UploadCat />} />

            <Route path="login" element={<LoginPageProp />} />
            <Route path="reg" element={<Register/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </PhoneNumberProvider>

    </>
  )
}

export default App
