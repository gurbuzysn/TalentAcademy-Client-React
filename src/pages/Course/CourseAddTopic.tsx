import axios from 'axios';
import TrainerLayout from '../../layout/TrainerLayout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Upload, UploadProps } from 'antd';
const { Dragger } = Upload;

const props: UploadProps = {
  
}

const CourseAddTopic = () => {
  const CourseName = useSelector((state: any) => state.course.courseName);
  const { id } = useParams();
  const [course, setCourse] = useState<any>({});

  useEffect(() => {
    const fetchCourseDataByName = async () => {
      try {
        console.log('CourseName : ', CourseName);
        const courseData = await axios.get(
          `https://localhost:7043/api/Courses/byname/${CourseName}`,
        );
        setCourse(courseData.data);
      } catch (error) {
        console.log('CourseName den çekerken Hataya Düştü');
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


          <div>
            <div>
              <h3 className="text-xl text-center ms-10 mb-5 mt-10">
                Kursa Bölüm Ekle
              </h3>
            </div>
            <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
          </div>
        </div>
      </div>
    </TrainerLayout>
  );
};

export default CourseAddTopic;

// import { Button, Input, Upload, message } from 'antd';
// import { Formik, Form, Field } from 'formik';
// import type { UploadProps } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTopicName, setLessons } from '../../redux/courseSlice';
// import { InboxOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import TrainerLayout from '../../layout/TrainerLayout';

// const { Dragger } = Upload;

// const props: UploadProps = {
//   name: 'file',
//   multiple: true,
//   beforeUpload() {
//     console.log('beforeUpload çalıştı');
//     // return false;
//   },
//   onChange(info) {
//     const { status } = info.file;

//     if (status !== 'uploading') {
//       // console.log('birinci if çalıştı');
//       // console.log('info = ', info);
//       // console.log('file list = ', info.fileList);
//     }

//     if (status === 'done') {
//       // console.log('done çalıştı');
//     } else if (status === 'error') {
//       // console.log('error çalıştı');
//     }
//   },
//   onDrop(e) {
//     console.log('Dropped files', e.dataTransfer.files);
//   },
// };

// const CourseAddTopic = () => {
//   const dispatch = useDispatch();
//   const course = useSelector((state) => state.course);

//   return (
//     <TrainerLayout>

//     <div className=''>
//       <div className="bg-orange-100 rounded-xl p-5  flex justify-center w-1/2">
//         <div className="text-3xl text-center ms-10 mb-5">
//           <h3>Bölüm Ekleme Sayfası</h3>
//         </div>
//         <Formik
//           initialValues={{
//             topicName: '',
//             lessons: [],
//           }}
//           onSubmit={async (values) => {
//             //Burada Apiye Redux storedaki course verileri gönderilecek ve apide course ve topic ve lesson nesneleri oluşturulup ilişkileri verilip kayıt edilecek. Sonra Özet Sayfası oluşturulacak

//             const courseData = {
//               courseName: course.courseName,
//               description: course.description,
//               courseImage: course.image,
//               topicName: values.topicName,
//               lessons: values.lessons,
//             };

//             console.log('course = ', courseData);

//             const response = await axios.post(
//               'https://localhost:7043/api/Course',
//               courseData,
//               {
//                 headers: {
//                   'Content-Type': 'multipart/form-data',
//                 },
//               },
//             );
//             console.log('response = ', response);
//           }}
//         >
//           {({ setFieldValue }) => (
//             <Form>
//               <div className="flex justify-between items-center mb-5">
//                 <label htmlFor="topicName">Bölüm Adı:</label>
//                 <Field
//                   as={Input}
//                   id="topicName"
//                   name="topicName"
//                   placeholder="Bölüm Adı"
//                   autoComplete="on"
//                   className="w-9/12 me-5"
//                 />
//               </div>

//               <div className="flex justify-between items-center mb-5">
//                 <label htmlFor="lessons">Dersleri Ekle:</label>
//                 <Dragger
//                   {...props}
//                   onChange={(info) => {
//                     props.onChange(info);
//                     setFieldValue('lessons', info.fileList);
//                   }}
//                   className="w-9/12 me-5"
//                 >
//                   <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                   </p>
//                   <p className="ant-upload-text">
//                     Dosya yüklemek için bu alana sürükleyin ya da tıklayın
//                   </p>
//                 </Dragger>
//               </div>

//               <div className="flex justify-center">
//                 <Button
//                   htmlType="submit"
//                   className="bg-blue-500 hover:bg-blue-700 text-lg px-8 py-5 text-white"
//                 >
//                   Kaydet
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//     </TrainerLayout>
//   );
// };

// export default CourseAddTopic;
