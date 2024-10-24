"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
    const { user, login, logout, loading } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleLogin = async () => {
        setError('');
        const result = await login(username, password);
        if (!result.success) {
            setError(result.error || '登录失败');
        }
    };

    const handleLogout = () => {
        logout();
    };

    if (user) {
        return (
            <div>
                <h1>欢迎，您已登录！</h1>
                <button onClick={handleLogout}>登出</button>
            </div>
        );
    } else {
        return (
            <div>
                <h1>请登录</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>登录</button>
            </div>
        );
    }
}
