import { Button, Input, Upload, message } from 'antd';
import { Formik, Form, Field } from 'formik';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  beforeUpload() {
    console.log('beforeUpload çalıştı');
    return false;
  },
  onChange(info) {
    const { status } = info.file;

    if (status !== 'uploading') {
      console.log('birinci if çalıştı');
      console.log('info = ', info);
      console.log('file list = ', info.fileList);
    }

    if (status === 'done') {
      console.log('done çalıştı');
    } else if (status === 'error') {
      console.log('error çalıştı');
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const CourseAddTopic = () => {
  return (
    <div className="bg-orange-100 rounded-xl p-5">
      <Formik
        initialValues={{
          topicName: '',
          lessons: [],
        }}
        onSubmit={(values) => {
          console.log('Formun values değerleri ======== ', values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="text-3xl text-center m-5">
              <h3>Bölüm Ekleme Sayfası</h3>
            </div>

            <div className="flex">
              <label htmlFor="topicName">Bölüm Adı:</label>
              <Field
                as={Input}
                id="topicName"
                name="topicName"
                placeholder="Bölüm Adı"
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="lessons">Dersleri Ekle:</label>
              <Dragger
                {...props}
                onChange={(info) => {
                  props.onChange(info);
                  setFieldValue('lessons', info.fileList);
                }}
              ></Dragger>
            </div>

            <div className="flex justify-center">
              <Button
                htmlType="submit"
                className="bg-blue-500 text-white mt-10"
              >
                Kaydet
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CourseAddTopic;
