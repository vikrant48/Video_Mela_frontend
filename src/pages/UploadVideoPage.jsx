import { UploadVideo } from "../components";
import { useNavigate } from "react-router-dom";

function UploadVideoPage() {
    const navigate = useNavigate();

    const handleCloseUpload = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <div className="min-h-screen bg-black">
            <UploadVideo setUploadVideoPopup={handleCloseUpload} />
        </div>
    );
}

export default UploadVideoPage;