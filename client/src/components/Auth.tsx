import React, { useState, FormEvent } from 'react';
import { useCookies } from 'react-cookie';

interface AuthProps { }

const Auth: React.FC<AuthProps> = () => {
    const [cookies, setCookie, removeCookie] = useCookies(undefined);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const viewLogin = (status: boolean) => {
        setError(null);
        setIsLogin(status);
    };

    const onSubmit = async (event: FormEvent, endpoint: string) => {
        event.preventDefault();

        if (!isLogin && password !== confirmPassword) {
            setError('Make sure passwords match');
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie('Id', data.id);
            setCookie('Username', data.username);
            setCookie('AuthToken', data.token);

            window.location.reload();
        }
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <form>
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                {!isLogin && (
                    <div className="input-field">
                        <label htmlFor="confirmpassword">Confirm Your Password</label>
                        <input
                            type="password"
                            id="confirmpassword"
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>
                )}
                <input type="submit" onClick={(event) => onSubmit(event, isLogin ? 'login' : 'register')} />

                {error && <p>{error}</p>}
            </form>
            <div>
                {!isLogin && (
                    <p>Already have an account? <a onClick={() => viewLogin(true)}>Log In</a></p>
                )}
                {isLogin && (
                    <p>Don't have an account? <a onClick={() => viewLogin(false)}>Register</a></p>
                )}
            </div>
        </div>
    );
};

export default Auth;
