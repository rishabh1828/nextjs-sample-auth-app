import { Formik, Field, Form } from 'formik';
import styles from '../styles/login-form.module.css';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/store';

interface Values {
	username: string;
	password: string;
}

export default function LoginForm({ url }: any) {
	const [stateFormMessage, setStateFormMessage] = useState({
		error: ''
	});
	const dispatch = useDispatch();

	async function onSubmitHandler(url: any, values: Values) {
		const loginApi: any = await fetch(`${url}/auth`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		}).catch(error => {
			console.error('Error:', error);
		});
		let result = await loginApi.json();
		if (result.success && result.token) {
			dispatch(addUser(values.username));
			Cookies.set('token', result.token);
			Router.push('/');
		} else {
			setStateFormMessage(result);
		}
	}

	return (
		<div className={styles.login_box}>
			<h1 className="display-6 mb-3">Login</h1>
			<Formik
				initialValues={{
					username: '',
					password: '',
				}}

				onSubmit={(
					values: Values
				) => onSubmitHandler(url, values)
				}

				>
				<Form>
					<div className="mb-3">
						<Field className="form-control" id="username" name="username" placeholder="Username" />
					</div>
		
					<div className="mb-3">
						<Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
					</div>
					{stateFormMessage.error ? (
						<div className={styles.error}>
							{stateFormMessage.error}
						</div>) : ''
					}
					<button type="submit" className="btn btn-primary">Login</button>
				</Form>
			</Formik>
			<div className={styles.register}>
				<span>
					Not a User?
				</span>
				<a href="/register" className={styles.link}> Register </a>
			</div>
		</div>
	);
};
