import React, { useEffect, useState } from 'react';
import bookService from '../services/bookService';
import BookModal from './BookModal';
import BookTable from './BookTable';
import BookSearchForm from './BookSearchForm';
import { useAuth } from '../context/AuthContext';

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
  const { user } = useAuth();

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
        <BookSearchForm
          searchTerm={searchTerm}
          onSearchTermChange={handleInputChange}
          onSearchSubmit={handleSearch}
          sortField={sortField}
          onSortFieldChange={handleSortFieldChange}
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
        />
        <BookTable books={books} onViewClick={handleViewClick} userRole={user.role}/>
        {selectedBook && (
          <BookModal
            show={showModal}
            onHide={handleCloseModal}
            book={selectedBook}
          />
        )}
        {totalPages > 1 && (
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
        )}
      </>
    )}
  </div>
  );
}

export default BookList;
