import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupValidationSchema } from "../../utils/validationSchemas";
import { camelCaseToSentenceCase } from "../../utils";
import InputElement from "./components/InputElement";
import ButtonElement from "./components/ButtonElement";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export default function Signup() {
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const {
    handleChange,
    handleSubmit,
    setErrors,
    initialValues,
    values,
    ...formik
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      age: "",
      location: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (data) => {
      if (Object.values(formik.errors).some((error) => error)) {
        toast.error("Some error occurred"); // Show toast on validation error
        return;
      }
      try {
        const isCreated = await signup({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          age: Number(data.age),
          location: data.location,
        });
        if (isCreated) {
          const isLoggedin = await login({
            email: data.email,
            password: data.password,
          });
          toast.success("Signup successful");
          navigate("/profile", { replace: true });
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Error during signup");
      }
    },
    validationSchema: signupValidationSchema,
  });

  const inputFields = Object.keys(initialValues).map((fieldName) => ({
    id: fieldName,
    placeholder: camelCaseToSentenceCase(fieldName),
    type: fieldName.toLowerCase().includes("password") ? "password" : "text",
  }));

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
            text={"Signup"}
          />
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
