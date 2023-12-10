import { OK } from "http-status";
import { getProvinces } from "@/libs/address";

export default async function GET() {
	const provinces = getProvinces();
	return Response.json({ data: provinces }, { status: OK });
}
