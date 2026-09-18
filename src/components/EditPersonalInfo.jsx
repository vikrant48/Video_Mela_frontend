import { useEffect, useState } from "react";
import { Input2, Button, EditAvatar } from "../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../store/Slices/authSlice";
import { RxAvatar } from "react-icons/rx";
import { GrEdit } from "react-icons/gr";

function EditPersonalInfo() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
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
                watchedFields.email !== auth?.email;
            setHasChanges(changed);
        }
    }, [watchedFields, auth]);

    const saveChanges = async (data) => {
        // Only send editable fields (fullName and email) in payload
        const payload = {
            fullName: data.fullName,
            email: data.email,
        };
        const res = await dispatch(updateUserDetails(payload));
        if (updateUserDetails.fulfilled.match(res)) {
            setHasChanges(false);
        }
    };

    const resetChanges = (e) => {
        e.preventDefault();
        setValue("fullName", auth?.fullName);
        setValue("email", auth?.email);
        setValue("username", auth?.username);
        setHasChanges(false);
    };

    return (
        <div className="max-w-4xl text-white space-y-6">
            {showAvatarEdit && (
                <EditAvatar setEditAvatar={setShowAvatarEdit} />
            )}

            {/* Profile Picture Section */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        {auth?.avatar?.url || auth?.avatar ? (
                            <img
                                src={auth?.avatar?.url || auth?.avatar}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/50"
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
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
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

            {/* Personal & Account Information Form */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
                <p className="text-sm text-gray-400 mb-6">
                    Update your display name and contact email address.
                </p>

                <form onSubmit={handleSubmit(saveChanges)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input2
                                label="Full Name"
                                type="text"
                                className="bg-gray-700 border-gray-600 text-white rounded-lg"
                                {...register("fullName", {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Full name must be at least 2 characters",
                                    },
                                })}
                            />
                            {errors.fullName && (
                                <span className="text-sm text-red-400 mt-1 block">
                                    {errors.fullName?.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <Input2
                                label="Username"
                                type="text"
                                disabled
                                className="bg-gray-800/80 border-gray-700 text-gray-400 cursor-not-allowed rounded-lg opacity-80"
                                {...register("username")}
                            />
                        </div>
                    </div>

                    <div>
                        <Input2
                            label="Email Address"
                            type="email"
                            className="bg-gray-700 border-gray-600 text-white rounded-lg"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-sm text-red-400 mt-1 block">
                                {errors.email?.message}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-700 justify-end">
                        <Button
                            type="button"
                            onClick={resetChanges}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition-colors"
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !hasChanges}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPersonalInfo;