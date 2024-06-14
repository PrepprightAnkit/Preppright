import LoginPage from "./components/LoginPage"
import RegistrationForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route index element={<LoginPage />} />
          <Route path="reg" element={<RegistrationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
