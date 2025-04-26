import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    // Validation Schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(3, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required")
    });

    // Setting up useForm hook with Yup validation
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
      const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    // Submit handler
    const onSubmit = async (data) => {
        try {
         const response=   await dispatch(signup(data)).unwrap();
          toast.success(response.message || "Signup successful!");
          navigate("/"); 
          } catch (err) {
            toast.error(error);
          }
          
      };
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex justify-center items-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-gray-50 shadow-lg sm:rounded-lg flex w-full">
                {/* Left Side - Welcome Section */}
                <div className="hidden lg:flex flex-1 text-gray-900 flex-col justify-center items-center p-12">
                    <h1 className="text-4xl font-extrabold">Join Our Feedback Portal</h1>
                    <p className="mt-4 text-lg text-center opacity-90">
                        Create an account to explore, write, and share your feedbacks.
                    </p>
                    <img
                        src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
                        alt="Welcome Illustration"
                        className="mt-8 w-64"
                    />
                </div>

                {/* Right Side - Signup Form */}
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-8 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
                        <div className="w-full flex-1 mt-6">
                            {/* Social Signup Button */}
                            <div className="flex flex-col items-center">
                                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                                            <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                                            <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                                            <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Sign Up with Google</span>
                                </button>
                            </div>

                            <div className="my-6 border-b text-center">
                                <span className="px-2 bg-gray-100 text-gray-600 text-sm">Or sign up with email</span>
                            </div>

                            {/* Signup Form */}
                            <form className="mx-auto max-w-xs" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <input
                                        {...register("name")}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-indigo-500"
                                        type="text"
                                        placeholder="Full Name"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                                </div>

                                <div className="mt-4">
                                    <input
                                        {...register("email")}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-indigo-500"
                                        type="email"
                                        placeholder="Email"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                                </div>

                                <div className="mt-4">
                                    <input
                                        {...register("password")}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-indigo-500"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                </div>

                                <div className="mt-4">
                                    <input
                                        {...register("confirmPassword")}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-indigo-500"
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                <button disabled={loading}
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-indigo-600 text-white w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center"
                                >
                                    <span className="ml-3"> {loading ? "Signing Up..." : "Sign Up"}</span>
                                </button>

                                <p className="mt-4 text-xs text-gray-600 text-center">
                                    By signing up, you agree to our
                                    <a href="#" className="border-b border-gray-500"> Terms of Service</a> and
                                    <a href="#" className="border-b border-gray-500"> Privacy Policy</a>.
                                </p>
                                <p className="mt-4 text-sm text-gray-600 text-center">
                                    Already have an account?
                                    <a href="/login" className="text-indigo-600 font-semibold hover:underline"> Sign In</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
