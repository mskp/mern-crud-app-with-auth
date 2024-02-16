// Importing necessary dependencies from React and React Router
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { loginValidationSchema } from "../../utils/validationSchemas";
import { camelCaseToSentenceCase } from "../../utils";
import InputElement from "./components/InputElement";
import ButtonElement from "./components/ButtonElement";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const isLoggedin = await login(values);
    if (isLoggedin) navigate("/profile", { replace: true });
  };

  const { handleChange, handleSubmit, values, setErrors, initialValues } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: handleLogin,
      validationSchema: loginValidationSchema,
    });

  const inputFields = Object.keys(initialValues).map((fieldName) => ({
    id: fieldName,
    placeholder: camelCaseToSentenceCase(fieldName),
    type: fieldName.toLowerCase().includes("password") ? "password" : "text",
  }));

  return (
    <main className="min-h-screen flex flex-col bg-cover items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full sm:max-w-md sm:p-8 flex flex-col gap-8 border border-gray-600 rounded-lg p-2">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl text-gray-500 flex flex-col items-center justify-center gap-4 tracking-tighter">
            <p>Sign in</p>
          </h1>

          {inputFields.map((field) => (
            <InputElement
              key={field.id}
              field={field}
              handleChange={handleChange}
              values={values}
            />
          ))}
          <ButtonElement
            disabled={Object.keys(values).some((key) => !values[key])}
            text={"Login"}
          />
          <div className="text-sm text-white text-center p-2 rounded-lg">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline"
              replace={true}
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
export default Login;
