import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NoNotes = () => {
    return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-50 to-violet-50 mb-6 shadow-lg">
                    <NotebookIcon className="w-10 h-10 md:w-12 md:h-12 text-violet-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  No notes yet
                </h3>
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                    Ready to organize your thoughts? Create your first note to get started on your journey.
                </p>
                <Link to="/notes/create" className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95">
                    Create Your First Note
                </Link>
            </div>
        </div>
    );
};
export default NoNotes;