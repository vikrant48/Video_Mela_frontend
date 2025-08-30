import { useState, useEffect } from 'react';
import { Container } from '../components';
import { BiTime, BiFlag, BiCheck, BiX, BiRefresh } from 'react-icons/bi';
import { MdOutlineReport, MdOutlineVideoLibrary } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';

function ReportHistory() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Mock data for demonstration
    useEffect(() => {
        const mockReports = [
            {
                id: 1,
                type: 'video',
                title: 'Inappropriate Content in Gaming Video',
                targetTitle: 'Epic Gaming Moments #47',
                targetUser: 'GamerPro123',
                reason: 'Inappropriate content',
                description: 'Video contains offensive language and inappropriate behavior that violates community guidelines.',
                status: 'under_review',
                submittedAt: '2024-01-15T10:30:00Z',
                updatedAt: '2024-01-16T14:20:00Z',
                response: null
            },
            {
                id: 2,
                type: 'user',
                title: 'Harassment Report',
                targetTitle: null,
                targetUser: 'ToxicUser456',
                reason: 'Harassment',
                description: 'User has been sending threatening messages and harassing comments on multiple videos.',
                status: 'resolved',
                submittedAt: '2024-01-10T16:45:00Z',
                updatedAt: '2024-01-12T09:15:00Z',
                response: 'Thank you for your report. We have reviewed the user\'s behavior and taken appropriate action including a temporary suspension.'
            },
            {
                id: 3,
                type: 'video',
                title: 'Copyright Violation',
                targetTitle: 'Music Mix 2024',
                targetUser: 'MusicLover88',
                reason: 'Copyright infringement',
                description: 'Video uses copyrighted music without proper licensing or attribution.',
                status: 'rejected',
                submittedAt: '2024-01-08T12:20:00Z',
                updatedAt: '2024-01-09T11:30:00Z',
                response: 'After review, we found that the content falls under fair use guidelines. The music usage is transformative and within acceptable limits.'
            },
            {
                id: 4,
                type: 'video',
                title: 'Spam Content Report',
                targetTitle: 'CLICK HERE FOR FREE MONEY!!!',
                targetUser: 'SpamAccount999',
                reason: 'Spam',
                description: 'Video is clearly spam content promoting suspicious links and get-rich-quick schemes.',
                status: 'resolved',
                submittedAt: '2024-01-05T08:15:00Z',
                updatedAt: '2024-01-05T14:45:00Z',
                response: 'Report confirmed. The video and associated account have been removed for violating our spam policies.'
            },
            {
                id: 5,
                type: 'user',
                title: 'Impersonation Report',
                targetTitle: null,
                targetUser: 'FakeInfluencer',
                reason: 'Impersonation',
                description: 'User is impersonating a well-known content creator and misleading viewers.',
                status: 'under_review',
                submittedAt: '2024-01-03T19:30:00Z',
                updatedAt: '2024-01-04T10:00:00Z',
                response: null
            }
        ];

        // Simulate API call delay
        setTimeout(() => {
            setReports(mockReports);
            setLoading(false);
        }, 1000);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'under_review':
                return 'bg-yellow-600';
            case 'resolved':
                return 'bg-green-600';
            case 'rejected':
                return 'bg-red-600';
            default:
                return 'bg-gray-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'under_review':
                return <BiTime className="w-4 h-4" />;
            case 'resolved':
                return <BiCheck className="w-4 h-4" />;
            case 'rejected':
                return <BiX className="w-4 h-4" />;
            default:
                return <BiRefresh className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredReports = reports.filter(report => {
        if (filter === 'all') return true;
        return report.status === filter;
    });

    const sortedReports = [...filteredReports].sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.submittedAt) - new Date(a.submittedAt);
        } else {
            return new Date(a.submittedAt) - new Date(b.submittedAt);
        }
    });

    if (loading) {
        return (
            <Container>
                <div className="max-w-6xl mx-auto py-8 px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                        <p className="text-gray-300">Loading your report history...</p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                        <MdOutlineReport className="text-purple-500" />
                        Report History
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Track the status of your submitted reports and view responses from our moderation team.
                    </p>
                </div>

                {/* Filters and Sorting */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filter === 'all'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                All Reports ({reports.length})
                            </button>
                            <button
                                onClick={() => setFilter('under_review')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filter === 'under_review'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                Under Review ({reports.filter(r => r.status === 'under_review').length})
                            </button>
                            <button
                                onClick={() => setFilter('resolved')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filter === 'resolved'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                Resolved ({reports.filter(r => r.status === 'resolved').length})
                            </button>
                            <button
                                onClick={() => setFilter('rejected')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filter === 'rejected'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                Rejected ({reports.filter(r => r.status === 'rejected').length})
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-gray-300 text-sm">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reports List */}
                {sortedReports.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <MdOutlineReport className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {filter === 'all' ? 'No Reports Found' : `No ${filter.replace('_', ' ')} Reports`}
                        </h3>
                        <p className="text-gray-400">
                            {filter === 'all'
                                ? "You haven't submitted any reports yet."
                                : `You don't have any ${filter.replace('_', ' ')} reports.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedReports.map((report) => (
                            <div key={report.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition">
                                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {report.type === 'video' ? (
                                                    <MdOutlineVideoLibrary className="w-6 h-6 text-purple-400 flex-shrink-0" />
                                                ) : (
                                                    <AiOutlineUser className="w-6 h-6 text-purple-400 flex-shrink-0" />
                                                )}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                                                    <p className="text-sm text-gray-400">
                                                        Report #{report.id} • {report.type === 'video' ? 'Video' : 'User'} Report
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(report.status)}`}>
                                                {getStatusIcon(report.status)}
                                                {report.status.replace('_', ' ').toUpperCase()}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">Target:</p>
                                                <p className="text-white font-medium">
                                                    {report.targetTitle || 'User Account'} by @{report.targetUser}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">Reason:</p>
                                                <p className="text-white font-medium">{report.reason}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm text-gray-400 mb-2">Description:</p>
                                            <p className="text-gray-300 text-sm leading-relaxed">{report.description}</p>
                                        </div>

                                        {report.response && (
                                            <div className="bg-gray-700 rounded-lg p-4 mb-4">
                                                <p className="text-sm text-gray-400 mb-2">Response from Moderation Team:</p>
                                                <p className="text-gray-200 text-sm leading-relaxed">{report.response}</p>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-400">
                                            <span>Submitted: {formatDate(report.submittedAt)}</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>Last Updated: {formatDate(report.updatedAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Help Section */}
                <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="text-purple-400 font-medium mb-2">Report Status Meanings:</h4>
                            <ul className="space-y-1 text-gray-300">
                                <li><span className="text-yellow-400">Under Review:</span> Our team is investigating your report</li>
                                <li><span className="text-green-400">Resolved:</span> Action has been taken based on your report</li>
                                <li><span className="text-red-400">Rejected:</span> No violation found after review</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-purple-400 font-medium mb-2">Questions?</h4>
                            <p className="text-gray-300 mb-2">
                                If you have questions about a specific report or need to provide additional information, 
                                please contact our support team.
                            </p>
                            <p className="text-gray-400">Email: reports@videomela.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ReportHistory;