export const setUserCookies = (data) => {
    let now = new Date();
    now.setTime(now.getTime() + (60 * 60 * 1000));
    document.cookie = `username=${data.username};expires=${now.toUTCString()};path=/;SameSite=Strict`;
    document.cookie = `id=${data.id};expires=${now.toUTCString()};path=/;SameSite=Strict`;
    document.cookie = `email=${data.email};expires=${now.toUTCString()};path=/;SameSite=Strict`;
    document.cookie = `name=${data.firstName} ${data.lastName};expires=${now.toUTCString()};path=/;SameSite=Strict`;
};

export const deleteUserCookies = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

export const validateCookies = () => {
    const cookies = document.cookie;

    const splitCookies = cookies.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=').map(c => c.trim());
        acc[key] = value;
        return acc;
    }, {});

    const requiredCookies = ['username', 'id', 'email', 'name'];
    return requiredCookies.every(cookie => cookie in splitCookies);
};