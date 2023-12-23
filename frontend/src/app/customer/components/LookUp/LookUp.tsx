"use client";

import QrContainer from "./QrContainer";
import {
	faQrcode,
	faImage,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import LookupResult from "./LookUpResult";

export default function LookUp() {
	const [scanning, setScanning] = useState(false);
	const [orderIdInput, setOrderIdInput] = useState("");
	const [orderId, setOrderId] = useState<null | string>(null);
	function onScan(result: any) {
		if (result) {
			setScanning(false);
			setOrderId(result.text);
		}
	}
	function onError(error: any) {
		setScanning(false);
		alert(error);
	}
	return (
		<>
			<div className="bg-custom-theme p-4 md:px-32 flex flex-col items-center gap-6">
				<h3 className="text-primary font-medium text-lg self-start">
					HOW&apos;S YOUR PACKAGE
				</h3>
				<div className="grid-divider w-full">
					<div className="grid self-stretch card place-items-center p-4">
						<div className="text-custom-white text-sm mb-4">Use QR code</div>
						<div className="flex flex-row gap-4">
							<button type="button" className="btn btn-sm btn-primary">
								<FontAwesomeIcon icon={faImage} className="w-4 md:w-6" />
							</button>
							<button
								type="button"
								className="btn btn-sm btn-outline btn-primary"
								onClick={() => setScanning(true)}
							>
								<FontAwesomeIcon icon={faQrcode} className="w-4 md:w-6" />
							</button>
						</div>
					</div>
					<div className="divider divider-horizontal text-custom-white justify-self-center">
						OR
					</div>
					<div className="grid self-stretch card place-items-center p-4">
						<div className="text-custom-white text-sm mb-4">
							Search with order&apos;s ID
						</div>
						<div className="flex flex-row justify-center">
							<input
								type="text"
								value={orderIdInput}
								onChange={(e) => setOrderIdInput(e.currentTarget.value)}
								className="input input-sm text-custom-white mr-2 border-primary w-3/4"
								placeholder="Search"
							/>
							<button
								type="button"
								className="btn btn-primary btn-sm"
								onClick={() => setOrderId(orderIdInput)}
							>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
							</button>
						</div>
					</div>
				</div>
				{orderId ? <LookupResult orderId={orderId} /> : null}
			</div>
			{scanning ? <QrContainer {...{ onScan, onError, setScanning }} /> : null}
		</>
	);
}
