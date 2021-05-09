const cookieParser = require("socket.io-cookie-parser");
const jwt = require('jsonwebtoken');
const Message = require('../models/message');

const SocketService = (io, dependencies) => {

    const ConversationRepository = dependencies.ConversationRepository;
    const onlineUsers = new Set();

    io.use(cookieParser());
    io.use((socket, next) => {
        const authToken = socket?.request?.cookies?.authToken;

        if (!authToken) {
            next(new Error('Not authorized'));
        }

        jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return next(new Error('Not authorized'));
            else {
                socket.authData = decoded;
                next();
            }
        });
    });

    io.on('connection', (socket) => {
        console.log("Connected")
        clearRooms(socket);
        const userId = socket?.authData?.user?.id;
        if (!userId)
            return socket.disconnect();

        onlineUsers.add(userId);
        io.emit('onlineUsers', Array.from(onlineUsers));


        socket.on('join', (conversationId) => {
            if (!conversationId)
                return;
            // remove socket from all other joined rooms (conversation)
            clearRooms(socket);

            //join new room (conversation)
            socket.join(conversationId);
        });

        socket.on('message', async (message) => {
            try {
                const roomId = socket.rooms?.values()?.next()?.value;
                if (roomId && message !== '') {
                    const success = await ConversationRepository.addMessage(roomId, new Message(undefined, userId, message))
                    if (success) {
                        io.to(roomId).emit('newMessage', {
                            message: {

                            });
                    }
                }
            }
            catch (error) { console.log(error) }
        });

        socket.on('disconnect', () => {
            console.log('disconnect');
            onlineUsers.delete(userId);
            io.emit('onlineUsers', Array.from(onlineUsers));
        });
    });
}

function clearRooms(socket) {
    socket.rooms.forEach((room, i) => {
        socket.leave(room);
    });
}

module.exports = SocketService;