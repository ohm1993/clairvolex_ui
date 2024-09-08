import React from 'react';
import moment from 'moment';
import BooksService from '../services/bookService.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookTable = ({ books, onViewClick, userRole }) => {
  const navigate = useNavigate();

  const handleEdit = (book) => {
    navigate('/add-book', { state: { book } });
  };

  const handleDelete = async(id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?');
    if (isConfirmed) {
      try {
        await BooksService.deleteBook(id);
        toast.success('Book deleted successfully.');
        window.location.reload(); 
      } catch (error) {
        toast.error('Failed to delete the book. Please try again.');
      }
    }
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Published Date</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{moment(book.publishedDate).format('DD-MM-YYYY')}</td> 
            <td>{book.genre}</td>
            <td>
              <button
                className="btn btn-primary me-2"
                onClick={() => onViewClick(book)}
              >
                View
              </button>
              {userRole === 'admin' && (
                <>
                  <button className="btn btn-secondary me-2" onClick={() => handleEdit(book)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
