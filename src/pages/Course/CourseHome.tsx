import TrainerLayout from '../../layout/TrainerLayout';
import CourseAddTopic from './CourseAddTopic';
import CourseCreate from './CourseCreate';
import CourseList from './CourseList';
import CourseSummary from './CourseSummary';

const CourseHome = () => {
  return (
    <TrainerLayout>

      <div className='grid grid-cols-2 gap-10'>
        <CourseCreate></CourseCreate>
        <CourseAddTopic></CourseAddTopic>
      </div>

      <div className='flex justify-center mt-10'>
        <CourseSummary></CourseSummary>
      </div>

    </TrainerLayout>
  );
};

export default CourseHome;
