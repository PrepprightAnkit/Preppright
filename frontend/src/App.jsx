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
import Techlab from "./components/Techlab";
import Test from "./components/Test";
import UploadCat from "./components/UploadCat";
import UploadContent from "./components/UploadContent";
import UploadCourse from "./components/UploadCourse";
import UploadCourseApproval from "./components/UploadCourseApproval";
import { AuthProvider } from "./contexts/AuthContext";
import PrivacyPolicy from "./components/Policy";
import ChatBot from "./components/chatbot";
import CreateQuiz from "./components/CreateQuiz";
import AboutSection from "./components/About";
import RefundPolicy from "./components/Refund";
import Terms from "./components/terms";
import OasisQuiz from "./components/AllQuiz";

function App() {
  return (
    <>
    <ChatBot/>
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
              <Route path="createQuiz" element={<CreateQuiz />} />
              <Route path="allQuiz" element={<OasisQuiz />} />
              <Route path="allCat" element={<AllCat />} />
              <Route path="allCourses" element={<AllCourses />} />
              <Route path="approveCourse" element={<CourseApprovalPage />} />
              <Route path="uploadCourseApproval" element={<UploadCourseApproval />} />
              <Route path="test" element={<Test />} />
              <Route path="placements" element={<PlacementPage />} />
              <Route path="techlab" element={<Techlab />} />
              <Route path="privacypolicy" element={<PrivacyPolicy />} />
              <Route path="refundpolicy" element={<RefundPolicy/>} />
              <Route path="terms" element={<Terms/>} />
              <Route path="about" element={<AboutSection />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App