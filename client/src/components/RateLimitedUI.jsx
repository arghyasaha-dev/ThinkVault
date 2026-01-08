import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
    return (
        <div>
            <div>
                <div>

                    <div >
                        <ZapIcon />
                    </div>

                    <div >
                        <h3>Rate Limit Reached</h3>
                        <p >
                            You've made too many requests in a short period. Please wait a
                            moment.
                        </p>
                        <p >
                            Try again in a few seconds for the best experience.
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default RateLimitedUI;