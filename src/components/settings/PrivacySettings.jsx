import React, { useState, useEffect } from "react";
import { Button } from "../index";
import { useSelector } from "react-redux";

function PrivacySettings() {
    const auth = useSelector((state) => state.auth?.userData);
    const [settings, setSettings] = useState({
        profileVisibility: 'public',
        videoPrivacy: 'public',
        showSubscriptions: true,
        showLikedVideos: false,
        allowComments: true,
        allowDirectMessages: true,
        showOnlineStatus: true,
        dataCollection: true
    });
    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // In a real app, you would fetch user privacy settings from the backend
        // For now, we'll use default values
    }, [auth]);

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
        setHasChanges(true);
    };

    const saveSettings = async () => {
        setLoading(true);
        try {
            // In a real app, you would send these settings to the backend
            console.log('Saving privacy settings:', settings);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setHasChanges(false);
        } catch (error) {
            console.error('Error saving privacy settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetSettings = () => {
        setSettings({
            profileVisibility: 'public',
            videoPrivacy: 'public',
            showSubscriptions: true,
            showLikedVideos: false,
            allowComments: true,
            allowDirectMessages: true,
            showOnlineStatus: true,
            dataCollection: true
        });
        setHasChanges(false);
    };

    const ToggleSwitch = ({ enabled, onChange, label, description }) => (
        <div className="flex items-center justify-between py-3">
            <div className="flex-1">
                <h4 className="text-white font-medium">{label}</h4>
                {description && (
                    <p className="text-sm text-gray-400 mt-1">{description}</p>
                )}
            </div>
            <button
                type="button"
                onClick={() => onChange(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                    enabled ? 'bg-purple-600' : 'bg-gray-600'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    );

    const RadioGroup = ({ value, onChange, options, label, description }) => (
        <div className="py-3">
            <h4 className="text-white font-medium mb-2">{label}</h4>
            {description && (
                <p className="text-sm text-gray-400 mb-3">{description}</p>
            )}
            <div className="space-y-2">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name={label}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="h-4 w-4 text-purple-600 border-gray-600 bg-gray-700 focus:ring-purple-500 focus:ring-2"
                        />
                        <div className="ml-3">
                            <span className="text-white text-sm">{option.label}</span>
                            {option.description && (
                                <p className="text-xs text-gray-400">{option.description}</p>
                            )}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Profile Privacy</h2>
                
                <RadioGroup
                    value={settings.profileVisibility}
                    onChange={(value) => handleSettingChange('profileVisibility', value)}
                    label="Profile Visibility"
                    description="Control who can see your profile information"
                    options={[
                        {
                            value: 'public',
                            label: 'Public',
                            description: 'Anyone can view your profile'
                        },
                        {
                            value: 'private',
                            label: 'Private',
                            description: 'Only you can view your profile'
                        },
                        {
                            value: 'subscribers',
                            label: 'Subscribers Only',
                            description: 'Only your subscribers can view your profile'
                        }
                    ]}
                />

                <div className="border-t border-gray-700 mt-4 pt-4">
                    <ToggleSwitch
                        enabled={settings.showSubscriptions}
                        onChange={(value) => handleSettingChange('showSubscriptions', value)}
                        label="Show Subscriptions"
                        description="Allow others to see who you're subscribed to"
                    />
                    
                    <ToggleSwitch
                        enabled={settings.showLikedVideos}
                        onChange={(value) => handleSettingChange('showLikedVideos', value)}
                        label="Show Liked Videos"
                        description="Allow others to see videos you've liked"
                    />
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Video Privacy</h2>
                
                <RadioGroup
                    value={settings.videoPrivacy}
                    onChange={(value) => handleSettingChange('videoPrivacy', value)}
                    label="Default Video Privacy"
                    description="Set the default privacy level for new video uploads"
                    options={[
                        {
                            value: 'public',
                            label: 'Public',
                            description: 'Anyone can search for and view your videos'
                        },
                        {
                            value: 'unlisted',
                            label: 'Unlisted',
                            description: 'Only people with the link can view your videos'
                        },
                        {
                            value: 'private',
                            label: 'Private',
                            description: 'Only you can view your videos'
                        }
                    ]}
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Interaction Settings</h2>
                
                <ToggleSwitch
                    enabled={settings.allowComments}
                    onChange={(value) => handleSettingChange('allowComments', value)}
                    label="Allow Comments"
                    description="Let others comment on your videos and posts"
                />
                
                <ToggleSwitch
                    enabled={settings.allowDirectMessages}
                    onChange={(value) => handleSettingChange('allowDirectMessages', value)}
                    label="Allow Direct Messages"
                    description="Let others send you direct messages"
                />
                
                <ToggleSwitch
                    enabled={settings.showOnlineStatus}
                    onChange={(value) => handleSettingChange('showOnlineStatus', value)}
                    label="Show Online Status"
                    description="Let others see when you're online"
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Data & Analytics</h2>
                
                <ToggleSwitch
                    enabled={settings.dataCollection}
                    onChange={(value) => handleSettingChange('dataCollection', value)}
                    label="Analytics Data Collection"
                    description="Allow collection of analytics data to improve your experience"
                />
            </div>

            {hasChanges && (
                <div className="flex gap-3 pt-4">
                    <Button
                        onClick={saveSettings}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button
                        onClick={resetSettings}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                    >
                        Reset to Default
                    </Button>
                </div>
            )}
        </div>
    );
}

export default PrivacySettings;