import React from 'react';

const BookSearchForm = ({
  searchTerm,
  onSearchTermChange,
  onSearchSubmit,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="col-1">
      <h2>Books</h2>
      </div>
      <div className="col-11">
        <form className="d-flex" onSubmit={onSearchSubmit}>
          <input
            type="text"
            name="searchInput"
            className="form-control me-2"
            style={{ width: '450px !important' }}
            placeholder="Search by title or author or published date (dd-mm-yyyy)"
            value={searchTerm}
            onChange={onSearchTermChange}
          />
          <select
            className="form-select me-2"
            value={sortField}
            onChange={onSortFieldChange}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publishedDate">Published Date</option>
          </select>
          <select
            className="form-select me-2"
            value={sortOrder}
            onChange={onSortOrderChange}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
          <button type="submit" className="btn btn-outline-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookSearchForm;
