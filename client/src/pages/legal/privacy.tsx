import { motion } from "framer-motion";
import SeoHead from "@/components/seo/SeoHead";

export default function PrivacyPolicy() {
    return (
        <>
            <SeoHead
                title="Privacy Policy - ZeengoCorp"
                description="Privacy Policy for ZeengoCorp Innovations Pvt. Ltd. How we collect, use, and protect your data."
            />
            <div className="bg-black text-white min-h-screen py-32">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                        <p className="text-gray-400 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                            <p>
                                At ZeengoCorp Innovations Pvt. Ltd. ("ZeengoCorp", "we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                            </p>

                            <h3>1. Information We Collect</h3>
                            <p>
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                            </p>
                            <ul>
                                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                            </ul>

                            <h3>2. How We Use Your Personal Data</h3>
                            <p>
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            </p>
                            <ul>
                                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                <li>Where we need to comply with a legal or regulatory obligation.</li>
                            </ul>

                            <h3>3. Data Security</h3>
                            <p>
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                            </p>

                            <h3>4. Contact Us</h3>
                            <p>
                                If you have any questions about this privacy policy or our privacy practices, please contact us at: <br />
                                <strong>Email:</strong> Contact@ZeengoCorp.com <br />
                                <strong>Phone:</strong> +91 7011260590
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
