import jwt from 'jsonwebtoken';

export const decodeAndVerifyJwtToken = (
  token: string | undefined,
): string | undefined => {
  if (!token) return;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    if (typeof decoded === 'string') return;
    return decoded.id;
  } catch (e) {
    console.error(e);
    return;
  }
};
