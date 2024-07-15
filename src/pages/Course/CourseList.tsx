import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TrainerHome from '../Dashboard/TrainerHome';
import TrainerLayout from '../../layout/TrainerLayout';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    const courses = async () => {
      try {
        const response = await axios.get('https://localhost:7043/api/Courses');
        setCourseList(response.data);
        console.log('Kurslar : ', response.data);
      } catch (error) {
        console.error('Kurs Listesi çekilirken oluşan hata', error);
      }
    };
    courses();
  }, []);


  
  const handleDelete = (courseId) =>  (event) => {

    
      event.preventDefault();
      console.log("Handle Delete çalıştı");
      console.log("Course Id : ", courseId); 
      
      const response = axios.delete(`https://localhost:7043/api/Courses/${courseId}`);

  };



  return (
    <TrainerLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Kurs Listesi
          </h4>
          <div className="flex justify-end">
            <Link to={'/CourseCreate'}>
              <button className="bg-green-300 hover:bg-green-800 hover:p-5 text-black px-6 py-4 rounded">
                Yeni Kurs Ekle
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Kurs Adı</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Eğitmeni</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Toplam Süresi</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Kayıtlı Öğrenci Sayısı</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Seçenekler</p>
          </div>
        </div>

        {courseList.map((course, key) => (
          
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <img
                    className="h-12.5 w-15 rounded-md"
                    src={
                      course.imageUri ||
                      'https://localhost:7043/images/blank-profile-photo'
                    }
                    alt="Product"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {course.name}
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <div>Eğitmen Yasin Gürbüz</div>
            </div>

            <div className="col-span-1 flex items-center">
              <div>2 Saat 15Dakika</div>
            </div>

            <div className="col-span-2 flex items-center ">
              <div>30</div>
            </div>

            <div className="col-span-1 flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Seçenekler
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <Link to={`/CourseAddTopic/${course.id}`}>
                          <button
                            className={classNames(
                              focus
                                ? 'bg-green-300 text-gray-900'
                                : 'text-gray-700 bg-green-100',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            Kursa Bölüm Ekle
                          </button>
                        </Link>
                      )}
                    </MenuItem>
                    
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            type="submit"
                            onClick={handleDelete(course.id)}
                            className={classNames(
                              focus
                                ? 'bg-red-300 text-gray-900'
                                : 'text-gray-700 bg-red-100',
                              'block w-full px-4 py-2 text-left text-sm',
                            )}
                          >
                            Sil
                          </button>
                        )}
                      </MenuItem>
                   




                    {/* <form onSubmit={handleDelete(course.id)}>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            type="submit"
                            className={classNames(
                              focus
                                ? 'bg-red-300 text-gray-900'
                                : 'text-gray-700 bg-red-100',
                              'block w-full px-4 py-2 text-left text-sm',
                            )}
                          >
                            Sil
                          </button>
                        )}
                      </MenuItem>
                    </form> */}



                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        ))}
      </div>
    </TrainerLayout>
  );
};

export default CourseList;
