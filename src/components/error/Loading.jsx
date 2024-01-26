import React from 'react';
import Styles from './Loading.module.scss';
export default function Loading() {
	return (
		<div className={Styles.main}>
			<div className={Styles.ellipsis}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
