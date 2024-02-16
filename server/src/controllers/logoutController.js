import User from "../models/User.js";

export default async function logoutController(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(204)
        .json({ message: "Request token not present in cookie" });
    }

    const userId = req.user._id;

    await User.findOneAndUpdate(
      { _id: userId, refreshTokens: { $in: [refreshToken] } },
      { $pull: { refreshTokens: refreshToken } },
      { new: true }
    );

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
}
