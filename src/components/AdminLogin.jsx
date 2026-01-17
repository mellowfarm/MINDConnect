import React, { useState } from 'react';

function AdminLogin({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple password check (you can change this password)
        const ADMIN_PASSWORD = 'minds2026'; // Change this to your desired password
        
        if (password === ADMIN_PASSWORD) {
            onLogin();
            setError('');
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                        <div className="text-5xl">🔐</div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Access</h2>
                    <p className="text-gray-600">Enter password to access admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Admin Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-600 text-sm mt-2">❌ {error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary px-6 py-3 rounded-lg text-white font-semibold"
                    >
                        🔓 Access Admin Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;