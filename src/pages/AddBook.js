import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import bookService from '../services/bookService';

const AddBook = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedDate: '',
    genre: '',
  });
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await bookService.updateBook(location.state.book.id, formData);
        toast.success('Book updated successfully!');
      } else {
        const { title, author, publishedDate, genre } = formData;
        const formattedDate = formatDate(publishedDate);
        await bookService.createBook(title, author, formattedDate, genre);
        toast.success('Book added successfully!');
      }
      navigate('/dashboard');
    } catch (error) {
      if (error.message) {
        setErrors(error.message || {});
      } else {
        toast.error('An error occurred while adding the book.');
      }
    }
  };

  useEffect(() => {
    if (location.state && location.state.book) {
      const { title, author, publishedDate, genre } = location.state.book;
      setFormData({
        title,
        author,
        publishedDate: new Date(publishedDate).toISOString().split('T')[0],
        genre,
      });
      setIsEditMode(true);
    }
  }, [location.state]);

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? 'Edit Book' : 'Add a New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className={`form-control ${errors.author ? 'is-invalid' : ''}`}
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && <div className="invalid-feedback">{errors.author}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="publishedDate" className="form-label">
            Published Date
          </label>
          <input
            type="date"
            className={`form-control ${errors.publishedDate ? 'is-invalid' : ''}`}
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
          />
          {errors.publishedDate && <div className="invalid-feedback">{errors.publishedDate}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
          {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
