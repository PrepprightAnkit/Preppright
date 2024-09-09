
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
import ProfilePage from "./components/ProfilePage";
import Quiz from "./components/Quiz";
import TakeQuiz from "./components/TakeQuiz";
import AllQuiz from "./components/AllQuiz";
import CourseApprovalPage from "./components/CourseApprovalPage";
import AllCat from "./components/AllCat";
import AllCourses from "./components/AllCourses";
import ApproveCourse from "./components/ApproveCourse";
import UploadCourseApproval from "./components/UploadCourseApproval";


import { AuthProvider } from "./contexts/AuthContext";
import { Provider } from 'react-redux';
import store from './store';
function App() {



  return (
    <Provider store={store}>

    <><AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="reg" element={<Register />} />
            <Route path="loginOtp" element={<LoginPage />} />
            <Route path="uploadCat" element={<UploadCat />} />
            <Route path="uploadCourse" element={<UploadCourse />} />
            <Route path="allCourse" element={<AllCourses />} />
            <Route path="allCat" element={<AllCat />} />


            <Route path="courses/:id" element={<CourseDetails />} />
            <Route path="login" element={<LoginPageProp />} />
            <Route path="userProfile" element={<ProfilePage />} />
            <Route path="reg" element={<Register />} />
            <Route path="quiz" element={<Quiz/>}/>
            <Route path="company-register" element={<RegisterCompany />} />
            <Route path="uploadContent" element={<UploadContent />} />
            <Route path="takeQuiz" element={<TakeQuiz />} />
            <Route path="allQuiz" element={<AllQuiz />} />
            <Route path="allCat" element={<AllCat />} />
            <Route path="allCourses" element={<AllCourses />} />


            <Route path="approveCourse" element={<ApproveCourse />} />
            <Route path="uploadCourseApproval" element={<UploadCourseApproval />} />






          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    </>
    </Provider>

  )
}

export default App
