
export const isLoggedIn = ()=>{
    return localStorage.getItem('token') !== null;
}

export const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
}