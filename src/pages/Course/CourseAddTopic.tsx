import axios from 'axios';
import TrainerLayout from '../../layout/TrainerLayout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UploadComponent from '../../components/Upload/UploadComponent';

const CourseAddTopic = () => {
  const CourseName = useSelector((state: any) => state.course.courseName);
  const { id } = useParams();
  const [course, setCourse] = useState<any>({});

  useEffect(() => {
    const fetchCourseDataByName = async () => {
      try {
        const courseData = await axios.get(
          `https://localhost:7043/api/Courses/byname/${CourseName}`,
        );
        setCourse(courseData.data);
      } catch (error) {
      }
    };

    if (CourseName && !id) {
      fetchCourseDataByName();
    }
  }, [CourseName, id]);

  useEffect(() => {
    const fetchCourseDataById = async () => {
      try {
        console.log('id : ', id);
        const courseData = await axios.get(
          `https://localhost:7043/api/Courses/byid/${id}`,
        );
        setCourse(courseData.data);
      } catch (error) {
        console.log('Id den çekerken Hataya Düştü');
      }
    };

    if (id) {
      fetchCourseDataById();
    }
  }, [id]);
  return (
    <TrainerLayout>
      <div className="flex justify-center items-center">
        <div className="bg-custom-f9f7f7 w-8/12 rounded-3xl shadow-black">
          {course.imageUri && (
            <div className="flex justify-center ">
              <img
                className="rounded-lg w-2/3 max-h-100"
                src={course.imageUri}
                alt=""
              />
            </div>
          )}
          {course.name && (
            <div className="text-center m-5">
              <div className="font-bold text-3xl mb-2">{course.name}</div>
            </div>
          )}
          {course.description && (
            <div className="text-center m-5">
              <h2 className="text-gra">{course.description}</h2>
            </div>
          )}
        </div>
      </div>

      <UploadComponent>
        
      </UploadComponent>


    </TrainerLayout>
  );
};

export default CourseAddTopic;