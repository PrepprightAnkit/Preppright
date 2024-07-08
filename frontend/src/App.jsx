import LoginPage from "./components/LoginPage"
import RegistrationForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { PhoneNumberProvider } from "./contexts/PhoneNumberContext"
import Login from "./components/Login";
import LoginPageProp from "./components/LoginPageProp";
import Register from "./components/Register";
function App() {



  return (
    <><PhoneNumberProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Login />} />
            <Route path="reg" element={<Register />} />
            <Route path="home" element={<Home />} />
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
