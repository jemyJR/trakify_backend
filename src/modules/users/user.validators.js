const {
  BadRequestException,
} = require("../../shared/exceptions/http.exceptions");
const {
  validate,
  emailValidatorWithOptional,
  nameValidatorWithOptional,
  passwordValidatorWithOptional,
} = require("../../shared/utils/validators");
const User = require("../users/user.model");

exports.updateUserValidator = [
  nameValidatorWithOptional("name"),
  emailValidatorWithOptional().custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }
    return true;
  }),
  passwordValidatorWithOptional(),
  validate,
];
