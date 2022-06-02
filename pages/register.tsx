import { Formik, Field, Form } from 'formik';
import styles from '../styles/login-form.module.css';
import Router from 'next/router';

interface Values {
	username: string;
	password: string;
    name: string;
}

async function onSubmitHandler(values: Values) {
	const register: any = await fetch('http://localhost:3000/api/register', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	}).catch(error => {
		console.error('Error:', error);
	});
	let result = await register.json();
	if (result.success) {
		Router.push('/');
	}
}

const Register = () => {
	return (
        <main className="vh-100 d-flex justify-content-center align-items-center">
            <div className={styles.login_box}>
                <h1 className="display-6 mb-3">Register</h1>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        name: ''
                    }}

                    onSubmit={(
                        values: Values
                    ) => onSubmitHandler(values)
                    }

                    >
                    <Form>
                        <div className="mb-3">
                        <Field className="form-control" id="username" name="username" placeholder="Username" />
                        </div>
            
                        <div className="mb-3">
                        <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
                        </div>

                        <div className="mb-3">
                        <Field className="form-control" id="name" name="name" placeholder="Name"/>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                </Formik>
                <div className={styles.register}>
                    <span>
                        Already Registered?
                    </span>
                    <a href="/" className={styles.link}> Login </a>
                </div>
            </div>
        </main>
	);
};

export default Register;
