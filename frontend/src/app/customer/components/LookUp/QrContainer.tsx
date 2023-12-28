// @ts-ignore
import QrReader from "react-qr-scanner";

export default function QrContainer({
	onScan,
	onError,
	setScanning,
}: {
	onScan: (result: any) => void;
	onError: (error: any) => void;
	setScanning: (scanning: boolean) => void;
}) {
	return (
		<div className="fixed z-50 top-0 l-0 w-screen h-[100dvh] flex flex-col justify-center items-center bg-custom-text-color bg-opacity-90 gap-4">
			<QrReader
				delay={500}
				className="flex justify-center w-[60vw]"
				onScan={onScan}
				onError={onError}
			/>
			<button
				type="button"
				className="btn btn-error"
				onClick={() => setScanning(false)}
			>
				Cancel
			</button>
		</div>
	);
}
