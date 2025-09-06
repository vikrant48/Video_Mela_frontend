import { useState } from 'react';
import { Container } from '../components';

function Feedback() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        feedbackType: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                feedbackType: 'general'
            });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Send Feedback
                        </h1>
                        <p className="text-gray-300 text-lg">
                            We value your feedback! Help us improve VideoMela by sharing your thoughts, suggestions, or reporting issues.
                        </p>
                    </div>

                    {submitStatus === 'success' && (
                        <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
                            <h3 className="font-semibold mb-2">Thank you for your feedback!</h3>
                            <p>We&apos;ve received your message and will review it shortly. Your input helps us make VideoMela better for everyone.</p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
                            <h3 className="font-semibold mb-2">Oops! Something went wrong</h3>
                            <p>We couldn&apos;t submit your feedback right now. Please try again later or contact us directly.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-300 mb-2">
                                Feedback Type
                            </label>
                            <select
                                id="feedbackType"
                                name="feedbackType"
                                value={formData.feedbackType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="general">General Feedback</option>
                                <option value="bug">Bug Report</option>
                                <option value="feature">Feature Request</option>
                                <option value="improvement">Improvement Suggestion</option>
                                <option value="complaint">Complaint</option>
                                <option value="compliment">Compliment</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Brief description of your feedback"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                                placeholder="Please provide detailed feedback. Include steps to reproduce if reporting a bug, or describe your suggestion in detail."
                            />
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-white font-semibold mb-2">Privacy Notice</h3>
                            <p className="text-gray-300 text-sm">
                                Your feedback will be used to improve VideoMela. We may contact you for clarification but will not share your information with third parties. 
                                For urgent issues, please contact us directly at support@videomela.com.
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    'Send Feedback'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <h3 className="text-white font-semibold mb-4">Other Ways to Reach Us</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="text-center p-4 bg-gray-700 rounded-lg">
                                <h4 className="text-purple-400 font-semibold mb-2">Email Support</h4>
                                <p className="text-gray-300">support@videomela.com</p>
                                <p className="text-gray-400 text-xs mt-1">Response within 24 hours</p>
                            </div>
                            <div className="text-center p-4 bg-gray-700 rounded-lg">
                                <h4 className="text-purple-400 font-semibold mb-2">Community</h4>
                                <p className="text-gray-300">Join our Discord</p>
                                <p className="text-gray-400 text-xs mt-1">Real-time community support</p>
                            </div>
                            <div className="text-center p-4 bg-gray-700 rounded-lg">
                                <h4 className="text-purple-400 font-semibold mb-2">Social Media</h4>
                                <p className="text-gray-300">@VideoMela</p>
                                <p className="text-gray-400 text-xs mt-1">Follow for updates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Feedback;