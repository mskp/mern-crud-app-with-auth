import { useEffect } from "react";
import { useData } from "../../contexts/DataContext";
import { camelCaseToSentenceCase } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import Loading from "../../components/Loading";
import LogoutModal from "../../components/LogoutModal";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { loading, data, fetchData } = useData();
  const { setLogoutModalVisible } = useModal();
  const navigate = useNavigate();
  const { user } = useAuth();
  // useEffect(() => {
  //   fetchData();
  //   console.log(user);
  // }, []);

  if (loading) return <Loading />;

  return (
    <section className="grid place-items-center min-h-screen text-white">
      <div className="bg-zinc-800 overflow-hidden shadow rounded-lg border">
        <div className="px-6 py-4 sm:px-10 sm:py-5">
          <h3 className="text-lg leading-6 font-medium text-center">
            Welcome, {user.name}
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl>
            {Object.entries(data).length !== 0 &&
              Object.entries(data).map(([key, value], index) => (
                <div
                  key={index}
                  className="py-3 sm:grid sm:grid-cols-3 sm:px-6"
                >
                  <dt className="text-sm font-medium sm:pr-4">
                    {camelCaseToSentenceCase(key)}:
                  </dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
          </dl>
        </div>
        <div className="w-full flex flex-col lg:flex-row">
          <button
            onClick={() => setLogoutModalVisible(true)}
            className="bg-red-500 flex-1 hover:bg-red-400 py-2 px-4 rounded-l w-full sm:w-auto"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("edit")}
            className="bg-indigo-500 flex-1 hover:bg-indigo-400 py-2 px-4 rounded-r w-full sm:w-auto"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <LogoutModal />
    </section>
  );
}

export default Profile;
