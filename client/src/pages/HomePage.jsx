import React from 'react'
import { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";

import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import api from "../lib/api.js";
import NoteCard from '../components/NoteCard.jsx';
import NoNotes from "../components/NoNotes.jsx";


const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(res.data);
                setIsRateLimited(false);
            }
            catch (err) {
                console.log("Error fetching data");
                if (err.response.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes !");
                }
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchNotes();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <Navbar />
            {isRateLimited && <RateLimitedUI />}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="inline-flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 border-t-violet-600 rounded-full animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium">Loading notes ...</p>
                  </div>
                )}

                {notes.length === 0 && !isRateLimited && <NoNotes />}

                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {notes.map(ele => {
                            return <NoteCard key={ele._id} note={ele} setNotes={setNotes} />
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage