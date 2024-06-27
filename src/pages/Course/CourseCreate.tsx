import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Input} from 'antd';
import { useDispatch } from 'react-redux';
import { setCourseName, setDescription, setImage } from '../../redux/courseSlice';

const customFileInput = ({ form }) => {
  const handleChange = (e) => {
    form.setFieldValue('courseImage', e.currentTarget.files[0]);
  };
  return <Input type="file" onChange={handleChange} className="w-4/5 me-5" />;
};

const CourseCreate = () => {

  const dispatch = useDispatch();

  return (
    <div className="ms-10 py-5 bg-blue-100 rounded-xl">
      <div className="text-3xl flex justify-center mb-5">
        <h3>Kurs Ekleme Sayfası</h3>
      </div>
      <Formik
        initialValues={{
          courseName: '',
          courseDescription: '',
          courseImage: null,
        }}
        onSubmit={(values) => {

          dispatch(setCourseName(values.courseName));
          dispatch(setDescription(values.courseDescription));
          dispatch(setImage(values.courseImage));

          console.log('Formun Sonucunda oluşan veri: ', values);
        }}
      >
        <Form>
          <div className="flex justify-between mb-5">
            <label className="ms-5" htmlFor="courseName">
              Kurs Adı:
            </label>
            <Field
              className="w-4/5 me-5"
              as={Input}
              id="courseName"
              name="courseName"
              placeholder="Kurs Adı"
            />
            <ErrorMessage name="courseName" component="div" />
          </div>

          <div className="mb-5 flex justify-between">
            <label className="ms-4" htmlFor="courseDescription">
              Kurs Açıklaması:
            </label>
            <Field
              className="w-4/5 me-5"
              as={Input}
              id="courseDescription"
              name="courseDescription"
              placeholder="Kurs Açıklaması"
            />
            <ErrorMessage name="courseDescription" component="div" />
          </div>

          <div className="mb-5 flex justify-between">
            <label className='ms-4' htmlFor="courseImage">Kurs Fotoğrafı:</label>
            <Field
              className="w-"
              id="courseImage"
              name="courseImage"
              component={customFileInput}
            />
            <ErrorMessage name="courseImage" component="div" />
          </div>

          <div className="flex justify-center mt-5 ">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-lg px-8 py-5"
              type="primary"
              htmlType="submit"
            >
              Sonraki Adıma Geç
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CourseCreate;
