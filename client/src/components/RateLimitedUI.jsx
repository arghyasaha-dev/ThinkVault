import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 md:p-8">

                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-50 to-red-50 mb-6 mx-auto shadow-lg">
                        <ZapIcon className="w-8 h-8 md:w-10 md:h-10 text-orange-600 animate-pulse" />
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Rate Limit Reached</h3>
                        <p className="text-gray-600 text-sm md:text-base mb-3 leading-relaxed">
                            You've made too many requests in a short period. Please wait a moment.
                        </p>
                        <p className="text-gray-500 text-xs md:text-sm font-medium">
                            Try again in a few seconds for the best experience.
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default RateLimitedUI;