import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon, XCircleIcon } from '@heroicons/react/solid';
import Modal from '@common/Modal';
import FormProduct from '@components/FormProduct';
import axios from 'axios';
import endPoints from '@services/api';
import Alert from '@common/Alert';
import useAlert from '@hooks/useAlert';
import { deleteProduct } from '@services/api/product';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert, toggleAlert] = useAlert();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(endPoints.products.list);
        setProducts(response.data);
      } catch (error) {
        setProducts([]);
      }
    }
    getProducts();
  }, [alert]);

  const handleDelete = id => {
    deleteProduct(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Product deleted succesfully',
          type: 'success',
          autoClose: true
        });
      })
      .catch(error => {
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: false
        });
      });
  };

  function filterImages(image) {
    try {
      if (image.includes('https://api.lorem.space/')) return image;
      else throw new Error();
    } catch (error) {
      return 'https://api.lorem.space/image?w=640&h=480&r=1657';
    }
  }

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            List of Products
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => setOpen(true)}
            >
              <CheckIcon aria-hidden="true" className="-ml-1 mr-2 h-5 w-5" />
              Add Product
            </button>
          </span>
        </div>
      </div>
      <div className="flex flex-col py-4">
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
                              src={filterImages(product.images[0])}
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
                        <Link
                          passHref
                          className="text-indigo-600 hover:text-indigo-900"
                          href={`/dashboard/edit/${product.id}`}
                        >
                          <a href="replace">Edit</a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <XCircleIcon
                          aria-hidden="true"
                          className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer"
                          onClick={() => {
                            handleDelete(product.id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setAlert={setAlert} setOpen={setOpen} />
      </Modal>
    </>
  );
}
