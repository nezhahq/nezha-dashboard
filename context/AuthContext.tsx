"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
    token: string;
    // 如果有其他用户信息，可以在这里添加
    username: string;
    // email?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<LoginResult>;
    logout: () => void;
}

interface LoginResult {
    success: boolean;
    error?: string;
}

interface LoginResponse {
    data: {
        expire: string;
        token: string;
    };
    error: string;
    success: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expire = localStorage.getItem('expire');
        const username = localStorage.getItem('username');

        console.log(token, expire)

        if (token && username && expire && new Date(expire) > new Date()) {
            console.info('登录成功')
            setUser({ token, username: username });
        } else {
            console.info('登录失败')
            setUser(null);
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<LoginResult> => {
        try {
            const response = await fetch('http://localhost:8008/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data: LoginResponse = await response.json();

            console.log(data)

            if (data.success) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('username', username);
                localStorage.setItem('expire', data.data.expire);

                setUser({ token: data.data.token, username });

                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('登录错误:', error);
            return { success: false, error: '发生错误' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth 必须在 AuthProvider 内使用');
    }
    return context;
};
