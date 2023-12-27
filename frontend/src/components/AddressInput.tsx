import { Address } from "@/app/staff/utils/orders";
import AddressAutoComplete from "@/components/Form/AutoCompleteInput";
import {
	District,
	SpecificAddress,
	Ward,
	getDistrictsByProvince,
	getProvinces,
	getWardsByDistrictAndProvince,
} from "@/libs/address";
import { removeVietnameseTones } from "@/utils/helper";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import { KeyboardEventHandler, useState } from "react";

const provinces = getProvinces();

export default function AddressInput({
	value,
	handleChange,
	className,
	includeSpecificAddress = true,
	rowLayoutOnSmallView = false,
}: {
	value: Address;
	handleChange: (newAddress: Address) => void;
	className?: string;
	includeSpecificAddress?: boolean;
	rowLayoutOnSmallView?: boolean;
}) {
	const [districts, setDistricts] = useState<District[]>([]);
	const [wards, setWards] = useState<Ward[]>([]);
	const [specificAddresses, setSpecificAddresses] = useState<SpecificAddress[]>(
		[]
	);

	const handleChangeProvince = (province: string) => {
		setDistricts(getDistrictsByProvince(province));
		setWards([]);
		setSpecificAddresses([]);

		handleChange({ province, district: "", ward: "", name: "", id: "" });
	};

	const handleChangeDistrict = (district: string) => {
		setWards(getWardsByDistrictAndProvince(district, value.province!));
		setSpecificAddresses([]);

		handleChange({ district, ward: "", name: "", id: "" });
	};

	const handleChangeWard = (ward: string) => {
		setSpecificAddresses([]);

		handleChange({ ward, name: "", id: "" });
	};

	const handleEnterSpecificAddress: KeyboardEventHandler = async (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const res = await fetch(
				"/api/address/search?" +
					new URLSearchParams({
						province: value.province ? value.province : "",
						district: value.district ? value.district : "",
						ward: value.ward ? value.ward : "",
						specificAddress: value.name ? value.name : "",
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
		<div className={className}>
			<div className="flex flex-col gap-4">
				<div
					className={`flex ${
						rowLayoutOnSmallView ? "flex-row" : "flex-col"
					} sm:flex-row gap-4`}
				>
					<AddressAutoComplete
						label="Province"
						placeholder="Province"
						required={true}
						value={value.province}
						options={provinces}
						onChange={handleChangeProvince}
						filterOption={filterOption}
					/>
					<AddressAutoComplete
						label="District"
						placeholder="District"
						required={true}
						value={value.district}
						options={districts}
						onChange={handleChangeDistrict}
						filterOption={filterOption}
					/>
					<AddressAutoComplete
						label="Ward"
						placeholder="Ward"
						required={true}
						value={value.ward}
						options={wards}
						onChange={handleChangeWard}
						filterOption={filterOption}
					/>
				</div>
				{includeSpecificAddress && (
					<AddressAutoComplete
						label="Specific address"
						placeholder="Specific address"
						required={true}
						value={value.name}
						options={specificAddresses}
						disabled={!value.province || !value.district || !value.ward}
						filterOption={filterOption}
						onSearch={(address) => handleChange({ name: address, id: "" })}
						onSelect={(address, option) => {
							handleChange({ name: address, id: option.placeId });
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
							allowClear={{
								clearIcon: <FontAwesomeIcon icon={faCircleXmark} />,
							}}
						/>
					</AddressAutoComplete>
				)}
			</div>
		</div>
	);
}
