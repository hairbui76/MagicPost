"use client";
import AddressAutoComplete from "@/app/staff/components/Form/AutoCompleteInput";
import { Address } from "@/app/staff/utils/orders";
import {
	District,
	SpecificAddress,
	Ward,
	getDistrictsByProvinceCode,
	getProvinces,
	getWardsByDistrictAndProvinceCode,
	getDistrictByName,
	getProvinceByName,
	getWardByName,
} from "@/libs/address";
import { removeVietnameseTones } from "@/utils/helper";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import { KeyboardEventHandler, useState } from "react";

const provinces = getProvinces();

export default function AddressInput({
	handleChange,
	address = null,
}: {
	handleChange: (
		placeId: string,
		address: string,
		province: string,
		district: string,
		ward: string
	) => void;
	address: Address | null;
}) {
	const fullProvince = address
		? getProvinceByName(address?.province)
		: { name: "", code: "", unit: "" };
	const fullDistrict = address
		? getDistrictByName(address?.district)
		: { name: "", code: "", unit: "" };
	const fullWard = address
		? getWardByName(address?.ward)
		: { name: "", code: "", unit: "" };

	const [provinceCode, setProvinceCode] = useState(fullProvince.code);
	const [province, setProvince] = useState(fullProvince.name);
	const [districts, setDistricts] = useState<District[]>(
		address ? getDistrictsByProvinceCode(fullProvince.code) : []
	);
	const [district, setDistrict] = useState(fullDistrict.name);
	const [districtCode, setDistrictCode] = useState(fullDistrict.code);
	const [ward, setWard] = useState(fullWard.name);
	const [wards, setWards] = useState<Ward[]>(
		address
			? getWardsByDistrictAndProvinceCode(fullDistrict.code, fullProvince.code)
			: []
	);
	const [specificAddress, setSpecificAddress] = useState(
		address ? address.name : ""
	);
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

	const handleEnterSpecificAddress: KeyboardEventHandler = async (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
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
	};

	const filterOption = (
		inputValue: string,
		option: { value: string; label: string }
	) => {
		return (
			removeVietnameseTones(option!.value)
				.toUpperCase()
				.indexOf(removeVietnameseTones(inputValue).toUpperCase()) !== -1
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<AddressAutoComplete
					label="Province"
					placeholder="Province"
					required={true}
					value={province}
					options={provinces}
					onChange={handleChangeProvince}
					filterOption={filterOption}
				/>
				<AddressAutoComplete
					label="District"
					placeholder="District"
					required={true}
					value={district}
					options={districts}
					onChange={handleChangeDistrict}
					filterOption={filterOption}
				/>
				<AddressAutoComplete
					label="Ward"
					placeholder="Ward"
					required={true}
					value={ward}
					options={wards}
					onChange={handleChangeWard}
					filterOption={filterOption}
				/>
			</div>
			<AddressAutoComplete
				label="Specific address"
				placeholder="Specific address"
				required={true}
				value={specificAddress}
				options={specificAddresses}
				disabled={!province || !district || !ward}
				filterOption={filterOption}
				onSearch={(value) => setSpecificAddress(value)}
				onSelect={(value, option) => {
					setSpecificAddress(value);
					handleChange(option.placeId, value, province, district, ward);
				}}
				onKeyDown={handleEnterSpecificAddress}
			>
				<Input
					suffix={
						<small style={{ color: "grey" }}>
							Press <b>Enter</b> to search
						</small>
					}
					size="large"
					allowClear={{ clearIcon: <FontAwesomeIcon icon={faCircleXmark} /> }}
				/>
			</AddressAutoComplete>
		</div>
	);
}
