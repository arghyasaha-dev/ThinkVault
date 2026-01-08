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
        <div>
            <div>
                <div>

                    <Link to={"/notes"}>
                        <ArrowLeftIcon />
                        Back to Notes
                    </Link>

                    <div>
                        <div>

                            <h2>Create New Note</h2>
                            <form onSubmit={handleSubmit}>

                                <div>
                                    <label htmlFor="title">
                                        <span>Title</span>
                                    </label>
                                    <input type="text"
                                        placeholder="Note Title"
                                        id="title"
                                        name="tile"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }} />
                                </div>

                                <div>
                                    <label htmlFor="content">
                                        <span>Content</span>
                                    </label>
                                    <textarea
                                        placeholder="Write your notes here ..."
                                        id="content"
                                        name="content"
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                        }} />
                                </div>

                                <div>
                                    <button disabled={isLoading}>
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