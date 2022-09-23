import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupFormModal";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

      <button onClick={() => setShowModal(true)}>Sign up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
