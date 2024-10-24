"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader } from './loading/Loader';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LoginForm() {
    const { user, login, loading } = useAuth();
    const [error, setError] = useState<string>('');
    const [errorState, setErrorState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    useEffect(() => {
        console.log('Auth state:', { user, loading });
    }, [user, loading]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const result = await login(username, password);
            if (!result.success) {
                setErrorState(true);
                setError(result.error || '登录失败');
            } else {
                setErrorState(false);
                setSuccessState(true);
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrorState(true);
            setError('登录过程中发生错误');
        }
    };

    if (typeof window === 'undefined') {
        return null; // 在服务器端渲染时不返回任何内容
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col items-center justify-start gap-4 p-4">
            <section className="flex flex-col items-start gap-2">
                {errorState && (
                    <p className="text-red-500 text-sm font-semibold">
                        登录失败: {error}
                    </p>
                )}
                {successState && (
                    <p className="text-green-500 text-sm font-semibold">
                        登录成功
                    </p>
                )}
                <p className="text-base font-semibold">请先登录</p>
                <input
                    className="px-1 border-[1px] rounded-[5px] placeholder:text-sm placeholder:text-muted-foreground"
                    name="username"
                    type="text"
                    placeholder='用户名'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="px-1 border-[1px] rounded-[5px] placeholder:text-sm placeholder:text-muted-foreground"
                    name="password"
                    type="password"
                    placeholder='密码'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-1.5 py-0.5 w-fit flex items-center gap-1 text-sm font-semibold rounded-[8px] border bg-card hover:brightness-95 transition-all text-card-foreground shadow-lg shadow-neutral-200/40 dark:shadow-none"
                    disabled={loading}
                >
                    登录
                    {loading && <Loader visible={true} />}
                </button>
            </section>
        </form>
    );
}
