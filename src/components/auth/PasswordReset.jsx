import Styles from './PasswordReset.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { instance } from '../../utilities/axiosInstance';
import { configuration } from '../../configurations/configurations';

export default function PasswordReset() {
//	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [response, error, loading, axiosFetch, message] = useAxios();
	const [responseOTP, errorOTP, loadingOTP, axiosFetchOTP, messageOTP] = useAxios();
	const [confirmPassword, setConfirmPassword] = useState();
	const [view, setView] = useState(true);

	function handleChange(event) {
		const { name, value } = event.target;
		setData({ ...data, [name]: value });
	}

	useEffect(() => {
		if (responseOTP?.data){
			setView(false)
		}
	},[responseOTP?.data])

	const onPasswordResetHandlerAsync = (e) => {
		e.preventDefault();
		if (data.newPassword !== confirmPassword) return
		if (!data.phone || !data.otp || !data.newPassword) return

		axiosFetch({
			axiosInstance: instance,
			method: 'Post',
			url: configuration.passwordReset,
			requestConfig: data,
		});
	};

	const onGetOtpHandlerAsync = (e) => {
    e.preventDefault();
    const otpData = {
      phone: data.phone
    }
		if (!data.phone) return;
		axiosFetchOTP({
		  axiosInstance: instance,
		  method: "Post",
		  url: configuration.requestOTP,
		  requestConfig: otpData,
		})
	};

	const renderGetOTPSectionForm = () => {
		return (
			<form onSubmit={onGetOtpHandlerAsync}>
				<input
					type="text"
					placeholder="Enter your phone number"
					name="phone"
					pattern="^01[3-9]\d{8}$"
					onChange={handleChange}
					value = {data.phone}
				/>
				{renderMessages()}
				<button type='submit'
					disabled={loadingOTP || !data.phone}
					style={loadingOTP || !data.phone? { background: 'gray' }: null}
				>
					Request OTP
				</button>
			</form>
		)
	}

	const renderResetPasswordSectionForm = () => {
		return(
				<form onSubmit={onPasswordResetHandlerAsync}>
					<input
						type="text"
						placeholder="Enter your phone number"
						name="phone"
						pattern="^01[3-9]\d{8}$"
						onChange={handleChange}
						value = {data.phone}
					/>
					<input
						type="text"
						placeholder="Enter OTP"
						name="otp"
						onChange={handleChange}
						value = {data.otp}
					/>
					<input
						style={
							confirmPassword !== data.newPassword
								? { borderBottom: 'red 1px solid' }
								: {}
						}
						type="password"
						placeholder="Enter your new password"
						name="newPassword"
						onChange={handleChange}
						value = {data.newPassword}
					/>
					<input
						style={
							confirmPassword !== data.newPassword
								? { borderBottom: 'red 1px solid' }
								: {}
						}
						type="password"
						placeholder="Confirm your new password"
						name="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{renderMessages()}
					<button
						type="submit"
						disabled={
							loading ||
							loadingOTP ||
							confirmPassword !== data.newPassword ||
							!confirmPassword
						}
						style={
							loading ||
							loadingOTP ||
							confirmPassword !== data.newPassword ||
							!confirmPassword
								? { background: 'gray' }
								: null
						}
					>
						Password Reset
					</button>
				</form>
		)
	}

	const renderMessages = () => {
		return(
			<div className={Styles.msg}>
				{message || messageOTP && <p>{message || messageOTP}</p>}
				{/* {(error || errorOTP) && (<small className={Styles.msg}>{error || errorOTP}</small>)} */}
				{loading || loadingOTP && <p>Loading...</p>}
			</div>
		)
	}

	return (
		<div className={Styles.main}>
			{/* <img className={Styles.img} src={Logo} alt="logo" /> */}
			<p className={Styles.logoText}>TallyBook365</p>
			<br />
			<div className={Styles.container}>
				<p className={Styles.title}>Password Reset</p>
				<br />
				{view ? renderGetOTPSectionForm() : renderResetPasswordSectionForm()}
				<div>
					<small>
					Already have an account?{' '}
					<Link to="/login" className={Styles.link}>
						Login
					</Link>
					</small>
				</div>
			</div>
		</div>
	);
}
