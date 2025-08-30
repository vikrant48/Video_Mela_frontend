import React, { useState, useEffect } from "react";
import { Button } from "../index";
import { useSelector } from "react-redux";
import { CiBellOn, CiMail, CiMobile1 } from "react-icons/ci";

function NotificationSettings() {
    const auth = useSelector((state) => state.auth?.userData);
    const [settings, setSettings] = useState({
        // Email Notifications
        emailNewVideos: true,
        emailComments: true,
        emailLikes: false,
        emailSubscriptions: true,
        emailWeeklyDigest: true,
        emailPromotional: false,
        
        // Push Notifications
        pushNewVideos: true,
        pushComments: true,
        pushLikes: false,
        pushSubscriptions: true,
        pushLiveStreams: true,
        
        // In-App Notifications
        inAppComments: true,
        inAppLikes: true,
        inAppSubscriptions: true,
        inAppMentions: true,
        
        // Frequency Settings
        digestFrequency: 'weekly',
        quietHoursEnabled: false,
        quietHoursStart: '22:00',
        quietHoursEnd: '08:00'
    });
    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // In a real app, you would fetch user notification settings from the backend
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
            console.log('Saving notification settings:', settings);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setHasChanges(false);
        } catch (error) {
            console.error('Error saving notification settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetSettings = () => {
        setSettings({
            emailNewVideos: true,
            emailComments: true,
            emailLikes: false,
            emailSubscriptions: true,
            emailWeeklyDigest: true,
            emailPromotional: false,
            pushNewVideos: true,
            pushComments: true,
            pushLikes: false,
            pushSubscriptions: true,
            pushLiveStreams: true,
            inAppComments: true,
            inAppLikes: true,
            inAppSubscriptions: true,
            inAppMentions: true,
            digestFrequency: 'weekly',
            quietHoursEnabled: false,
            quietHoursStart: '22:00',
            quietHoursEnd: '08:00'
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

    const SelectField = ({ value, onChange, options, label, description }) => (
        <div className="py-3">
            <label className="block text-white font-medium mb-2">{label}</label>
            {description && (
                <p className="text-sm text-gray-400 mb-3">{description}</p>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    const TimeInput = ({ value, onChange, label }) => (
        <div className="flex-1">
            <label className="block text-white font-medium mb-2">{label}</label>
            <input
                type="time"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
        </div>
    );

    return (
        <div className="max-w-4xl">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <CiMail size={24} className="text-purple-400" />
                    <h2 className="text-xl font-semibold">Email Notifications</h2>
                </div>
                
                <ToggleSwitch
                    enabled={settings.emailNewVideos}
                    onChange={(value) => handleSettingChange('emailNewVideos', value)}
                    label="New Videos from Subscriptions"
                    description="Get notified when channels you subscribe to upload new videos"
                />
                
                <ToggleSwitch
                    enabled={settings.emailComments}
                    onChange={(value) => handleSettingChange('emailComments', value)}
                    label="Comments on Your Videos"
                    description="Get notified when someone comments on your videos"
                />
                
                <ToggleSwitch
                    enabled={settings.emailLikes}
                    onChange={(value) => handleSettingChange('emailLikes', value)}
                    label="Likes on Your Videos"
                    description="Get notified when someone likes your videos"
                />
                
                <ToggleSwitch
                    enabled={settings.emailSubscriptions}
                    onChange={(value) => handleSettingChange('emailSubscriptions', value)}
                    label="New Subscribers"
                    description="Get notified when someone subscribes to your channel"
                />
                
                <ToggleSwitch
                    enabled={settings.emailWeeklyDigest}
                    onChange={(value) => handleSettingChange('emailWeeklyDigest', value)}
                    label="Weekly Digest"
                    description="Get a weekly summary of your channel activity"
                />
                
                <ToggleSwitch
                    enabled={settings.emailPromotional}
                    onChange={(value) => handleSettingChange('emailPromotional', value)}
                    label="Promotional Emails"
                    description="Receive updates about new features and promotions"
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <CiMobile1 size={24} className="text-purple-400" />
                    <h2 className="text-xl font-semibold">Push Notifications</h2>
                </div>
                
                <ToggleSwitch
                    enabled={settings.pushNewVideos}
                    onChange={(value) => handleSettingChange('pushNewVideos', value)}
                    label="New Videos from Subscriptions"
                    description="Get push notifications for new videos from subscribed channels"
                />
                
                <ToggleSwitch
                    enabled={settings.pushComments}
                    onChange={(value) => handleSettingChange('pushComments', value)}
                    label="Comments on Your Videos"
                    description="Get push notifications for new comments"
                />
                
                <ToggleSwitch
                    enabled={settings.pushLikes}
                    onChange={(value) => handleSettingChange('pushLikes', value)}
                    label="Likes on Your Videos"
                    description="Get push notifications when someone likes your videos"
                />
                
                <ToggleSwitch
                    enabled={settings.pushSubscriptions}
                    onChange={(value) => handleSettingChange('pushSubscriptions', value)}
                    label="New Subscribers"
                    description="Get push notifications for new subscribers"
                />
                
                <ToggleSwitch
                    enabled={settings.pushLiveStreams}
                    onChange={(value) => handleSettingChange('pushLiveStreams', value)}
                    label="Live Streams"
                    description="Get notified when subscribed channels go live"
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <CiBellOn size={24} className="text-purple-400" />
                    <h2 className="text-xl font-semibold">In-App Notifications</h2>
                </div>
                
                <ToggleSwitch
                    enabled={settings.inAppComments}
                    onChange={(value) => handleSettingChange('inAppComments', value)}
                    label="Comments"
                    description="Show in-app notifications for comments"
                />
                
                <ToggleSwitch
                    enabled={settings.inAppLikes}
                    onChange={(value) => handleSettingChange('inAppLikes', value)}
                    label="Likes"
                    description="Show in-app notifications for likes"
                />
                
                <ToggleSwitch
                    enabled={settings.inAppSubscriptions}
                    onChange={(value) => handleSettingChange('inAppSubscriptions', value)}
                    label="Subscriptions"
                    description="Show in-app notifications for new subscribers"
                />
                
                <ToggleSwitch
                    enabled={settings.inAppMentions}
                    onChange={(value) => handleSettingChange('inAppMentions', value)}
                    label="Mentions"
                    description="Show in-app notifications when you're mentioned"
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                
                <SelectField
                    value={settings.digestFrequency}
                    onChange={(value) => handleSettingChange('digestFrequency', value)}
                    label="Digest Frequency"
                    description="How often you want to receive digest emails"
                    options={[
                        { value: 'daily', label: 'Daily' },
                        { value: 'weekly', label: 'Weekly' },
                        { value: 'monthly', label: 'Monthly' },
                        { value: 'never', label: 'Never' }
                    ]}
                />
                
                <div className="border-t border-gray-700 mt-4 pt-4">
                    <ToggleSwitch
                        enabled={settings.quietHoursEnabled}
                        onChange={(value) => handleSettingChange('quietHoursEnabled', value)}
                        label="Enable Quiet Hours"
                        description="Pause notifications during specified hours"
                    />
                    
                    {settings.quietHoursEnabled && (
                        <div className="mt-4 flex gap-4">
                            <TimeInput
                                value={settings.quietHoursStart}
                                onChange={(value) => handleSettingChange('quietHoursStart', value)}
                                label="Start Time"
                            />
                            <TimeInput
                                value={settings.quietHoursEnd}
                                onChange={(value) => handleSettingChange('quietHoursEnd', value)}
                                label="End Time"
                            />
                        </div>
                    )}
                </div>
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

export default NotificationSettings;