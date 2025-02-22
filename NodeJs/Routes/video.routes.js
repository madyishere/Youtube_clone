import { deleteVideo, editVideo, getVideo, getVideos, getVideosFromChannel, uploadVideo} from "../Controller/video.controller.js";
import { authenticateUser } from "../Middleware/auth.middleware.js";


function videoRoutes(app) {
    app.get('/videos', getVideos);
    app.post('/videos/upload', authenticateUser, uploadVideo);
    app.get('/videos/:id', getVideo);
    app.get('/video', getVideosFromChannel);
    app.delete('/video/:id', deleteVideo);
    app.put('/video',authenticateUser, editVideo);
}

export default videoRoutes;