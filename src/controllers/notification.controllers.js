import { asyncHandler } from "../utils/asyncHandler.js";

const getNotifications = asyncHandler (async (req, res) => {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("actor", "username avatarUrl")
      .populate("post", "imageUrl");

    res.status(200).json(
        { message: "Notifications fetched successfully", notifications }
    )
})

const markRead = asyncHandler (async (req, res) => {
    const { id } = req.params;
    const notif = await Notification.findOne({ _id: id, user: req.user._id });
    if (!notif) {
      res.status(404);
      return next(new Error("Notification not found"));
    }
    notif.isRead = true;
    await notif.save();
    res.status(200).json(
        { message: "Notification marked as read" }
    )

})

export { getNotifications, markRead };