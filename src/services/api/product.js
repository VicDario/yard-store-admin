import axios from 'axios';
import endPoints from '@services/api';

const addProduct = async body => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*'
    }
  };
  const response = await axios.post(endPoints.products.create, body, config);
  return response.data;
};

const deleteProduct = async id => {
  const response = await axios.delete(endPoints.products.delete(id));
  return response.data;
};

export { addProduct, deleteProduct };
