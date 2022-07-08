import axios from 'axios';
import endPoints from '@services/api';

const addProduct = async body => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*'
    }
  };
  const response = await axios.post(endPoints.products.addProducts, body, config);
  return response.data;
};

export { addProduct };
