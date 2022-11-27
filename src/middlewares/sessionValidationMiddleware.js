import { sessionsCollection } from "../db/db.js";

export async function checkSession(req, res, next) {
	const token = req.headers.authorization.replace("Bearer ", "");

	try {
		const sessionExists = await sessionsCollection.findOne({ token: token });

		if (!sessionExists) {
			res.status(401).send({ message: "Token não encontrado!" });
			return;
		} else {
			res.locals.session = sessionExists;
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
	next();
}
