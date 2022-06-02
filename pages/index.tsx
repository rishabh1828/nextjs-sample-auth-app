import type { NextPage } from 'next'
import LoginForm from '../components/login-form'
import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
    setLogout,
} from '../middleware/utils';
import Shop from '../components/shop';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/store';

const Home: NextPage = ({ baseApiUrl, profile, products, data }: any) => {
    const dispatch = useDispatch();
    if (profile.username) {
        dispatch(addUser(profile.username));
    }

    return (
        <>
            {!profile ? (
                <main className="vh-100 d-flex justify-content-center align-items-center">
                    <LoginForm url = {baseApiUrl} />
                </main>
            ): (
                <div>
                    <Navbar />
                    <Shop products = {products}></Shop>
                </div>
            )}
        </>
    )
}

export async function getServerSideProps(context: any) {
	const { req } = context;
	const { origin } = absoluteUrl(req);

	const baseApiUrl = `${origin}/api`;

	const abc = getAppCookies(req) as any;
	const profile: any = abc.token ? verifyToken(abc.token.split(' ')[1]) : '';
    const productApi: any = await fetch(`${baseApiUrl}/data`, {
		method: 'GET'
	}).catch(error => {
		console.error('Error:', error);
	});
    const getCartApi: any = await fetch(`${baseApiUrl}/getCart`, {
		method: 'GET'
	}).catch(error => {
		console.error('Error:', error);
	});
	let { products } = await productApi.json();
    let { data } = await getCartApi.json();
	return {
		props: {
			baseApiUrl,
			profile,
            products,
            data
		},
	};
}

export default Home
