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
        <div>
            <Navbar />
            {isRateLimited && <RateLimitedUI />}
            <div>
                {isLoading && <div>Loading notes ...</div>}

                {notes.length === 0 && !isRateLimited && <NoNotes />}

                {notes.length > 0 && !isRateLimited && (
                    <div>
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