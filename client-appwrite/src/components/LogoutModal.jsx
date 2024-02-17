import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";

function LogoutModal() {
  const { logout } = useAuth();

  const { logoutModalVisible, setLogoutModalVisible } = useModal();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Modal
      handleClose={() => setLogoutModalVisible(false)}
      handleConfirm={handleLogout}
      isVisible={logoutModalVisible}
      message={"You wanna logout?"}
      confirmButtonText={"Logout"}
    />
  );
}
export default LogoutModal;
