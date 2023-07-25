import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../redux/transactionsSlice';

const Modal = ({ closeModal, activeModalId, modalsData }) => {
  console.log(modalsData)
  const activeModal = modalsData?.find((modal) => modal._id === activeModalId);
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.transactions);

  const handleNextModal = () => {
    const nextModalIndex = modalsData.findIndex((modal) => modal._id === activeModalId) + 1;
    const nextModalId = modalsData[nextModalIndex % modalsData?.length]._id;
    dispatch(openModal(nextModalId));
  };

  const handlePrevModal = () => {
    const prevModalIndex = modalsData.findIndex((modal) => modal._id === activeModalId) - 1;
    const prevModalId =
      modalsData[(prevModalIndex + modalsData?.length) % modalsData?.length]._id;
    dispatch(openModal(prevModalId));
  };

  if (!activeModal) return null;

  return (
    <Transition appear show={isModalOpen} onClose={closeModal} as={React.Fragment}>
      <Dialog as="div" className="border vh-100 vw-100">
        {/* Modal content */}
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="w-screen h-screen inline-block w-full max-w-md p-6 mb-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="row">
                <div className="col w-25 d-flex justify-content-end">
                  <button onClick={closeModal} className="modal-close-button">
                    <img width="25px" src="/close.png" alt="close" />
                  </button>
                </div>
              </div>
              <div className='row mt-8 pb-6'>
                <div className=" modal-main col-md-4 offset-md-3">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className='d-flex flex-column gap-5'>
                      {<img style={{ width: "100px", height: "100px", objectFit: "contain" }} src={activeModal.imageSrc.includes('http') ? activeModal.imageSrc : `https://matumi-server.onrender.com${activeModal.imageSrc}`} alt="logo"/>}
                      <p className='modal-description'>{activeModal.description}</p>
                    </div>
                  </Dialog.Title>
                  {/* Add other modal content here */}
                </div>
                <div className='col-md-2 ps-7 border-start'>
                  <h6 className='text-muted mt-5'>Mandate</h6>
                  {activeModal.mandate}
                  <br/>
                  <h6 className='text-muted mt-5'>Geography</h6>
                  {activeModal.geography}
                  <br/>
                  <h6 className='text-muted mt-5'>Industry</h6>
                  {activeModal.industry}
                  <br/>
                </div>
              </div>
              {/* Navigation Buttons */}
              <div className="modal-nav-btn-wrapper d-flex gap-7 justify-content-center">
                <button type="button" className="modal-nav-button" onClick={handlePrevModal}>
                  <img src="/left-arrow.png" width="30px" alt="left arrow" />
                </button>
                <button type="button" className="modal-nav-button" onClick={handleNextModal}>
                  <img src="/arrow-right.png" width="30px" alt="right arrow" />
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
