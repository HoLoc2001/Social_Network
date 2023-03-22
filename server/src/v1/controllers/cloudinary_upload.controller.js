const uploadImg = (req, res, next) => {
  if (!req.file && !req.files) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ urlImages: req.files });
};

module.exports = uploadImg;
