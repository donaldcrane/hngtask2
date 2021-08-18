import Joi from "joi";

const messageValidation = (User) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk", "co"] }})
      .min(5).max(100).required().empty()
      .messages({
        "any.required": "Sorry, email field is required",
        "string.empty": "Please enter your email address",
        "string.email": "Please enter a valid email",
      }),
    name: Joi.string().empty().min(5).max(1024).required()
      .messages({
        "any.required": "Sorry, name field is required",
        "string.empty": "Sorry, name is required",
        "string.min": "Name should have a minimum length of 5",
      }),
    message: Joi.string().empty().min(5).max(1024).required()
      .messages({
        "any.required": "Sorry, message field is required",
        "string.empty": "Sorry, message is required",
        "string.min": "Message should have a minimum length of 5",
      }),
    phone: Joi.string().alphanum().min(11).max(15).required().empty().messages({
      "string.required": "A phone number is required.",
      "string.empty": "Phone number field cannot be an empty field.",
      "string.base": "Phone number should have a length of 11.",
    }),
  }).options({ abortEarly: false });
  return schema.validate(User);
};

export default messageValidation;
