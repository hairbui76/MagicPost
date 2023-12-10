import { BAD_REQUEST, OK } from "http-status";
import { getDistrictsByProvinceCode } from "@/libs/address";

export default async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const provinceCode = searchParams.get("provinceCode");
	if (!provinceCode)
		return Response.json(
			{ message: "Please select a province first" },
			{ status: BAD_REQUEST }
		);
	const districts = getDistrictsByProvinceCode(provinceCode);
	return Response.json({ data: districts }, { status: OK });
}
