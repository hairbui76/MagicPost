import { District, Province, SpecificAddress, Ward } from "@/libs/address";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete } from "antd";
import { KeyboardEventHandler } from "react";
import InputContainer from "./InputContainer";

interface AutoCompleteProps<T> {
	label: string;
	placeholder: string;
	required: boolean;
	value?: string | null;
	disabled?: boolean;
	options: Array<T>;
	onChange?: (value: string, option: any) => void;
	onSearch?: ((value: string) => void) | undefined;
	filterOption?: ((inputValue: string, option: any) => boolean) | undefined;
	onSelect?: ((value: string, option: any) => void) | undefined;
	onKeyDown?: KeyboardEventHandler;
	children?: React.ReactNode;
}

type ProvinceAutoCompleteProps = AutoCompleteProps<Province>;
type DistrictAutoCompleteProps = AutoCompleteProps<District>;
type WardAutoCompleteProps = AutoCompleteProps<Ward>;
type SpecificAddressAutoCompleteProps = AutoCompleteProps<SpecificAddress>;

const isSpecificAddress = (option: any): option is SpecificAddress =>
	"place_id" in option;

const mapOptions = (
	options: Province[] | District[] | Ward[] | SpecificAddress[]
) =>
	options.map((option) => {
		if (isSpecificAddress(option))
			return {
				value: option.description,
				label: option.description,
				placeId: option.place_id,
			};
		return {
			value: option.name,
			label: option.name,
			code: option.code,
		};
	});

export default function AddressAutoComplete({
	label,
	required,
	value,
	placeholder,
	options,
	disabled,
	onChange,
	onSearch,
	filterOption,
	onSelect,
	onKeyDown,
	children,
}:
	| ProvinceAutoCompleteProps
	| DistrictAutoCompleteProps
	| WardAutoCompleteProps
	| SpecificAddressAutoCompleteProps) {
	return (
		<InputContainer {...{ label, required }}>
			{children ? (
				<AutoComplete
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					className="flex-1"
					options={mapOptions(options)}
					filterOption={filterOption}
					onSearch={onSearch}
					onSelect={onSelect}
					onChange={onChange}
					onKeyDown={onKeyDown}
				>
					{children}
				</AutoComplete>
			) : (
				<AutoComplete
					value={value}
					size="large"
					placeholder={placeholder}
					disabled={disabled}
					className="flex-1"
					options={mapOptions(options)}
					filterOption={filterOption}
					onSearch={onSearch}
					onSelect={onSelect}
					onChange={onChange}
					onKeyDown={onKeyDown}
					allowClear={{ clearIcon: <FontAwesomeIcon icon={faCircleXmark} /> }}
				/>
			)}
		</InputContainer>
	);
}
