const uploadImg = (req, res, next) => {
  if (!req.file && !req.files) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.files });
};

module.exports = uploadImg;
