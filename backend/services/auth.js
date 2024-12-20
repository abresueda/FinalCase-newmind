const bcrypt = require("bcrypt");
const mongooseUser = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

// Custom Error Classes 
class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
    this.statusCode = 401;
  }
}

class InvalidPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidPasswordError";
    this.statusCode = 401;
  }
}

async function login(userParams) {
  const { email, password } = userParams;

  try {
    // Kullanıcıyı email ile bulalım
    const user = await mongooseUser.findOne({ email });

    if (!user) {
      logger.warn(`Failed login attempt for email: ${email}`);
      throw new UserNotFoundError("Invalid username or password");
    }

    // Parola doğrulaması
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(
        `Failed login attempt for email: ${email} - Incorrect password`
      );
      throw new InvalidPasswordError("Invalid username or password");
    }

    // JWT token oluşturulması
    const token = jwt.sign(
      { email: user.email, 
        id: user._id, 
        role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      status: 200,
      message: "Login successful",
      token: token,
      userId: user._id.toString() // Kullanıcı ID'sini frontend'e gönderiyoruz
    };

  } catch (e) {
    if (e instanceof UserNotFoundError || e instanceof InvalidPasswordError) {
      return { status: e.statusCode, message: e.message };
    }

    logger.error(
      `Error during login attempt for email: ${email} - ${e.message}`
    );
    throw new Error("An error occurred during login");
  }
}

module.exports = {
  login,
};
