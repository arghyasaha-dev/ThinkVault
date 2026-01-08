import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NoNotes = () => {
    return (
        <div >
            <div >
                <NotebookIcon />
            </div>
            <h3 >No notes yet</h3>
            <p >
                Ready to organize your thoughts? Create your first note to get started on your journey.
            </p>
            <Link to="/create" >
                Create Your First Note
            </Link>
        </div>
    );
};
export default NoNotes;