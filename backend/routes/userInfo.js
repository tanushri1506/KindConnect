import { Router } from 'express';
import { UserAuthentication } from '../model/userAuth.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/getUserInfo', async (req, res) => {
	const token = req.header('Authorization').replace('Bearer ', '');
	try {
        const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
		const user = await UserAuthentication.findById(decoded._id);
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}
		res.send({ userName: user.userName });
	} catch (error) {
		res.status(401).send({ message: 'Invalid token' });
	}
});


export default router;
