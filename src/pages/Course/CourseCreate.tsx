import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from 'formik';
import TrainerLayout from '../../layout/TrainerLayout';
import { UploadOutlined } from '@ant-design/icons';
import { Form as AntForm, Button, Input, message, Upload } from 'antd';
import type { FormProps, UploadProps } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';

//Fotoğraf Yükleme
const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const { TextArea } = Input;

type FieldType = {
  name: string;
  description: string;
  image: File;
};

const CourseCreate = () => {
  const initialValues = {
    CourseName: '',
    Description: '',
    Image: null,
    TrainerId: '',
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('CourseName', values.CourseName);
    formData.append('Description', values.Description);
    formData.append('Image', values.Image);

    try {
      console.log('Gönderilen Veri : ', formData);

      const response = await axios.post(
        'https://localhost:7043/api/Courses',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Course eklenme işleminin sonucu : ', response.data);
      message.success('Öğrenci başarıyla eklendi');

      Swal.fire({
        icon: 'success',
        text: 'Öğrenci başarıyla eklendi',
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
      message.error('Öğrenci eklenirken bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TrainerLayout>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <div className="mb-5">
                <Field
                  name="CourseName"
                  type="text"
                  as={Input}
                  placeholder="Kurs Adı"
                />
                <ErrorMessage name="CourseName" component="div" />
              </div>
              <div className="mb-5">
                <Field
                  name="Description"
                  as={TextArea}
                  type="text"
                  placeholder="Kurs Açıklaması"
                  row={10}
                />
              </div>
            </div>

            <Upload
              {...props}
              beforeUpload={(file) => {
                setFieldValue('Image', file);
                return false; // Prevent auto-upload
              }}
              className="mb-5"
            >
              <Button icon={<UploadOutlined />}>Kapak Fotoğrafı Yükle</Button>
            </Upload>

            <Button
              className="bg-blue-500 text-white px-6 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5"
              disabled={isSubmitting}
              htmlType="submit"
            >
              Adım 2'ye Geç
            </Button>
          </Form>
        )}
      </Formik>
    </TrainerLayout>
  );
};

export default CourseCreate;
