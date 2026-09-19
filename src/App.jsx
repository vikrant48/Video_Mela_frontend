import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthLayout } from "./components/index";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import {
    History,
    Channel,
    ChannelVideos,
    ChannelTweets,
    LikedVideos,
    ChannelSubscribers,
    MySubscriptions,
    AdminDashboard,
    HomePage,
    SearchVideos,
    TermsAndConditions,
    ChannelPlaylist,
    Settings,
    Help,
    Feedback,
    ReportHistory,
    UploadVideoPage,
} from "./pages";
import { EditPersonalInfo, Layout, Login, SignUp } from "./components";
import {
    AccountSettings,
    PrivacySettings,
    NotificationSettings,
    AppearanceSettings,
} from "./components/settings";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <AuthLayout authentication={false}>
                                <HomePage />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="search/:query"
                        element={
                            <AuthLayout authentication={false}>
                                <SearchVideos />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="channel/:username"
                        element={
                            <AuthLayout authentication>
                                <Channel />
                            </AuthLayout>
                        }
                    >
                        <Route
                            index
                            element={<Navigate to="videos" replace />}
                        />
                        <Route
                            path="videos"
                            element={
                                <AuthLayout authentication>
                                    <ChannelVideos />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="playlists"
                            element={
                                <AuthLayout authentication>
                                    <ChannelPlaylist />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="tweets"
                            element={
                                <AuthLayout authentication>
                                    <ChannelTweets />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="subscribed"
                            element={
                                <AuthLayout authentication={false}>
                                    <ChannelSubscribers />
                                </AuthLayout>
                            }
                        />
                    </Route>
                    <Route
                        path="/history"
                        element={
                            <AuthLayout authentication>
                                <History />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="/liked-videos"
                        element={
                            <AuthLayout authentication>
                                <LikedVideos />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="/subscriptions"
                        element={
                            <AuthLayout authentication>
                                <MySubscriptions />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <AuthLayout authentication>
                                <Settings />
                            </AuthLayout>
                        }
                    >
                        <Route
                            index
                            element={<Navigate to="personalInfo" replace />}
                        />
                        <Route
                            path="personalInfo"
                            element={
                                <AuthLayout authentication>
                                    <EditPersonalInfo />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="password"
                            element={<Navigate to="/settings/account" replace />}
                        />
                        <Route
                            path="account"
                            element={
                                <AuthLayout authentication>
                                    <AccountSettings />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="privacy"
                            element={
                                <AuthLayout authentication>
                                    <PrivacySettings />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="notifications"
                            element={
                                <AuthLayout authentication>
                                    <NotificationSettings />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="appearance"
                            element={
                                <AuthLayout authentication>
                                    <AppearanceSettings />
                                </AuthLayout>
                            }
                        />
                    </Route>
                    <Route
                        path="/help"
                        element={
                            <AuthLayout authentication={false}>
                                <Help />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="/feedback"
                        element={
                            <AuthLayout authentication={false}>
                                <Feedback />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="/report-history"
                        element={
                            <AuthLayout authentication={false}>
                                <ReportHistory />
                            </AuthLayout>
                        }
                    />
                    <Route
                        path="/collections"
                        element={
                            <AuthLayout authentication>
                                <AdminDashboard />
                            </AuthLayout>
                        }
                    />
                </Route>
                <Route
                    path="/terms&conditions"
                    element={
                        <AuthLayout authentication>
                            <TermsAndConditions />
                        </AuthLayout>
                    }
                />
                <Route
                    path="/upload"
                    element={
                        <AuthLayout authentication>
                            <UploadVideoPage />
                        </AuthLayout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <AuthLayout authentication={false}>
                            <Login />
                        </AuthLayout>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <AuthLayout authentication={false}>
                            <SignUp />
                        </AuthLayout>
                    }
                />
            </Routes>

            <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{
                    error: {
                        style: { borderRadius: "0", color: "red" },
                    },
                    success: {
                        style: { borderRadius: "0", color: "green" },
                    },
                    duration: 2000,
                }}
            />
        </>
    );
}

export default App;