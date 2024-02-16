import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

function EditProfile() {
  const { loading, data, fetchData, updateAccount } = useData();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    location: "",
  });
  const navigate = useNavigate();
  const { setAccountDeletionModalVisible } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        age: data.age ?? "",
        location: data.location ?? "",
      });
    }
  }, [data]);

  const handleUpdate = async () => {
    const emptyValues = Object.values(formData).some((data) => data === "");
    if (emptyValues) return;
    await updateAccount(formData);
    navigate("/profile");
  };

  if (loading) return <p className="text-2xl">Please wait...</p>;

  return (
    <div className="flex justify-center mt-20 px-8">
      <form className="max-w-2xl" onSubmit={handleUpdate}>
        <div className="flex flex-wrap border shadow rounded-lg p-3 bg-zinc-800">
          <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
            Edit Profile
          </h2>

          <div className="flex flex-col gap-2 w-full border-gray-400">
            <div>
              <label className="text-gray-600 dark:text-gray-400">
                Full Name
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-400">
                Email (Can't be updated)
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-500 dark:text-gray-100"
                type="text"
                value={formData.email}
                readOnly
              />
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-400">Age</label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-gray-600 dark:text-gray-400">
                Location
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            {/* <div className="flex justify-end">
              <button
                className="py-1.5 px-3 m-1 text-center bg-slate-700 border rounded-md text-white hover:text-gray-100 dark:text-gray-200 "
                type="submit"
                disabled={Object.values(formData).some((data) => data === "")}
              >
                Save changes
              </button>
            </div> */}

            <div className="w-full flex flex-col lg:flex-row">
              <button
                type="button"
                onClick={() => setAccountDeletionModalVisible(true)}
                className="bg-red-500 flex-1 hover:bg-red-400 py-2 px-4 rounded-l w-full sm:w-auto"
              >
                Delete Account
              </button>
              <button className="bg-indigo-500 flex-1 hover:bg-indigo-400 py-2 px-4 rounded-r w-full sm:w-auto">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
      <DeleteConfirmationModal />
    </div>
  );
}

export default EditProfile;
