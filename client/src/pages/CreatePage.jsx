import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

import { ArrowLeftIcon } from 'lucide-react';
import { toast } from "react-hot-toast";

import api from "../lib/api.js";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required!");
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/notes", { title, content });
            toast.success("Note created successfully !");
            navigate("/notes");
        }
        catch (err) {
            if (err.response.status === 429) {
                toast.error("Slow down! You're creating notes too fast !");
            }
            else {
                toast.error("Failed to create note !", { icon: "💀" });
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
                <div className="mb-8">

                    <Link to={"/notes"} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group mb-8">
                        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Notes
                    </Link>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                        <div className="p-6 md:p-10">

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                              Create New Note
                            </h2>
                            <form onSubmit={handleSubmit}>

                                <div className="mb-6 md:mb-8">
                                    <label htmlFor="title" className="block mb-3">
                                        <span className="text-sm md:text-base font-semibold text-gray-700">Title</span>
                                    </label>
                                    <input type="text"
                                        placeholder="Enter your note title..."
                                        id="title"
                                        name="tile"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                        className="w-full px-4 md:px-5 py-3 md:py-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>

                                <div className="mb-8 md:mb-10">
                                    <label htmlFor="content" className="block mb-3">
                                        <span className="text-sm md:text-base font-semibold text-gray-700">Content</span>
                                    </label>
                                    <textarea
                                        placeholder="Write your notes here..."
                                        id="content"
                                        name="content"
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                        }}
                                        rows="12"
                                        className="w-full px-4 md:px-5 py-3 md:py-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button disabled={isLoading} className="flex-1 px-6 md:px-8 py-3 md:py-4 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 active:scale-95">
                                        {isLoading ? "Creating..." : "Create Note"}
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreatePage