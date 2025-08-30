import { useEffect, useState } from "react";
import { Input2, Button, EditAvatar } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../store/Slices/authSlice";
import { RxAvatar } from "react-icons/rx";
import { GrEdit } from "react-icons/gr";

function AccountSettings() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch
    } = useForm();
    
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth?.userData);
    const loading = useSelector((state) => state.auth?.loading);
    const [showAvatarEdit, setShowAvatarEdit] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const watchedFields = watch();

    useEffect(() => {
        if (auth) {
            setValue("fullName", auth?.fullName);
            setValue("email", auth?.email);
            setValue("username", auth?.username);
        }
    }, [auth, setValue]);

    useEffect(() => {
        if (auth && watchedFields) {
            const changed = 
                watchedFields.fullName !== auth?.fullName ||
                watchedFields.email !== auth?.email ||
                watchedFields.username !== auth?.username;
            setHasChanges(changed);
        }
    }, [watchedFields, auth]);

    const saveChanges = (data) => {
        dispatch(updateUserDetails(data));
        setHasChanges(false);
    };

    const resetChanges = (e) => {
        e.preventDefault();
        setValue("fullName", auth?.fullName);
        setValue("email", auth?.email);
        setValue("username", auth?.username);
        setHasChanges(false);
    };

    return (
        <div className="max-w-4xl">
            {showAvatarEdit && (
                <EditAvatar setEditAvatar={setShowAvatarEdit} />
            )}
            
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        {auth?.avatar?.url ? (
                            <img
                                src={auth.avatar.url}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                                <RxAvatar size={40} className="text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div>
                        <Button
                            onClick={() => setShowAvatarEdit(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <GrEdit size={16} />
                            Change Avatar
                        </Button>
                        <p className="text-sm text-gray-400 mt-1">
                            JPG, PNG or GIF. Max size 2MB.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                <form onSubmit={handleSubmit(saveChanges)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input2
                                label="Full Name"
                                type="text"
                                className="bg-gray-700 border-gray-600 text-white"
                                {...register("fullName", {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Full name must be at least 2 characters"
                                    }
                                })}
                            />
                            {errors.fullName && (
                                <span className="text-sm text-red-400 mt-1">
                                    {errors.fullName?.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <Input2
                                label="Username"
                                type="text"
                                className="bg-gray-700 border-gray-600 text-white"
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]+$/,
                                        message: "Username can only contain letters, numbers, and underscores"
                                    }
                                })}
                            />
                            {errors.username && (
                                <span className="text-sm text-red-400 mt-1">
                                    {errors.username?.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <Input2
                            label="Email Address"
                            type="email"
                            className="bg-gray-700 border-gray-600 text-white"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <span className="text-sm text-red-400 mt-1">
                                {errors.email?.message}
                            </span>
                        )}
                    </div>

                    {hasChanges && (
                        <div className="flex gap-3 pt-4 border-t border-gray-700">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button
                                type="button"
                                onClick={resetChanges}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </form>
            </div>

            <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
                <p className="text-gray-300 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                    Delete Account
                </Button>
            </div>
        </div>
    );
}

export default AccountSettings;