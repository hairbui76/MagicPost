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

const getProvinceByName = (province: string) => {
	return provinces.filter((p) => p.name === province)[0];
};

const getDistrictByName = (district: string) => {
	return districts.filter((d) => d.name === district)[0];
};

const getWardByName = (ward: string) => {
	return wards.filter((w) => w.name === ward)[0];
};

const getDistrictsByProvince = (province: string) =>
	districts.filter((d) => d.province_name === province);

const getWardsByDistrictAndProvince = (district: string, province: string) =>
	wards.filter(
		(w) => w.district_name === district && w.province_name === province
	);

export {
	getProvinces,
	getDistrictsByProvinceCode,
	getWardsByDistrictAndProvinceCode,
	getDistrictByName,
	getProvinceByName,
	getWardByName,
	getDistrictsByProvince,
	getWardsByDistrictAndProvince,
};
