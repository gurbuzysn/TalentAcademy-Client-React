import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    const courses = async () => {
      try {
        const response = await axios.get('https://localhost:7043/api/Courses');
        setCourseList(response.data);
        console.log("Kurslar : ",response.data);
      } catch (error) {
        console.error('Kurs Listesi çekilirken oluşan hata', error);
      }
    };
    courses();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Kurs Listesi
        </h4>
        <div className="flex justify-end">
          <Link to={'/CourseCreate'}>
            <button className="bg-green-500 hover:bg-green-800 hover:p-5 text-white px-6 py-4 rounded">
              Yeni Kurs Ekle
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Kurs Adı</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Eğitmeni</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Toplam Süresi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Kayıtlı Öğrenci Sayısı</p>
        </div>
      </div>

      {courseList.map((course, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img className="h-12.5 w-15 rounded-md" src={course.imageUri || "https://localhost:7043/images/blank-profile-photo" } alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {course.name}
              </p>
            </div>
          </div>
          {/* <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {course.category}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${course.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default CourseList;
