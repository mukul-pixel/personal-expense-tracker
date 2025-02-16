function AddLedgerModal({ title, isOpen, onClose, children }) {
    if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed flex justify-center items-center">
      <div className="bg-white p-5 w-130 h-auto rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="btn px-4 py-1 bg-red-500 text-white rounded-md"
            onClick={onClose}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AddLedgerModal;