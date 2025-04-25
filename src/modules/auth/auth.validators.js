const {
  BadRequestException,
} = require("../../shared/exceptions/http.exceptions");
const {
  emailValidator,
  nameValidator,
  validate,
  passwordValidator,
} = require("../../shared/utils/validators");
const User = require("../users/user.model");

exports.registerValidator = [
  nameValidator("name"),
  emailValidator().custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }
    return true;
  }),
  passwordValidator(),
  validate,
];

exports.loginValidator = [emailValidator(), passwordValidator(), validate];

exports.changePasswordValidator = [
  passwordValidator("oldPassword"),
  passwordValidator("newPassword"),
  validate,
];
