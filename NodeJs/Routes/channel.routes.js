import { createChannel, getChannel } from "../Controller/channel.contoller.js";
import { authenticateUser } from "../Middleware/auth.middleware.js";


function channelRoutes(app) {
    app.post('/channel',authenticateUser, createChannel);
    app.get('/channel/:channelId', getChannel);
}

export default channelRoutes;