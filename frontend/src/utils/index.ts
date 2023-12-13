async function getUser() {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}`, {
			credentials: "include",
		});
		const response = await res.json();
		return response;
	} catch (err) {
		throw err;
	}
}

function copyObject(obj: any) {
	return JSON.parse(JSON.stringify(obj));
}

export { getUser, copyObject };
