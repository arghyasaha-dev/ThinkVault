import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/api.js";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const ShowAndUpdatePage = () => {
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (err) {
                if (err.response.status === 429) {
                    toast.error("Slow down! You're fetching notes too fast !");
                }
                else {
                    toast.error("Failed to fetch note !", { icon: "💀" });
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted");
            navigate("/notes");
        } catch (error) {
            toast.error("Failed to delete note");
        }
    };

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }

        setIsSaving(true);

        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully");
            navigate("/notes");
        } catch (error) {
            toast.error("Failed to update note");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <LoaderIcon className="w-12 h-12 md:w-16 md:h-16 text-violet-600 animate-spin" />
                    <p className="text-gray-600 font-medium">Loading note...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
                        <Link to="/notes" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group w-fit">
                            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-all duration-200 hover:scale-105 active:scale-95 w-full md:w-auto justify-center md:justify-start">
                            <Trash2Icon className="w-5 h-5" />
                            Delete Note
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                        <div className="p-6 md:p-10">
                            <div className="mb-8 md:mb-10">
                                <label className="block mb-3">
                                    <span className="text-sm md:text-base font-semibold text-gray-700">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter note title..."
                                    className="w-full px-4 md:px-5 py-3 md:py-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />
                            </div>

                            <div className="mb-8 md:mb-10">
                                <label className="block mb-3">
                                    <span className="text-sm md:text-base font-semibold text-gray-700">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="w-full px-4 md:px-5 py-3 md:py-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none"
                                    rows="12"
                                    value={note.content}
                                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4">
                                <button disabled={isSaving} onClick={handleSave} className="flex-1 px-6 md:px-8 py-3 md:py-4 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 active:scale-95">
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ShowAndUpdatePage;