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
            <div >
                <LoaderIcon />
            </div>
        );
    }

    return (
        <div  >
            <div >
                <div >
                    <div >
                        <Link to="/notes" >
                            <ArrowLeftIcon />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} >
                            <Trash2Icon />
                            Delete Note
                        </button>
                    </div>

                    <div >
                        <div >
                            <div >
                                <label >
                                    <span >Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered"
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />
                            </div>

                            <div >
                                <label >
                                    <span >Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    value={note.content}
                                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                            </div>

                            <div >
                                <button disabled={isSaving} onClick={handleSave}>
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