import Router from 'next/router';
import Cookies from 'js-cookie';

import jwt from 'jsonwebtoken';

const SECRET_KEY: any = process.env.JWT_KEY;

export function verifyToken(jwtToken: any) {
	try {
		return jwt.verify(jwtToken, SECRET_KEY);
	} catch (e) {
		console.log('e:', e);
		return null;
	}
}

export function getAppCookies(req: any) {
	let parsedItems = [] as any;
	if (req.headers.cookie) {
		const cookiesItems = req.headers.cookie.split('; ');
		cookiesItems.forEach((cookies: any) => {
			const parsedItem = cookies.split('=');
			parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
		});
	}
	return parsedItems;
}

export function absoluteUrl(req: any, setLocalhost?: any) {
	var protocol = 'https:';
	var host = req
		? req.headers['x-forwarded-host'] || req.headers['host']
		: window.location.host;
	if (host.indexOf('localhost') > -1) {
		if (setLocalhost) host = setLocalhost;
		protocol = 'http:';
	}
	return {
		protocol: protocol,
		host: host,
		origin: protocol + '//' + host,
		url: req,
	};
}

export function setLogout(e: Event) {
	e.preventDefault();
	Cookies.remove('token');
	Router.push('/');
}
