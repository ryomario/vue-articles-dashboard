import parseJwt from '@/utils/parseJwt';

const s$cookies = (name, value, { datetime }) => {
    // console.log('s$cookies:name',name)
    // console.log('s$cookies:value',value)
    // console.log('s$cookies:datetime',datetime)
    const d = new Date();
    if (datetime) d.setTime(datetime);
    const expires = `expires=${d.toUTCString()}`;
    try {
        document.cookie = `${name}=${value};${expires};path=/;SameSite=None;Secure`;
    } catch (error) {
        // console.log('error cookies',error)
        throw error
    }
};

const g$cookies = (name) => {
    const cookies = `; ${document.cookie}`;
    const byValue = cookies.split(`; ${name}=`);
    if (byValue.length === 2) return byValue.pop().split(';').shift();
};

const d$cookies = (name) => {
    s$cookies(name, '', {datetime:-1});
};

const COOKIE_CERT_KEY = 'CERT'
const d$certCookies = () => d$cookies(COOKIE_CERT_KEY)
const s$certCookies = (token, { datetime }) => {s$cookies(COOKIE_CERT_KEY,token,{datetime})}
const g$certCookies = () => {
    const token = import.meta.env.VITE_API_TOKEN
    return token || g$cookies(COOKIE_CERT_KEY)
}
const g$certUserCookies = () => {
    const token = g$certCookies();
    if (token) {
        const { id, username, exp } = parseJwt(token);
        const dn = Date.now() / 1000
        if (dn > exp) {
            d$cookies(COOKIE_CERT_KEY);
            throw Error('Session Expired!')
        }
        return {
            id,
            username,
            exp,
        };
    }
    // console.log('get',token)
    throw Error('Session not found!')
};

export { s$cookies, g$cookies, d$cookies, g$certCookies, s$certCookies, d$certCookies, g$certUserCookies };
