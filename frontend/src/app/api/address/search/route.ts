import { BAD_REQUEST, OK } from "http-status";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const province = searchParams.get("province") || "";
	const district = searchParams.get("district") || "";
	const ward = searchParams.get("ward") || "";
	const specificAddress = searchParams.get("specificAddress");
	const input = `${specificAddress} ${ward} ${district} ${province}`.trim();
	if (!process.env.GOONG_API_KEY)
		return Response.json(
			{ message: "Please provide a valid API key" },
			{ status: BAD_REQUEST }
		);
	const res = await fetch(
		"https://rsapi.goong.io/Place/AutoComplete?" +
			new URLSearchParams({
				api_key: process.env.GOONG_API_KEY!,
				input,
			})
	);
	const response = await res.json();
	return Response.json({ data: response.predictions }, { status: OK });
}
