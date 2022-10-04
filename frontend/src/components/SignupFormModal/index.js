import React, { useState } from "react";
import { SignUpFormModal } from "../../context/Modal";
import SignupForm from "./SignupFormModal";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

      <button onClick={() => setShowModal(true)}>Sign up</button>
      {showModal && (
        <SignUpFormModal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal} />
        </SignUpFormModal>
      )}
    </>
  );
}

export default SignupFormModal;
