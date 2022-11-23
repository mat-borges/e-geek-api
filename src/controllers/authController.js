export async function postSignUp(req, res) {
	const { user } = res.locals;
	res.status(404).send({ user, message: 'Not fully implemented yet' });
}
