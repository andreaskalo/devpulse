function requireAuth(req, res, next) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({
      error: {
        code: "NOT_AUTHENTICATED",
        message: "User is not authenticated",
      },
    });
  }
  next();
}

export default requireAuth;
