import React from 'react'

const Confirm = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to delete?</p>
            <div className="confirmation-buttons">
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Confirm
