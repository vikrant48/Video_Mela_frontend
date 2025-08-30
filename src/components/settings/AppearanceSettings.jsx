import { useState, useEffect } from "react";
import { Button } from "../index";
import { useSelector } from "react-redux";
import { CiPalette, CiGlobe, CiMonitor, CiSun, CiCloudMoon } from "react-icons/ci";

function AppearanceSettings() {
    const auth = useSelector((state) => state.auth?.userData);
    const [settings, setSettings] = useState({
        // Theme Settings
        theme: 'dark', // 'light', 'dark', 'auto'
        accentColor: 'purple', // 'purple', 'blue', 'green', 'red', 'orange'
        
        // Language Settings
        language: 'en', // 'en', 'es', 'fr', 'de', 'hi', 'ja', 'ko'
        dateFormat: 'MM/DD/YYYY', // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'
        timeFormat: '12', // '12', '24'
        
        // Display Settings
        fontSize: 'medium', // 'small', 'medium', 'large'
        videoQuality: 'auto', // 'auto', '144p', '240p', '360p', '480p', '720p', '1080p'
        autoplay: true,
        showThumbnails: true,
        reducedMotion: false,
        highContrast: false,
        
        // Layout Settings
        sidebarCollapsed: false,
        compactMode: false,
        showVideoProgress: true,
        showChannelAvatars: true
    });
    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // In a real app, you would fetch user appearance settings from the backend
        // For now, we'll use default values or localStorage
        const savedSettings = localStorage.getItem('appearanceSettings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings(prev => ({ ...prev, ...parsed }));
            } catch (error) {
                console.error('Error parsing saved appearance settings:', error);
            }
        }
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
            // Save to localStorage for demo purposes
            localStorage.setItem('appearanceSettings', JSON.stringify(settings));
            
            // In a real app, you would send these settings to the backend
            console.log('Saving appearance settings:', settings);
            
            // Apply theme changes immediately
            applyThemeChanges();
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setHasChanges(false);
        } catch (error) {
            console.error('Error saving appearance settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyThemeChanges = () => {
        // Apply theme to document root
        const root = document.documentElement;
        
        // Apply theme class
        root.className = root.className.replace(/theme-\w+/g, '');
        root.classList.add(`theme-${settings.theme}`);
        
        // Apply accent color
        root.className = root.className.replace(/accent-\w+/g, '');
        root.classList.add(`accent-${settings.accentColor}`);
        
        // Apply font size
        root.className = root.className.replace(/font-size-\w+/g, '');
        root.classList.add(`font-size-${settings.fontSize}`);
        
        // Apply accessibility settings
        if (settings.reducedMotion) {
            root.classList.add('reduced-motion');
        } else {
            root.classList.remove('reduced-motion');
        }
        
        if (settings.highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }
    };

    const resetSettings = () => {
        const defaultSettings = {
            theme: 'dark',
            accentColor: 'purple',
            language: 'en',
            dateFormat: 'MM/DD/YYYY',
            timeFormat: '12',
            fontSize: 'medium',
            videoQuality: 'auto',
            autoplay: true,
            showThumbnails: true,
            reducedMotion: false,
            highContrast: false,
            sidebarCollapsed: false,
            compactMode: false,
            showVideoProgress: true,
            showChannelAvatars: true
        };
        setSettings(defaultSettings);
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
                className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full max-w-xs"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    const ColorPicker = ({ value, onChange, colors, label }) => (
        <div className="py-3">
            <label className="block text-white font-medium mb-3">{label}</label>
            <div className="flex gap-3 flex-wrap">
                {colors.map((color) => (
                    <button
                        key={color.value}
                        type="button"
                        onClick={() => onChange(color.value)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                            value === color.value
                                ? 'border-white scale-110'
                                : 'border-gray-600 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.color }}
                        title={color.label}
                    />
                ))}
            </div>
        </div>
    );

    const themeOptions = [
        { value: 'light', label: 'Light', icon: CiSun },
        { value: 'dark', label: 'Dark', icon: CiCloudMoon },
        { value: 'auto', label: 'Auto (System)', icon: CiMonitor }
    ];

    const accentColors = [
        { value: 'purple', label: 'Purple', color: '#8B5CF6' },
        { value: 'blue', label: 'Blue', color: '#3B82F6' },
        { value: 'green', label: 'Green', color: '#10B981' },
        { value: 'red', label: 'Red', color: '#EF4444' },
        { value: 'orange', label: 'Orange', color: '#F97316' },
        { value: 'pink', label: 'Pink', color: '#EC4899' }
    ];

    return (
        <div className="max-w-4xl">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <CiPalette size={24} className="text-purple-400" />
                    <h2 className="text-xl font-semibold">Theme & Colors</h2>
                </div>
                
                <div className="py-3">
                    <label className="block text-white font-medium mb-3">Theme</label>
                    <div className="grid grid-cols-3 gap-3 max-w-md">
                        {themeOptions.map((option) => {
                            const IconComponent = option.icon;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSettingChange('theme', option.value)}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                                        settings.theme === option.value
                                            ? 'border-purple-500 bg-purple-500/10'
                                            : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                >
                                    <IconComponent size={24} />
                                    <span className="text-sm">{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                <ColorPicker
                    value={settings.accentColor}
                    onChange={(value) => handleSettingChange('accentColor', value)}
                    colors={accentColors}
                    label="Accent Color"
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <CiGlobe size={24} className="text-purple-400" />
                    <h2 className="text-xl font-semibold">Language & Region</h2>
                </div>
                
                <SelectField
                    value={settings.language}
                    onChange={(value) => handleSettingChange('language', value)}
                    label="Language"
                    description="Choose your preferred language"
                    options={[
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Español' },
                        { value: 'fr', label: 'Français' },
                        { value: 'de', label: 'Deutsch' },
                        { value: 'hi', label: 'हिन्दी' },
                        { value: 'ja', label: '日本語' },
                        { value: 'ko', label: '한국어' }
                    ]}
                />
                
                <SelectField
                    value={settings.dateFormat}
                    onChange={(value) => handleSettingChange('dateFormat', value)}
                    label="Date Format"
                    options={[
                        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
                        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)' },
                        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' }
                    ]}
                />
                
                <SelectField
                    value={settings.timeFormat}
                    onChange={(value) => handleSettingChange('timeFormat', value)}
                    label="Time Format"
                    options={[
                        { value: '12', label: '12-hour (AM/PM)' },
                        { value: '24', label: '24-hour' }
                    ]}
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <CiMonitor size={24} className="text-purple-400" />
                    <h2 className="text-xl font-semibold">Display Settings</h2>
                </div>
                
                <SelectField
                    value={settings.fontSize}
                    onChange={(value) => handleSettingChange('fontSize', value)}
                    label="Font Size"
                    description="Adjust the size of text throughout the app"
                    options={[
                        { value: 'small', label: 'Small' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'large', label: 'Large' }
                    ]}
                />
                
                <SelectField
                    value={settings.videoQuality}
                    onChange={(value) => handleSettingChange('videoQuality', value)}
                    label="Default Video Quality"
                    description="Choose the default quality for video playback"
                    options={[
                        { value: 'auto', label: 'Auto (Recommended)' },
                        { value: '144p', label: '144p' },
                        { value: '240p', label: '240p' },
                        { value: '360p', label: '360p' },
                        { value: '480p', label: '480p' },
                        { value: '720p', label: '720p (HD)' },
                        { value: '1080p', label: '1080p (Full HD)' }
                    ]}
                />
                
                <ToggleSwitch
                    enabled={settings.autoplay}
                    onChange={(value) => handleSettingChange('autoplay', value)}
                    label="Autoplay Videos"
                    description="Automatically play videos when you visit a video page"
                />
                
                <ToggleSwitch
                    enabled={settings.showThumbnails}
                    onChange={(value) => handleSettingChange('showThumbnails', value)}
                    label="Show Video Thumbnails"
                    description="Display thumbnail previews for videos"
                />
                
                <ToggleSwitch
                    enabled={settings.showVideoProgress}
                    onChange={(value) => handleSettingChange('showVideoProgress', value)}
                    label="Show Video Progress"
                    description="Display progress bars on video thumbnails"
                />
                
                <ToggleSwitch
                    enabled={settings.showChannelAvatars}
                    onChange={(value) => handleSettingChange('showChannelAvatars', value)}
                    label="Show Channel Avatars"
                    description="Display channel profile pictures"
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Layout & Navigation</h2>
                
                <ToggleSwitch
                    enabled={settings.sidebarCollapsed}
                    onChange={(value) => handleSettingChange('sidebarCollapsed', value)}
                    label="Collapse Sidebar by Default"
                    description="Start with the sidebar collapsed to save space"
                />
                
                <ToggleSwitch
                    enabled={settings.compactMode}
                    onChange={(value) => handleSettingChange('compactMode', value)}
                    label="Compact Mode"
                    description="Use a more compact layout with smaller elements"
                />
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
                
                <ToggleSwitch
                    enabled={settings.reducedMotion}
                    onChange={(value) => handleSettingChange('reducedMotion', value)}
                    label="Reduce Motion"
                    description="Minimize animations and transitions"
                />
                
                <ToggleSwitch
                    enabled={settings.highContrast}
                    onChange={(value) => handleSettingChange('highContrast', value)}
                    label="High Contrast Mode"
                    description="Increase contrast for better visibility"
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

export default AppearanceSettings;