// Importing necessary dependencies from React and React Router
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signupValidationSchema } from "../../utils/validationSchemas";
import { camelCaseToSentenceCase } from "../../utils";
import InputElement from "./components/InputElement";
import ButtonElement from "./components/ButtonElement";
import { useAuth } from "../../contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();

  const { signup, login } = useAuth();

  const handleSignup = async (data) => {
    console.log("helloo world");
    try {
      data.age = Number(data.age);
      const { confirmPassword, ...signupData } = data;
      const isCreated = await signup(signupData);

      if (isCreated) {
        await login({ email: signupData.email, password: signupData.password });
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      // console.clear();
      console.error(error);
    }
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setErrors,
    touched,
    submitCount,
    initialValues,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      age: "",
      location: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSignup,
    validationSchema: signupValidationSchema,
  });

  const inputFields = Object.keys(initialValues).map((fieldName) => ({
    id: fieldName,
    placeholder: camelCaseToSentenceCase(fieldName),
    type: fieldName.toLowerCase().includes("password") ? "password" : "text",
  }));

  const handleReset = () => {
    setErrors({});
  };

  // JSX rendering
  return (
    <main className="min-h-screen flex flex-col bg-cover items-center justify-center px-6 py-4 mx-auto">
      <div className="w-full sm:max-w-md sm:p-8 flex flex-col gap-4 py-8 border border-gray-600 rounded-lg p-2">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl text-gray-500 flex flex-col items-center justify-center gap-4 tracking-tighter">
            <p>Signup</p>
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
            // text={isLoading ? "Signing up..." : "Signup"}
            text={"Signup"}
          />

          {/* Displaying link to login page */}
          <div className="text-sm text-white text-center p-2 rounded-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline"
              replace={true}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
