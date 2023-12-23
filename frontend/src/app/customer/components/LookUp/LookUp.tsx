"use client";

import QrContainer from "./QrContainer";
import {
	faQrcode,
	faImage,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LookUp() {
	const [scanning, setScanning] = useState(false);
	const [orderId, setOrderId] = useState("");
	const router = useRouter();
	function onScan(result: any) {
		console.log(result);
		if (result) {
			setScanning(false);
			//  router.push('ORDER VIEW LINK')
		}
	}
	function onError(error: any) {
		console.log(error);
		setScanning(false);
	}
	async function redirectToOrderView(orderId: string) {
		try {
			const data = await fetch("CHECK IF ORDER EXISTS", {
				credentials: "include",
			}).then(async (response) => {
				if (response.status !== 200) {
					const json = await response.json();
					throw new Error(json.message);
				}
				return response.json();
			});
			// If order is valid (check data):
			// router.push('ORDER VIEW LINK')
		} catch (error) {
			throw error;
		}
	}

	return (
		<>
			<div className="bg-custom-theme p-4 md:px-32">
				<h3 className="text-primary font-medium mb-4">
					HOW&apos;S YOUR PACKAGE
				</h3>
				<div className="grid-divider w-full">
					<div className="grid self-stretch card bg-base-300 rounded-box place-items-center p-4">
						<div className="text-custom-white text-sm mb-4">Use QR code</div>
						<div className="flex flex-row gap-4">
							<button type="button" className="btn btn-primary">
								<FontAwesomeIcon icon={faImage} className="w-4 md:w-6" />
							</button>
							<button
								type="button"
								className="btn btn-outline btn-primary"
								onClick={() => setScanning(true)}
							>
								<FontAwesomeIcon icon={faQrcode} className="w-4 md:w-6" />
							</button>
						</div>
					</div>
					<div className="divider divider-horizontal text-custom-white justify-self-center">
						OR
					</div>
					<div className="grid self-stretch card bg-base-300 rounded-box place-items-center p-4">
						<div className="text-custom-white text-sm mb-4">
							Search with order&apos;s ID
						</div>
						<div>
							<input
								type="text"
								value={orderId}
								onChange={(e) => setOrderId(e.currentTarget.value)}
								className="input text-custom-white mr-2 border-primary"
							/>
							<button
								type="button"
								className="btn btn-primary"
								onClick={(e) => redirectToOrderView(e.currentTarget.value)}
							>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
							</button>
						</div>
					</div>
				</div>
			</div>
			{scanning ? <QrContainer {...{ onScan, onError, setScanning }} /> : null}
		</>
	);
}
