import api from './api';

//QUERY FOR FETCHING USERDATA
export const fetchData = async ( pageNumber:number, pageSize:number,) => {
  try {
    const response = await api.get(`?results=${pageSize}&page=${pageNumber}`);
    
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
