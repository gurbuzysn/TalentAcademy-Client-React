import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Input } from 'antd';
import axios from 'axios';
import TrainerLayout from '../../layout/TrainerLayout';
import { useNavigate } from 'react-router-dom';
import { setCourseName } from '../../redux/courseSlice';
import { useDispatch } from 'react-redux';

const customFileInput = ({ form }) => {
  const handleChange = (e) => {
    form.setFieldValue('Image', e.currentTarget.files[0]);
  };
  return <Input type="file" onChange={handleChange} className="w-9/12 me-5" />;
};

const CourseCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <TrainerLayout>
      <div className="flex justify-center">
        <div className="m-10 py-5 bg-blue-200 w-1/2 rounded-xl">
          <div className="text-3xl flex justify-center mb-5">
            <h3>Kurs Ekleme Sayfası</h3>
          </div>
          <Formik
            initialValues={{
              CourseName: '',
              Description: '',
              Image: null,
            }}
            onSubmit={async (values) => {
              try {
                const response = await axios.post(
                  'https://localhost:7043/api/Courses',
                  values,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  },
                );
                dispatch(setCourseName(values.CourseName));
                navigate('/CourseAddTopic');
              } catch (error) {
                console.error('Error creating course:', error);
              }
            }}
          >
            <Form>
              <div className="flex justify-between items-center mb-5">
                <label className="ms-5" htmlFor="CourseName">
                  Kurs Adı:
                </label>
                <Field
                  className="w-9/12 me-5"
                  as={Input}
                  id="CourseName"
                  name="CourseName"
                  placeholder="Kurs Adı"
                />
                <ErrorMessage name="CourseName" component="div" />
              </div>

              <div className="mb-5 flex justify-between items-center">
                <label className="ms-4" htmlFor="Description">
                  Kurs Açıklaması:
                </label>
                <Field
                  className="w-9/12 me-5"
                  as={Input}
                  id="Description"
                  name="Description"
                  placeholder="Kurs Açıklaması"
                />
                <ErrorMessage name="Description" component="div" />
              </div>

              <div className="mb-5 flex justify-between items-center">
                <label className="ms-4" htmlFor="Image">
                  Kurs Fotoğrafı:
                </label>
                <Field
                  className=""
                  id="Image"
                  name="Image"
                  component={customFileInput}
                />
                <ErrorMessage name="Image" component="div" />
              </div>

              <div className="flex justify-center mt-10 ">
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
      </div>
    </TrainerLayout>
  );
};

export default CourseCreate;
