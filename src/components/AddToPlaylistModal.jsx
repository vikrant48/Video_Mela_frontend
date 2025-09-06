import React, { useState, useEffect } from "react";
import { IoClose, IoAdd } from "react-icons/io5";
import { MdPlaylistAdd, MdPlaylistPlay } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../helpers/axiosInstance";

function AddToPlaylistModal({ isOpen, onClose, videoId }) {
    const [playlists, setPlaylists] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetchingPlaylists, setFetchingPlaylists] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.userData);

    // Fetch user playlists when modal opens
    useEffect(() => {
        if (isOpen && user?._id) {
            fetchUserPlaylists();
        }
    }, [isOpen, user?._id]);

    const fetchUserPlaylists = async () => {
        setFetchingPlaylists(true);
        try {
            const response = await axiosInstance.get(`/playlist/user/${user._id}`);
            if (response.data.success) {
                // Check which playlists contain this video
                const playlistsWithVideoStatus = response.data.data.map(playlist => ({
                    ...playlist,
                    videosCount: playlist.totalVideos || 0,
                    hasVideo: false // TODO: Check if video is in playlist
                }));
                setPlaylists(playlistsWithVideoStatus);
            }
        } catch (error) {
            console.error("Error fetching playlists:", error);
            setPlaylists([]);
        } finally {
            setFetchingPlaylists(false);
        }
    };

    const handleCreatePlaylist = async () => {
        if (!newPlaylistName.trim()) return;
        
        setLoading(true);
        try {
            const response = await axiosInstance.post('/playlist', {
                name: newPlaylistName,
                description: newPlaylistDescription
            });
            
            if (response.data.success) {
                const newPlaylist = {
                    ...response.data.data,
                    videosCount: 0,
                    hasVideo: false
                };
                
                setPlaylists(prev => [newPlaylist, ...prev]);
                setNewPlaylistName("");
                setNewPlaylistDescription("");
                setShowCreateForm(false);
                
                // Now add the video to the newly created playlist
                await handleAddToPlaylist(newPlaylist._id, newPlaylist.name);
            }
        } catch (error) {
            console.error("Error creating playlist:", error);
            alert("Failed to create playlist. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToPlaylist = async (playlistId, playlistName) => {
        setLoading(true);
        try {
            const response = await axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`);
            
            if (response.data.success) {
                setPlaylists(prev => 
                    prev.map(playlist => 
                        playlist._id === playlistId 
                            ? { ...playlist, hasVideo: true, videosCount: playlist.videosCount + 1 }
                            : playlist
                    )
                );
                
                alert(`Video added to "${playlistName}" playlist!`);
            }
        } catch (error) {
            console.error("Error adding to playlist:", error);
            alert("Failed to add video to playlist. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromPlaylist = async (playlistId, playlistName) => {
        setLoading(true);
        try {
            const response = await axiosInstance.patch(`/playlist/remove/${videoId}/${playlistId}`);
            
            if (response.data.success) {
                setPlaylists(prev => 
                    prev.map(playlist => 
                        playlist._id === playlistId 
                            ? { ...playlist, hasVideo: false, videosCount: Math.max(0, playlist.videosCount - 1) }
                            : playlist
                    )
                );
                
                alert(`Video removed from "${playlistName}" playlist!`);
            }
        } catch (error) {
            console.error("Error removing from playlist:", error);
            alert("Failed to remove video from playlist. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                        <MdPlaylistAdd size={24} />
                        Add to Playlist
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-96 overflow-y-auto">
                    {fetchingPlaylists && (
                        <div className="flex items-center justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                            <span className="ml-2 text-gray-400">Loading playlists...</span>
                        </div>
                    )}
                    {/* Create New Playlist Button */}
                    <div className="p-4 border-b border-gray-700">
                        <button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className="flex items-center gap-3 w-full text-left text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
                        >
                            <IoAdd size={20} />
                            <span>Create new playlist</span>
                        </button>
                    </div>

                    {/* Create Playlist Form */}
                    {showCreateForm && (
                        <div className="p-4 border-b border-gray-700 bg-gray-900">
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Playlist name"
                                    value={newPlaylistName}
                                    onChange={(e) => setNewPlaylistName(e.target.value)}
                                    className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                                />
                                <textarea
                                    placeholder="Description (optional)"
                                    value={newPlaylistDescription}
                                    onChange={(e) => setNewPlaylistDescription(e.target.value)}
                                    className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none h-20 resize-none"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCreatePlaylist}
                                        disabled={!newPlaylistName.trim() || loading}
                                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {loading ? "Creating..." : "Create"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowCreateForm(false);
                                            setNewPlaylistName("");
                                            setNewPlaylistDescription("");
                                        }}
                                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Existing Playlists */}
                    {!fetchingPlaylists && (
                        <div className="p-4">
                            {playlists.length === 0 ? (
                                <div className="text-gray-400 text-center py-8">
                                    <MdPlaylistPlay size={48} className="mx-auto mb-2 opacity-50" />
                                    <p>No playlists found</p>
                                    <p className="text-sm">Create your first playlist above</p>
                                </div>
                            ) : (
                            <div className="space-y-2">
                                {playlists.map((playlist) => (
                                    <div
                                        key={playlist._id}
                                        className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <MdPlaylistPlay size={20} className="text-gray-400" />
                                            <div>
                                                <p className="text-white font-medium">{playlist.name}</p>
                                                <p className="text-gray-400 text-sm">{playlist.videosCount || playlist.totalVideos || 0} videos</p>
                                                {playlist.description && (
                                                    <p className="text-gray-500 text-xs truncate max-w-48">{playlist.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => 
                                                playlist.hasVideo 
                                                    ? handleRemoveFromPlaylist(playlist._id, playlist.name)
                                                    : handleAddToPlaylist(playlist._id, playlist.name)
                                            }
                                            disabled={loading}
                                            className={`px-3 py-1 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
                                                playlist.hasVideo
                                                    ? "bg-green-600 text-white hover:bg-green-700"
                                                    : "bg-gray-600 text-white hover:bg-gray-700"
                                            }`}
                                        >
                                            {playlist.hasVideo ? "Added" : "Add"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddToPlaylistModal;