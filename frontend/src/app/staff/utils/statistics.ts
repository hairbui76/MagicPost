const fakeWeeklyOrderStats = (() => {
	const res = [];
	for (let i = 1; i < 32; i += 1) {
		const fakeData = {
			day: i,
			incoming: Math.floor(Math.random() * 200),
			outgoing: Math.floor(Math.random() * 200),
			pending: Math.floor(Math.random() * 200),
		};
		res.push(fakeData);
	}
	return res;
})();

const fakeOverview = {
	incoming: 121,
	outgoing: 324,
	pending: 326,
	revenue: 100000,
	profit: 20223,
};

const fakeRevenue = {
	cod: 40000,
	profit: 20223,
	delivery: 39777,
};

const fakeTopDeliveries = [
	{
		point: "Hanoi",
		incoming: 611,
		outgoing: 90,
	},
	{
		point: "TP HCM",
		incoming: 783,
		outgoing: 212,
	},
	{
		point: "Thai Binh",
		incoming: 423,
		outgoing: 231,
	},
	{
		point: "Thai Binh",
		incoming: 423,
		outgoing: 231,
	},
	{
		point: "Thai Binh",
		incoming: 423,
		outgoing: 231,
	},
	{
		point: "Thai Binh",
		incoming: 423,
		outgoing: 231,
	},
	{
		point: "Thai Binh",
		incoming: 423,
		outgoing: 231,
	},
	{
		point: "Thai Binh",
		incoming: 423,
		outgoing: 231,
	},
	{
		point: "Thai Binh",
		incoming: 423,
		outgoing: 231,
	},
	{
		point: "Thai Binh",
		incoming: 423,
		outgoing: 231,
	},
];

const fakeProperties = [
	{
		property: "High value",
		value: 123,
	},
	{
		property: "Fragile",
		value: 192,
	},
	{
		property: "Bulk",
		value: 112,
	},
	{
		property: "Out of Gauge",
		value: 210,
	},
	{
		property: "Liquid",
		value: 123,
	},
	{
		property: "Magnetic",
		value: 123,
	},
	{
		property: "Thermal Sensitive",
		value: 323,
	},
	{
		property: "Standard",
		value: 192,
	},
];

export async function getStatistics(point: string) {
	return Promise.resolve({
		message: "success",
		statistics: {
			overview: fakeOverview,
			orders: fakeWeeklyOrderStats,
			revenue: fakeRevenue,
			topDeliveries: fakeTopDeliveries,
			properties: fakeProperties,
		},
	});
	const params = new URLSearchParams({
		point: point,
	});
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/statistics/overview?${params}`,
		{
			credentials: "include",
		}
	).then(async (response) => {
		if (response.status !== 200) {
			const json = await response.json();
			throw new Error(json.message);
		}
		return response.json();
	});
}
