import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useModal } from "../contexts/ModalContext";
import Modal from "./Modal";

function DeleteConfirmationModal() {
  const { accountDeletionModalVisible, setAccountDeletionModalVisible } =
    useModal();
  const navigate = useNavigate();

  const { deleteAccount } = useData();

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
