import Link from 'next/link';
import Image from 'next/image';
import useFetch from '@hooks/useFetch';
import endpoints from '@services/api';
import Chart from '@common/Chart';

const PRODUCT_LIMIT = 10;
const PRODUCT_OFFSET = 0;

export default function Dashboard() {
  const products = useFetch(endpoints.products.paginate(PRODUCT_LIMIT, PRODUCT_OFFSET));
  const categoryNames = products?.map(product => product.category);
  const categoryCount = categoryNames?.map(category => category.name);

  const countOccurrences = array =>
    array.reduce(
      (previous, current) => ((previous[current] = ++previous[current] || 1), previous),
      {}
    );

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        boderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', '#f3ba2f', '2a71d0']
      }
    ]
  };

  return (
    <>
      <Chart chartData={data} className="mb-8 mt-2" />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Name
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Category
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Price
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      ID
                    </th>
                    <th className="relative px-6 py-3" scope="col">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th className="relative px-6 py-3" scope="col">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map(product => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              alt={product.title}
                              className="h-10 w-10 rounded-full"
                              height={50}
                              layout="responsive"
                              src="https://api.lorem.space/image?w=640&h=480&r=1657"
                              width={50}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.category.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          $ {product.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link passHref className="text-indigo-600 hover:text-indigo-900" href="#">
                          <a href="replace">Edit</a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link passHref className="text-indigo-600 hover:text-indigo-900" href="#">
                          <a href="replace">Delete</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
