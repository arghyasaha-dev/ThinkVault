import React from 'react'
import { PenSquareIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from "react-hot-toast";

import formatDate from "../lib/formatDate.js";
import api from "../lib/api.js";

const NoteCard = ({ note, setNotes }) => {

    const handleClick = async (e) => {
        e.preventDefault(); //prevents the default redirect to note show page on click 
        if (!window.confirm("Do you want to delete ?")) return; // Browser level confirmation from user to delete 
        await api.delete(`/notes/${note._id}`);
        //changing setNotes hook so that component in page is re-rendered with/without redirect  
        setNotes(prevNotes =>
            prevNotes.filter(n => n._id !== note._id)
        );
        toast.success("Successfully deleted note");
    }

    return (
        <Link to={`/notes/${note._id}`}>
            <div>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <div>
                    <span>{formatDate(new Date(note.createdAt))}</span>

                    <div>
                        <button >
                            <PenSquareIcon />
                        </button>
                        <button onClick={handleClick}>
                            <Trash2 />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard