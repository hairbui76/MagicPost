"use client";
import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useContext(AppContext) as AppContextProps;
	const router = useRouter();
	const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
		e.preventDefault();
		const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});
		const response = await res.json();
		if (res.status === 200) {
			setUser(response.user);
			router.push("/staff");
			toast.success(response.message);
		} else {
			toast(response.message, {
				type: "error",
			});
		}
	};
	return (
		<div className="hero min-h-screen bg-base-200 p-4 md:p-12">
			<div className="hero-content flex-col lg:flex-row lg:gap-6">
				<div className="text-center lg:text-left ">
					<h1 className="text-5xl font-bold flex flex-row justify-center lg:block">
						<Image
							width="0"
							height="0"
							src="/logo_horizon.png"
							alt="MagicPost logo"
							className="w-3/4"
						/>
					</h1>
					<p className="py-6">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
						harum, reprehenderit, eaque ullam aperiam sunt velit dicta totam
						delectus perferendis, corporis iste. Odio voluptas quas eos ducimus
						distinctio consectetur nemo.
					</p>
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<form className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								className="input input-bordered"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								className="input input-bordered"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<label className="label">
								<a href="#" className="label-text-alt link link-hover">
									Forgot password?
								</a>
							</label>
						</div>
						<div className="form-control mt-6">
							<button className="btn btn-primary" onClick={handleLogin}>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
