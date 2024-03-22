import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetBrand = (brand) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/brand/${brand}`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brand]);

  return { product, loading, error };
};

export default useGetBrand;