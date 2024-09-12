import apiService from '../utils/apiService'; 

const API_BASE_URL = '/books';

const getBooks = async (page = 1, sortField = 'title', sortOrder = 'ASC') => {
  try {
    const response = await apiService.get(`${API_BASE_URL}?page=${page}&sortField=${encodeURIComponent(sortField)}&sortOrder=${encodeURIComponent(sortOrder)}`,true);
    return response;
  } catch (error) {
    throw error;
  }
};

const createBook = async (title, author, publishedDate, genre = null) => {
  try {
    const response = await apiService.post(API_BASE_URL, { title, author, publishedDate, genre }, true);
    return response;
  } catch (error) {
    throw error;
  }
};

const getBookById = async (id) => {
  try {
    const response = await apiService.get(`${API_BASE_URL}/${id}`, true);
    return response;
  } catch (error) {
    throw error;
  }
};

const searchBooks = async (searchParams,page,sortField = 'title', sortOrder = 'ASC') => {
  try {
    const query = `search=${encodeURIComponent(searchParams)}&page=${page}&sortField=${encodeURIComponent(sortField)}&sortOrder=${encodeURIComponent(sortOrder)}`;
    const response = await apiService.get(`${API_BASE_URL}/search?${query}`, true);
    return response;
  } catch (error) {
    throw error;
  }
};

const updateBook = async (id, updatedData) => {
  try {
    const response = await apiService.put(`${API_BASE_URL}/${id}`, updatedData, true);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteBook = async (id) => {
  try {
    const response = await apiService.delete(`${API_BASE_URL}/${id}`, true);
    return response;
  } catch (error) {
    throw error;
  }
};

const bookService = {
  getBooks,
  createBook,
  getBookById,
  searchBooks,
  updateBook,
  deleteBook
};

export default bookService;


