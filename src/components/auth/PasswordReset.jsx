import Styles from './PasswordReset.module.scss';
import { useEffect, useLayoutEffect, useState } from 'react';
// import Logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { instance } from '../../utilities/axiosInstance';
import { configuration } from '../../configurations/configurations';

export default function PasswordReset() {
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [response, error, loading, axiosFetch, message] = useAxios();
	const [responseOTP, errorOTP, loadingOTP, axiosFetchOTP, messageOTP] = useAxios();
	const [confirmPassword, setConfirmPassword] = useState();

	function handleChange(event) {
		const { name, value } = event.target;
		setData({ ...data, [name]: value });
	}

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

	return (
		<div className={Styles.main}>
			{/* <img className={Styles.img} src={Logo} alt="logo" /> */}
			<p className={Styles.logoText}>TallyBook365</p>
			<br />
			<div className={Styles.container}>
				<p className={Styles.title}>Password Reset</p>
				<br />
        <form onSubmit={onGetOtpHandlerAsync}>
          <input
						type="text"
						placeholder="Enter your phone number"
						name="phone"
						pattern="^01[3-9]\d{8}$"
						onChange={handleChange}
					/>
          <button type='submit'
          disabled={
            loadingOTP || !data.phone
          }
          style={
            loadingOTP || !data.phone
              ? { background: 'gray' }
              : null
          }
          >
						Request OTP
					</button>
        </form>
				<form onSubmit={onPasswordResetHandlerAsync}>
					<input
						type="text"
						placeholder="Enter OTP"
						name="otp"
						onChange={handleChange}
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
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<small className={Styles.msg}>{message}</small>
					{(error || errorOTP) && (
						<small className={Styles.msg}>
							{error || errorOTP}
						</small>
					)}
					{(loading || loadingOTP) && (
						<small className={Styles.msg}>Loading...</small>
					)}
					{responseOTP?.data && (
						<small className={Styles.msg}>
							OTP send successfully
						</small>
					)}
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

				<small>
					Already have an account?{' '}
					<Link to="/login" className={Styles.link}>
						Login
					</Link>
				</small>
			</div>
		</div>
	);
}
