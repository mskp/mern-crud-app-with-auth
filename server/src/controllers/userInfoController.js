import User from "../models/User.js";

export async function getUserInfoController(req, res) {
  try {
    const userId = req.user.id;

    const userInfo = await User.findOne({ _id: userId }).select({
      _id: 0,
      fullName: 1,
      email: 1,
      age: 1,
      location: 1,
    });

    if (userInfo) return res.json(userInfo);

    res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateUserInfoController(req, res) {
  try {
    const userId = req.user.id;
    const { fullName, age, location, email } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { fullName, age, location },
      { new: true }
    ).select({
      _id: 0,
      fullName: 1,
      email: 1,
      age: 1,
      location: 1,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteUserInfoController(req, res) {
  try {
    const userId = req.user.id;

    await User.deleteOne({ _id: userId });

    res.status(204).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
