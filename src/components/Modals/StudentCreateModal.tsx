import {Modal,Input,DatePicker,Select,Upload,Button,message,} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

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

const validationSchema = Yup.object({
  FirstName: Yup.string().required('İsim gereklidir'),
  LastName: Yup.string().required('Soyisim gereklidir'),
  Gender: Yup.string().required('Cinsiyet gereklidir'),
  DateOfBirth: Yup.date().required('Doğum Tarihi gereklidir'),
  Image: Yup.mixed().required('Fotoğraf gereklidir'),
});

const StudentCreateModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const initialValues = {
    FirstName: '',
    LastName: '',
    Gender: '',
    DateOfBirth: null,
    Image: null,
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('FirstName', values.FirstName);
    formData.append('LastName', values.LastName);
    formData.append('Gender', values.Gender);
    formData.append('DateOfBirth', values.DateOfBirth.format('YYYY-MM-DD'));
    formData.append('Image', values.Image);

    try {
      const response = await axios.post(
        'https://localhost:7043/api/Students',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response.data);
      message.success('Öğrenci başarıyla eklendi');
      resetForm();
      handleOk();

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
    <>
      <Modal
        title="Öğrenci Ekle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div>
                <Field
                  name="FirstName"
                  type="text"
                  as={Input}
                  placeholder="İsim"
                  className="my-5"
                />
                <ErrorMessage name="FirstName" component="div" />

                <Field
                  name="LastName"
                  as={Input}
                  type="text"
                  placeholder="Soyisim"
                  className="mb-5"
                />
                <ErrorMessage name="LastName" component="div" />

                <div className="mb-5 flex justify-between">
                  <Field
                    name="Gender"
                    as={Select}
                    className="me-5"
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Cinsiyet"
                    optionFilterProp="label"
                    // value={values.gender}
                    onChange={(value) => setFieldValue('Gender', value)}
                    // filterSort={(optionA, optionB) =>
                    //   (optionA.label ?? '').toLowerCase().localeCompare((optionB.label ?? '').toLowerCase())
                    // }
                    options={[
                      { value: '1', label: 'Kadın' },
                      { value: '2', label: 'Erkek' },
                    ]}
                  />
                  <ErrorMessage name="Gender" component="div" />

                  <Field name="DateOfBirth">
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        className=""
                        needConfirm
                        placeholder="Doğum Tarihi"
                        format="YYYY-MM-DD"
                        value={field.value ? moment(field.value) : null}
                        onChange={(date) => form.setFieldValue('DateOfBirth', date)}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="DateOfBirth" component="div" />
                </div>
                <div>
                  <Upload
                    {...props}
                    beforeUpload={(file) => {
                      setFieldValue('Image', file);
                      return false; // Prevent auto-upload
                    }}
                    className="mb-5"
                  >
                    <Button icon={<UploadOutlined />}>Fotoğraf Ekle</Button>
                  </Upload>
                  <ErrorMessage name="Image" component="div" />
                </div>

                <Button
                  className="bg-blue-500 mt-5"
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  Kaydet
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default StudentCreateModal;
