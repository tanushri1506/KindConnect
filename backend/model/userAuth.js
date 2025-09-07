import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const userAuthSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userAuthSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id,userName:this.userName }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const UserAuthentication = mongoose.model("userAuths", userAuthSchema);

const validate = (data) => {
	const schema = Joi.object({
		// userName: Joi.string().required().label("User Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

export { UserAuthentication, validate };

