"use client";
import {
	District,
	Ward,
	getDistrictsByProvinceCode,
	getProvinces,
	getWardsByDistrictAndProvinceCode,
} from "@/libs/address";
import { removeVietnameseTones } from "@/utils/helper";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Input } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

type SpecificAddress = {
	description: string;
	place_id: string;
	compound: {
		district: string;
		commune: string;
		province: string;
	};
};

const PROVINCES = getProvinces().map((p) => ({
	value: p.name,
	code: p.code,
}));

export default function AddressInput({
	handleChange,
}: {
	handleChange: Dispatch<SetStateAction<string>>;
}) {
	const [provinces, setProvinces] = useState(PROVINCES);
	const [provinceCode, setProvinceCode] = useState("");
	const [province, setProvince] = useState("");
	const [districts, setDistricts] = useState<District[]>([]);
	const [district, setDistrict] = useState("");
	const [districtCode, setDistrictCode] = useState("");
	const [ward, setWard] = useState("");
	const [wards, setWards] = useState<Ward[]>([]);
	const [specificAddress, setSpecificAddress] = useState("");
	const [specificAddresses, setSpecificAddresses] = useState<SpecificAddress[]>(
		[]
	);

	const handleChangeProvince = (value: any, province: any) => {
		setProvinceCode(province?.code);
		setProvince(value);
		setDistrictCode("");
		setDistricts(getDistrictsByProvinceCode(province?.code));
		setDistrict("");
		setWards(getWardsByDistrictAndProvinceCode(districtCode, province?.code));
		setWard("");
		setSpecificAddresses([]);
		setSpecificAddress("");
	};
	const handleChangeDistrict = (value: any, district: any) => {
		setDistrictCode(district?.code);
		setDistrict(value);
		setWards(getWardsByDistrictAndProvinceCode(district?.code, provinceCode));
		setWard("");
		setSpecificAddresses([]);
		setSpecificAddress("");
	};
	const handleChangeWard = (value: any) => {
		setWard(value);
		setSpecificAddresses([]);
		setSpecificAddress("");
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4">
				<AutoComplete
					value={province}
					size="large"
					placeholder="Province"
					className="flex-1"
					options={provinces}
					filterOption={(inputValue, option) =>
						removeVietnameseTones(option!.value)
							.toUpperCase()
							.indexOf(removeVietnameseTones(inputValue).toUpperCase()) !== -1
					}
					onChange={handleChangeProvince}
					allowClear={{ clearIcon: <FontAwesomeIcon icon={faCircleXmark} /> }}
				/>
				<AutoComplete
					value={district}
					size="large"
					placeholder="District"
					className="flex-1"
					options={districts.map((d) => ({
						value: d.name,
						code: d.code,
					}))}
					filterOption={(inputValue, option) =>
						removeVietnameseTones(option!.value)
							.toUpperCase()
							.indexOf(removeVietnameseTones(inputValue).toUpperCase()) !== -1
					}
					onChange={handleChangeDistrict}
					allowClear={{ clearIcon: <FontAwesomeIcon icon={faCircleXmark} /> }}
				/>
				<AutoComplete
					value={ward}
					size="large"
					placeholder="Ward"
					className="flex-1"
					options={wards.map((d) => ({
						value: d.name,
						code: d.code,
					}))}
					filterOption={(inputValue, option) =>
						removeVietnameseTones(option!.value)
							.toUpperCase()
							.indexOf(removeVietnameseTones(inputValue).toUpperCase()) !== -1
					}
					onChange={handleChangeWard}
					allowClear={{ clearIcon: <FontAwesomeIcon icon={faCircleXmark} /> }}
				/>
			</div>
			<AutoComplete
				value={specificAddress}
				size="large"
				placeholder="Specific address"
				disabled={!province || !district || !ward}
				onSearch={(value) => setSpecificAddress(value)}
				options={specificAddresses.map((address) => ({
					value: address.description,
				}))}
				onSelect={(value) => setSpecificAddress(value)}
				onKeyDown={async (e) => {
					if (e.key === "Enter") {
						const res = await fetch(
							"/api/address/search?" +
								new URLSearchParams({
									province,
									district,
									ward,
									specificAddress,
								})
						);
						const response = await res.json();
						if (res.status === 200) {
							setSpecificAddresses(response.data);
						}
					}
				}}
			>
				<Input
					size="large"
					placeholder="input here"
					suffix={
						<small style={{ color: "grey" }}>
							Press <b>Enter</b> to search
						</small>
					}
				/>
			</AutoComplete>
		</div>
	);
}
