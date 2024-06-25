import TrainerLayout from '../../layout/TrainerLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Form as AntForm, Button, Input, message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import {
  setCourseName,
  setDescription,
  setImage,
} from '../../redux/courseSlice';
import { useState } from 'react';

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
const { Dragger } = Upload;

const CourseCreate = () => {
  const dispatch = useDispatch();
  const [showSectionForm, setShowSectionForm] = useState(false);

  const initialValues = {
    CourseName: '',
    Description: '',
    Image: null,
    TrainerId: '',
  };

  //   const onSubmit = async (values, { setSubmitting, resetForm }) => {
  //     const formData = new FormData();
  //     formData.append('CourseName', values.CourseName);
  //     formData.append('Description', values.Description);
  //     formData.append('Image', values.Image);

  //     try {

  // // Apiye kayıt isteiği yerine Redux Store' a kayıt yap
  // // Ardından Bölüm Ekle Divindeki opacity ve disable özelliğini kaldır

  //       const response = await axios.post(
  //         'https://localhost:7043/api/Courses',
  //         formData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         },
  //       );
  //       message.success('Kurs başarıyla eklendi');
  //     } catch (error) {
  //       console.error(error);
  //       message.error('Öğrenci eklenirken bir hata oluştu');
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  const onSubmit = (values: any) => {
    dispatch(setCourseName(values.CourseName));
    dispatch(setDescription(values.Description));
    dispatch(setImage(values.Image));

    // Tam burada bölüm ekleme formunu göstermek için opacity ve disable özelliğini kaldır
    setShowSectionForm(true);
  };

  return (
    <TrainerLayout>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="">
            <div className="grid grid-cols-2 gap-10">
              <div>
                {/* 1.Form -- sol Colon*/}

                <div className="flex justify-center">
                  <h1 className="mb-8 text-3xl">Kurs Ekleme Sayfası</h1>
                </div>

                <div>
                  <AntForm.Item label="Kurs Adı:">
                    <Field
                      name="CourseName"
                      type="text"
                      as={Input}
                      placeholder="Kurs Adı"
                    />
                    <ErrorMessage name="CourseName" component="div" />
                  </AntForm.Item>

                  <AntForm.Item label="Kurs Açıklaması:">
                    <Field
                      name="Description"
                      as={TextArea}
                      type="text"
                      placeholder="Kurs Açıklaması"
                      row={10}
                    />
                    <ErrorMessage name="Description" component="div" />
                  </AntForm.Item>
                  <AntForm.Item label="Fotoğraf Ekle">
                    <Upload
                      {...props}
                      beforeUpload={(file) => {
                        setFieldValue('Image', file);
                        return false; // Prevent auto-upload
                      }}
                      className="mb-5"
                    >
                      <Button
                        className="bg-white text-gray-800"
                        icon={<UploadOutlined />}
                      >
                        Kapak Fotoğrafı Yükle
                      </Button>
                    </Upload>
                  </AntForm.Item>
                  <AntForm.Item className="flex justify-center align-middle">
                    <Button
                      className="bg-blue-500 text-white px-6 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5"
                      disabled={isSubmitting}
                      htmlType="submit"
                    >
                      Sonraki Adıma Geç ...
                    </Button>
                  </AntForm.Item>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>



      {/* Bölüm Ekle Formu */}
      <div className={showSectionForm ? '' : 'opacity-40 pointer-events-none'}>
        <div className="flex justify-center">
          <h1 className="mb-8 text-3xl">Bölüm Ekle</h1>
        </div>

        <AntForm.Item label="Bölüm Adı:">
          <Field
            as={Input}
            name="TopicName"
            type="text"
            placeholder="Bölüm Adı"
          />
        </AntForm.Item>

        {/* <AntForm.Item label="Ders Adı"> */}

        <AntForm.Item label="Dersleri Ekle">
          <Dragger {...props} className="">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </AntForm.Item>

        <AntForm.Item
          wrapperCol={{ offset: 8, span: 16 }}
          className="flex justify-center"
        >
          <Button className="bg-blue-500 text-white px-4 " htmlType="submit">
            Kaydet
          </Button>
        </AntForm.Item>
      </div>



      {/* Özet Formu */}
      <div className="flex justify-center opacity-40 hidden">
        <div className="flex justify-center  mt-10 w-7/12 h-80 rounded-lg shadow-lg">
          <div>
            <h3 className="text-3xl mt-5">Özet</h3>
          </div>
        </div>
      </div>

      
    </TrainerLayout>
  );
};

export default CourseCreate;
