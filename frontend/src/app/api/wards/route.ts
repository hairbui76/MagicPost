import { BAD_REQUEST, OK } from "http-status";
import { getWardsByDistrictAndProvinceCode } from "@/libs/address";

export default async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const provinceCode = searchParams.get("provinceCode");
	const districtCode = searchParams.get("districtCode");
	if (!provinceCode)
		return Response.json(
			{ message: "Please select a province first" },
			{ status: BAD_REQUEST }
		);
	if (!districtCode)
		return Response.json(
			{ message: "Please select a district first" },
			{ status: BAD_REQUEST }
		);
	const wards = getWardsByDistrictAndProvinceCode(districtCode, provinceCode);
	return Response.json({ data: wards }, { status: OK });
}
