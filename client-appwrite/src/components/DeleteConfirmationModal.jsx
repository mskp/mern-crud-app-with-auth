import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";

function DeleteConfirmationModal() {
  const { accountDeletionModalVisible, setAccountDeletionModalVisible } =
    useModal();
  const navigate = useNavigate();

  const { deleteAccount } = useAuth();

  const handleDelete = async () => {
    await deleteAccount();
    navigate("/login");
  };
  return (
    <Modal
      isVisible={accountDeletionModalVisible}
      handleClose={() => setAccountDeletionModalVisible(false)}
      handleConfirm={handleDelete}
      message={"You wanna delete your account?"}
      confirmButtonText={"Delete"}
    />
  );
}
export default DeleteConfirmationModal;
