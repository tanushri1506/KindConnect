import { Router } from 'express';
import { UserAuthentication, validate } from '../model/userAuth.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await UserAuthentication.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "Email Already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new UserAuthentication({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "Registered Successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

export default router;
