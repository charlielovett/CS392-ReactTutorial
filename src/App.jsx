import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import CourseForm from "./components/CourseForm";
import Navigation from "./components/Navigation";
import { useDbData } from "./utilities/firebase";

const queryClient = new QueryClient();

const App = () => {
  const [data, error] = useDbData('/');

  if (error) return <h1>Error loading class data: {`${error.message}`}</h1>;
  if (!data) return <h1>Loading class data...</h1>;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={
            <div className="container my-5">
              <Banner title={data.title}></Banner>
              <TermPage courses={data.courses}></TermPage>
            </div>
          } />
          <Route path="/form/:courseId" element={<CourseFormWrapper courses={data.courses} />} />
        </Routes>
      </BrowserRouter>

    </QueryClientProvider>
  );
};

const CourseFormWrapper = ({ courses }) => {
  const { courseId } = useParams();
  const course = courses[courseId];
  if (!course) {
    return <h1>Course not found</h1>;
  }

  return (
    <div className="container my-5">
      <CourseForm course={course} />
    </div>
  );
};

export default App;
