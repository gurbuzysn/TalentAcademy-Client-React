import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import StudentList from './pages/Student/StudentList';
import TrainerHome from './pages/Dashboard/TrainerHome';
import CourseCreate from './pages/Course/CourseCreate';
import CourseList from './pages/Course/CourseList';
import CourseAddTopic from './pages/Course/CourseAddTopic';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/AdminHome"
          element={
            <>
              <PageTitle title="Talent Academy - Online Eğitim Platformu" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/CourseList"
          element={
            <>
              <PageTitle title="Kurs Listesi" />
              <CourseList />
            </>
          }
        />

        <Route
          path="/CourseAddTopic/:id?"
          Component={CourseAddTopic}
          element={
            <>
              <PageTitle title="Bölüm Ekleme Sayfası" />
              <CourseAddTopic />
            </>
          }
        />

        <Route
          path="/Student/StudentList"
          element={
            <>
              <PageTitle title="Öğrenci Listesi" />
              <StudentList />
            </>
          }
        />

        {/* <Route
          path="/CourseHome"
          element={
            <>
              <PageTitle title="Kursa Ekleme Sayfası" />
              <CourseHome />
            </>
          }
        /> */}

        <Route
          path="/CourseCreate"
          element={
            <>
              <PageTitle title="Kurs Ekleme Sayfası" />
              <CourseCreate />
            </>
          }
        />

        <Route
          path="/TrainerHome"
          element={
            <>
              <PageTitle title="Trainer Ana Sayfası" />
              <TrainerHome />
            </>
          }
        />

        {/* ---------------------------------------------------------------- */}

        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          index
          // path="/auth/signin"
          element={
            <>
              <PageTitle title="Talent Academy Giriş Sayfası" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
