import { motion } from "framer-motion";
import SeoHead from "@/components/seo/SeoHead";

export default function TermsOfService() {
    return (
        <>
            <SeoHead
                title="Terms of Service - ZeengoCorp"
                description="Terms and Conditions for using ZeengoCorp Innovations Pvt. Ltd. services and website."
            />
            <div className="bg-black text-white min-h-screen py-32">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                        <p className="text-gray-400 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                            <p>
                                Welcome to ZeengoCorp Innovations Pvt. Ltd. These terms and conditions outline the rules and regulations for the use of ZeengoCorp's Website.By accessing this website we assume you accept these terms and conditions. Do not continue to use ZeengoCorp if you do not agree to take all of the terms and conditions stated on this page.
                            </p>

                            <h3>1. Intellectual Property Rights</h3>
                            <p>
                                Other than the content you own, under these Terms, ZeengoCorp and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
                            </p>

                            <h3>2. Restrictions</h3>
                            <p>
                                You are specifically restricted from all of the following:
                            </p>
                            <ul>
                                <li>Publishing any Website material in any other media;</li>
                                <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
                                <li>Publicly performing and/or showing any Website material;</li>
                                <li>Using this Website in any way that is or may be damaging to this Website;</li>
                                <li>Using this Website in any way that impacts user access to this Website;</li>
                            </ul>

                            <h3>3. No Warranties</h3>
                            <p>
                                This Website is provided "as is," with all faults, and ZeengoCorp express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
                            </p>

                            <h3>4. Limitation of Liability</h3>
                            <p>
                                In no event shall ZeengoCorp, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  ZeengoCorp, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                            </p>

                            <h3>5. Governing Law & Jurisdiction</h3>
                            <p>
                                These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in New Delhi, India for the resolution of any disputes.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
