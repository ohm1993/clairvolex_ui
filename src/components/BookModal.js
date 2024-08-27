import React from 'react';

const BookModal = ({ show, onHide, book }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{book.title}</h5>
          </div>
          <div className="modal-body">
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published Date:</strong> {book.publishedDate}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
