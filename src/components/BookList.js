import React, { useEffect, useState } from 'react';
import bookService from '../services/bookService';
import BookModal from './BookModal';

function BookList() {
  const [books, setBooks] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('ASC'); 

  const fetchBooks = async (page = 1, searchTerm = '', sortField = 'title', sortOrder = 'ASC') => {
    setLoading(true);
    try {
      let data;
      if (searchTerm) {
        data = await bookService.searchBooks(searchTerm, page, sortField, sortOrder);
      } else {
        data = await bookService.getBooks(page,sortField, sortOrder);
      }
      setBooks(data.data.books);
      setCurrentPage(data.data.currentPage);
      setTotalPages(Math.ceil(data.data.total / 10));
    } catch (err) {
      setError('Failed to fetch books.');
    } finally {
      setLoading(false);
    }
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };


  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchInput.value; 
    setSearchTerm(searchValue);
    fetchBooks(1, searchValue, sortField, sortOrder); 
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      fetchBooks(1, '', sortField, sortOrder); 
    }
  };

  const handleViewClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, sortField, sortOrder]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {!loading && !error && (
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Books</h2>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              type="text"
              name="searchInput"
              className="form-control me-2"
              placeholder="Search by title or author or published date(dd-mm-yyyy)"
              value={searchTerm}
              onChange={handleInputChange} 
            />
             <select
                className="form-select me-2"
                value={sortField}
                onChange={handleSortFieldChange}
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="publishedDate">Published Date</option>
              </select>
              <select
                className="form-select me-2"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
          </form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Published Date</th>
              <th scope="col">Genre</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishedDate}</td>
                <td>{book.genre}</td>
                <td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewClick(book)}
                  >
                    View
                  </button>
              </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedBook && (
          <BookModal
            show={showModal}
            onHide={handleCloseModal}
            book={selectedBook}
          />
        )}
        <div className="d-flex justify-content-end mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    )}
  </div>
  );
}

export default BookList;
