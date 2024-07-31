
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { PhoneNumberProvider } from "./contexts/PhoneNumberContext"
import UploadCat from "./components/UploadCat";
import LoginPageProp from "./components/LoginPageProp";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import UploadCourse from "./components/UploadCourse";
import CourseDetails from "./components/CourseDetails";
import UploadContent from "./components/UploadContent";
import RegisterCompany from "./components/RegisterCompany";
import { AuthProvider } from "./contexts/AuthContext";
function App() {



  return (
    <><AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="reg" element={<Register />} />
            <Route path="loginOtp" element={<LoginPage />} />
            <Route path="uploadCat" element={<UploadCat />} />
            <Route path="uploadCourse" element={<UploadCourse />} />
            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path="login" element={<LoginPageProp />} />
            <Route path="reg" element={<Register />} />
            <Route path="company-register" element={<RegisterCompany />} />
            <Route path="uploadContent" element={<UploadContent />} />



          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App
