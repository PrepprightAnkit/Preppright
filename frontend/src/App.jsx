import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddLessons from "./components/AddLessons";
import AllCat from "./components/AllCat";
import AllCourses from "./components/AllCourses";
import AllQuiz from "./components/AllQuiz";
import Certificate from "./components/Certificate";
import CourseApprovalPage from "./components/CourseApprovalPage";
import CourseDetails from "./components/CourseDetails";
import Home from './components/Home';
import LoginPage from "./components/LoginPage";
import LoginPageProp from "./components/LoginPageProp";
import PlacementPage from "./components/Placement";
import ProfilePage from "./components/ProfilePage";
import Quiz from "./components/Quiz";
import Register from "./components/Register";
import RegisterCompany from "./components/RegisterCompany";
import TakeQuiz from "./components/TakeQuiz";
import Test from "./components/Test";
import UploadCat from "./components/UploadCat";
import UploadContent from "./components/UploadContent";
import UploadCourse from "./components/UploadCourse";
import UploadCourseApproval from "./components/UploadCourseApproval";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
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
              <Route path="certificate" element={<Certificate />} />
              <Route path="addlesson" element={<AddLessons />} />
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
              <Route path="approveCourse" element={<CourseApprovalPage />} />
              <Route path="uploadCourseApproval" element={<UploadCourseApproval />} />
              <Route path="test" element={<Test />} />
              <Route path="placements" element={<PlacementPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App