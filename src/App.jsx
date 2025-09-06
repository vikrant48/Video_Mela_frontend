import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthLayout, Login, SignUp } from "./components/index";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import {
    History,
    Channel,
    ChannelVideos,
    ChannelTweets,
    LikedVideos,
    VideoDetail,
    ChannelSubscribers,
    MySubscriptions,
    AdminDashboard,
    EditChannel,
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
import { EditPersonalInfo, ChangePassword, Layout } from "./components";
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
                        path="/edit"
                        element={
                            <AuthLayout authentication>
                                <EditChannel />
                            </AuthLayout>
                        }
                    >
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
                            element={
                                <AuthLayout authentication>
                                    <ChangePassword />
                                </AuthLayout>
                            }
                        />
                    </Route>
                    <Route
                        path="/settings"
                        element={
                            <AuthLayout authentication>
                                <Settings />
                            </AuthLayout>
                        }
                    >
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
                </Route>
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
                <Route
                    path="/watch/:videoId"
                    element={
                        <AuthLayout authentication>
                            <VideoDetail />
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