const bcrypt = require("bcrypt");
const mongooseUser = require("../models/user");
const logger = require("../utils/logger");

async function createUser(userParams) {
  const { username, email, password } = userParams;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new mongooseUser({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    logger.info(`User created successfully: ${username} (${email})`);

    // Başarı durumunda kullanıcıyı döner
    return { success: true };
  } catch (error) {
    if (error.code === 11000) {
      logger.error("Duplicate key error - Email already exists", { email });
      return { success: false, status: 400, message: "Email already exists" };
    } else {
      logger.error("Error creating user", { error: error.message });
      return {
        success: false,
        status: 500,
        message: "An error occurred while creating the user",
      };
    }
  }
}

async function getUser(userParams) {
  const { id } = userParams;

  try {
    const user = await mongooseUser.findById(id);
    if (user) {
      logger.info(`User retrieved: ${user.username} (${user.email})`);
      return user;
    } else {
      logger.warn(`User not found with id: ${id}`);
      return null;
    }
  } catch (e) {
    logger.error("Error fetching user", { error: e.message });
    return false;
  }
}

async function getAllUser() {
  try {
    const users = await mongooseUser.find();
    logger.info(`Users retrieved: ${users.length} users`);
    return users;
  } catch (e) {
    logger.error("Error fetching users", { error: e.message });
    return false;
  }
}

async function updateUser(userParams) {
  const { id, email } = userParams;
  
  try {
    const user = await mongooseUser.findById(id);
    if (user) {
      user.email = email;
      const updatedUser = await user.save();
      logger.info(
        `User updated: ${updatedUser.username} (${updatedUser.email})`
      );
      return updatedUser;
    } else {
      logger.warn(`User not found for update with id: ${id}`);
      return null;
    }
  } catch (e) {
    logger.error("Error updating user", { error: e.message });
    return false;
  }
}

async function deleteUser(userParams) {
  const { id } = userParams;

  try {
    const userDelete = await mongooseUser.findByIdAndDelete(id);
    if (userDelete) {
      logger.info(`User deleted: ${userDelete.username} (${userDelete.email})`);
      return userDelete;
    } else {
      logger.warn(`User not found for deletion with id: ${id}`);
      return null;
    }
  } catch (e) {
    logger.error("Error deleting user", { error: e.message });
    return false;
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
};
