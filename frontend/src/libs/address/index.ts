import provinces from "./provinces.json";
import districts from "./districts.json";
import wards from "./wards.json";

export type Province = {
	code: string;
	name: string;
	unit: string;
};

export type District = {
	code: string;
	name: string;
	unit: string;
	province_code: string;
	province_name: string;
	full_name: string;
};

export type Ward = {
	code: string;
	name: string;
	unit: string;
	district_code: string;
	district_name: string;
	province_code: string;
	province_name: string;
	full_name: string;
};

export type SpecificAddress = {
	description: string;
	place_id: string;
};

const getProvinces = (): Province[] => provinces;

const getDistrictsByProvinceCode = (provinceCode: string): District[] =>
	districts.filter((d) => d.province_code === provinceCode);

const getWardsByDistrictAndProvinceCode = (
	districtCode: string,
	provinceCode: string
): Ward[] =>
	wards.filter(
		(w) => w.district_code === districtCode && w.province_code === provinceCode
	);

export {
	getProvinces,
	getDistrictsByProvinceCode,
	getWardsByDistrictAndProvinceCode,
};
