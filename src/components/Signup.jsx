import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skelton/loginskelton.jsx";
import GetImagePreview from "./GetImagePreview.jsx";

function SignUp() {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth?.loading);

    const submit = async (data) => {
        const response = await dispatch(createAccount(data));
        if (response?.payload?.success) {
            const username = data?.username;
            const password = data?.password;
            const loginResult = await dispatch(
                userLogin({ username, password })
            );

            if (loginResult?.type === "login/fulfilled") {
                navigate("/terms&conditions");
            } else {
                navigate("/login");
            }
        }
    };

    if (loading) {
        return <LoginSkeleton />;
    }

    return (
        <>
            <div className="w-full h-screen text-white p-3 flex justify-center items-start sm:mt-8">
                <div className="flex flex-col space-y-4 justify-center items-center border border-slate-600 p-5 rounded-lg shadow-lg bg-gray-800 sm:w-3/4 lg:w-1/2">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>

                    {/* Signup Form */}
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-5 w-full sm:w-96 text-sm"
                    >
                        {/* Cover Image and Avatar Section */}
                        <div className="relative h-28 bg-[#222222] overflow-hidden">
                            {/* Cover Image */}
                            <GetImagePreview
                                name="coverImage"
                                control={control}
                                className="w-full h-28 object-cover"
                                cameraIcon
                                rules={{}}
                            />
                            <div className="absolute right-2 bottom-2 text-sm text-gray-400 hover:text-purple-500">
                                Cover Image (Optional)
                            </div>

                            {/* Avatar */}
                            <div className="absolute left-2 bottom-2">
                                <GetImagePreview
                                    name="avatar"
                                    control={control}
                                    className="object-cover rounded-full h-20 w-20 border-2 border-gray-500"
                                    cameraIcon={true}
                                    cameraSize={20}
                                    rules={{
                                        required: "Avatar image is required"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Error for Avatar */}
                        {errors.avatar && (
                            <div className="text-red-500">{errors.avatar.message}</div>
                        )}

                        {/* Input Fields */}
                        <Input
                            label="Username:"
                            type="text"
                            placeholder="Enter username"
                            {...register("username", {
                                required: "Username is required",
                            })}
                            className="h-10"
                        />
                        {errors.username && (
                            <span className="text-red-500">{errors.username.message}</span>
                        )}

                        <Input
                            label="Email:"
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="h-10"
                        />
                        {errors.email && (
                            <span className="text-red-500">{errors.email.message}</span>
                        )}

                        <Input
                            label="Full Name:"
                            type="text"
                            placeholder="Enter full name"
                            {...register("fullName", {
                                required: "Full Name is required",
                            })}
                            className="h-10"
                        />
                        {errors.fullName && (
                            <span className="text-red-500">{errors.fullName.message}</span>
                        )}

                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="h-10"
                        />
                        {errors.password && (
                            <span className="text-red-500">{errors.password.message}</span>
                        )}

                        {/* Signup Button */}
                        <Button
                            type="submit"
                            bgColor="bg-purple-500"
                            className="w-full py-3 hover:bg-purple-700 text-lg rounded-md"
                        >
                            Signup
                        </Button>

                        {/* Redirect to Login */}
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-purple-600 hover:opacity-70"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </>
    );
}

export default SignUp;