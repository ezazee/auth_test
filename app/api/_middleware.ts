import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    return decoded;
  } catch (error) {
    return null;
  }
};

const isAuthenticated = (req: NextApiRequest) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return false;
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return false;
  }

  return true;
};

const middleware =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return handler(req, res);
  };

export default middleware;
