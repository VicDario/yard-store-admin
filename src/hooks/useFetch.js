import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = endpoint => {
  const [data, setData] = useState([]);

  function setError(error) {
    setData(error);
  }
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(endpoint);
      setData(response.data);
    }
    try {
      fetchData();
    } catch (error) {
      setError(error);
    }
  }, [endpoint]);
  return data;
};

export default useFetch;
