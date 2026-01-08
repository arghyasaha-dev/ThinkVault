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
            <div className="group bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-lg border border-gray-200/50 hover:border-violet-300 transition-all duration-300 hover:scale-102 active:scale-98">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors duration-200">
                  {note.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 leading-relaxed">
                  {note.content}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs md:text-sm text-gray-500 font-medium">
                      {formatDate(new Date(note.createdAt))}
                    </span>

                    <div className="flex gap-2 md:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200 active:scale-95">
                            <PenSquareIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button onClick={handleClick} className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-200 active:scale-95">
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard