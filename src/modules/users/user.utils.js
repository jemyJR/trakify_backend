exports.removeSensitiveInfo = function (user) {
  if (!user) return null;
  const { password, image, ...userWithoutSensitiveInfo } = user.toObject({
    versionKey: false,
  });

  if (image?.url) {
    userWithoutSensitiveInfo.image = image.url;
  } else {
    userWithoutSensitiveInfo.image = null;
  }

  return userWithoutSensitiveInfo;
};
