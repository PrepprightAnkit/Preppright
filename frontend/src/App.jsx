import LoginPage from "./components/LoginPage"
import RegistrationForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { PhoneNumberProvider } from "./contexts/PhoneNumberContext"
import Login from "./components/Login";
function App() {


  return (
    <><PhoneNumberProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Login />} />
            <Route path="reg" element={<RegistrationForm />} />
            <Route path="home" element={<Home />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </PhoneNumberProvider>

    </>
  )
}

export default App
