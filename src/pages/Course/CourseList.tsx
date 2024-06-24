import { Product } from '../../types/product';
import ProductOne from '../../images/product/product-01.png';


const productData: Product[] = [
  {
    image: ProductOne,
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 296,
    sold: 22,
    profit: 45,
  },
];


const CourseList = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Kurs Listesi
        </h4>
        <div className='flex justify-end'>
            <button className='bg-green-500 hover:bg-green-800 hover:p-5 text-white px-6 py-4 rounded'>Yeni Kurs Ekle</button>
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

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.image} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>
          
        </div>
      ))}
    </div>
  )
}

export default CourseList