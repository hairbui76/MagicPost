import { formatDate } from "@/utils/helper";

export default function Timeline({
	timeline,
}: {
	timeline: Array<{ event: string; time: string | null }>;
}) {
	return (
		<ul className="timeline timeline-vertical text-custom-white text-sm md:text-sm">
			{timeline.map((e, index) => {
				const end = index === timeline.length - 1;
				const { event, time } = e;
				return (
					<li key={index}>
						{index === 0 ? null : (
							<hr className={time ? "bg-primary" : "bg-custom-white"} />
						)}
						{time ? (
							<div className="timeline-start timeline-box">
								{formatDate(time)}
							</div>
						) : null}
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className={`w-5 h-5 ${time ? "text-primary" : ""}`}
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="timeline-end timeline-box">{event}</div>
						{end ? null : (
							<hr className={time ? "bg-primary" : "bg-custom-white"} />
						)}
					</li>
				);
			})}
		</ul>
	);
}
