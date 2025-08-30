import { AiOutlineQuestionCircle, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import Container from "../components/Container";

function Help() {
    const faqData = [
        {
            question: "How do I upload a video?",
            answer: "To upload a video, click on the camera icon in the navigation bar, select your video file, add a title and description, and click 'Upload'. Make sure your video is in a supported format (MP4, AVI, MOV)."
        },
        {
            question: "How do I create an account?",
            answer: "Click on the 'Sign Up' button in the top right corner, fill in your details including username, email, and password, then verify your email address to activate your account."
        },
        {
            question: "How do I subscribe to a channel?",
            answer: "Visit any channel page and click the 'Subscribe' button. You can manage your subscriptions from the 'Subscriptions' section in the sidebar."
        },
        {
            question: "How do I change my password?",
            answer: "Go to Settings > Account Settings, then click on 'Change Password'. Enter your current password and your new password to update it."
        },
        {
            question: "How do I delete my account?",
            answer: "Go to Settings > Account Settings and scroll down to find the 'Delete Account' option. Please note that this action is irreversible and will permanently delete all your data."
        },
        {
            question: "What video formats are supported?",
            answer: "We support MP4, AVI, MOV, and WebM formats. For best quality, we recommend uploading in MP4 format with H.264 encoding."
        },
        {
            question: "How do I report inappropriate content?",
            answer: "Click on the three dots menu on any video and select 'Report'. Choose the appropriate reason and provide additional details if necessary."
        },
        {
            question: "How do I customize my channel?",
            answer: "Go to your channel page and click 'Edit Channel'. You can update your channel banner, avatar, description, and other settings from there."
        }
    ];

    const contactMethods = [
        {
            icon: <AiOutlineMail className="text-2xl" />,
            title: "Email Support",
            description: "Get help via email",
            contact: "support@videomela.com",
            action: "mailto:support@videomela.com"
        },
        {
            icon: <FaDiscord className="text-2xl" />,
            title: "Discord Community",
            description: "Join our community",
            contact: "VideoMela Discord",
            action: "#"
        },
        {
            icon: <FaTwitter className="text-2xl" />,
            title: "Twitter Support",
            description: "Follow us for updates",
            contact: "@VideoMela",
            action: "#"
        },
        {
            icon: <AiOutlinePhone className="text-2xl" />,
            title: "Phone Support",
            description: "Call us for urgent issues",
            contact: "+1 (555) 123-4567",
            action: "tel:+15551234567"
        }
    ];

    return (
        <Container>
            <div className="max-w-4xl mx-auto p-6 text-white">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <AiOutlineQuestionCircle className="text-6xl text-purple-500" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
                    <p className="text-gray-300 text-lg">
                        Find answers to common questions or get in touch with our support team
                    </p>
                </div>

                {/* Quick Links */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition">
                        <BiSupport className="text-3xl text-purple-500 mx-auto mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
                        <p className="text-gray-300">Learn the basics of using VideoMela</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition">
                        <AiOutlineQuestionCircle className="text-3xl text-purple-500 mx-auto mb-3" />
                        <h3 className="text-xl font-semibold mb-2">FAQ</h3>
                        <p className="text-gray-300">Frequently asked questions</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition">
                        <AiOutlineMail className="text-3xl text-purple-500 mx-auto mb-3" />
                        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                        <p className="text-gray-300">Get personalized support</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
                                <h3 className="text-xl font-semibold mb-3 text-purple-400">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">Contact Support</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {contactMethods.map((method, index) => (
                            <a
                                key={index}
                                href={method.action}
                                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition flex items-center space-x-4 group"
                            >
                                <div className="text-purple-500 group-hover:text-purple-400 transition">
                                    {method.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">{method.title}</h3>
                                    <p className="text-gray-400 text-sm mb-1">{method.description}</p>
                                    <p className="text-purple-400 font-medium">{method.contact}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
                    <p className="text-gray-300 mb-6">
                        Can&apos;t find what you&apos;re looking for? Our support team is here to help you with any questions or issues.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:support@videomela.com"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Email Support
                        </a>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                            Live Chat
                        </button>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8 text-gray-400">
                    <p>Response time: We typically respond within 24 hours</p>
                </div>
            </div>
        </Container>
    );
}

export default Help;