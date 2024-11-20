import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export const verifyJwt = (
  req,
  res,
  next
) => {
  const token = req.headers.authorization?.split(' ')[1];
  req.session = { user: null };

  try {
    const data = jwt.verify(token, jwtSecret);
    req.session.user = data;
  } catch { }

  next()
};