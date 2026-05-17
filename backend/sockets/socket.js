module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Room join logic
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their personal room`);
    });

    // Chat events
    socket.on("sendMessage", (data) => {
      // Expecting data: { senderId, receiverId, message, timestamp }
      io.to(data.receiverId).emit("receiveMessage", data);
    });

    socket.on("typing", (data) => {
      io.to(data.receiverId).emit("typing", { senderId: data.senderId });
    });

    socket.on("stopTyping", (data) => {
      io.to(data.receiverId).emit("stopTyping", { senderId: data.senderId });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
