import React, { useState, useEffect } from 'react';
import ActivityCard from './components/ActivityCard';
import Modal from './components/Modal';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { 
    getActivities, 
    addActivity, 
    updateActivity,
    addRegistration, 
    getRegistrations 
} from './firebase/firestoreService';
import './App.css';

function App() {
    const [currentView, setCurrentView] = useState('user'); // 'user' or 'admin'
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Load activities and registrations from Firebase on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            
            // Get activities from Firebase
            const fetchedActivities = await getActivities();
            setActivities(fetchedActivities);
            
            // Load registrations
            const fetchedRegistrations = await getRegistrations();
            setRegistrations(fetchedRegistrations);
            
            setLoading(false);
        } catch (error) {
            console.error("Error loading data:", error);
            setLoading(false);
            setActivities([]);
            setRegistrations([]);
        }
    };

    const handleRegister = async (formData) => {
        try {
            const newRegistration = {
                ...formData,
                activityId: selectedActivity.id,
                activityTitle: selectedActivity.title,
            };

            await addRegistration(newRegistration);
            setRegistrations([...registrations, newRegistration]);
            
            const updatedActivity = {
                ...selectedActivity,
                registered: selectedActivity.registered + 1
            };
            
            await updateActivity(selectedActivity.id, { registered: updatedActivity.registered });
            
            setActivities(activities.map(activity => 
                activity.id === selectedActivity.id 
                    ? updatedActivity
                    : activity
            ));

            setSelectedActivity(null);
            alert('🎉 Registration successful! You will receive a confirmation email shortly.');
        } catch (error) {
            console.error("Error registering:", error);
            alert('❌ Registration failed. Please try again.');
        }
    };

    const handleAdminSwitch = () => {
        if (currentView === 'user') {
            // Switching to admin - check authentication
            if (!isAdminAuthenticated) {
                setCurrentView('admin-login');
            } else {
                setCurrentView('admin');
            }
        } else {
            // Switching back to user view
            setCurrentView('user');
        }
    };

    const handleAdminLogin = () => {
        setIsAdminAuthenticated(true);
        setCurrentView('admin');
    };

    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        setCurrentView('user');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
                </div>
            </div>
        );
    }

    // Show admin login screen
    if (currentView === 'admin-login') {
        return <AdminLogin onLogin={handleAdminLogin} />;
    }

    return (
        <div className="min-h-screen">
            {/* Toggle View Button */}
            <div className="fixed top-4 right-4 z-50">
                {currentView === 'admin' ? (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleAdminLogout}
                            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            🚪 Logout
                        </button>
                        <button
                            onClick={handleAdminSwitch}
                            className="btn-primary px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            🏠 Back to User View
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAdminSwitch}
                        className="btn-primary px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        👤 Switch to Admin
                    </button>
                )}
            </div>

            {currentView === 'user' ? (
                // User View
                <div className="container mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
                            <img 
                                src="/MINDS-logo.png" 
                                alt="MINDS Logo" 
                                className="w-50 h-25"
                            />
                        </div>
                        <h1 className="heading-font text-5xl font-bold text-gray-800 mb-4">
                            Welcome to MINDConnect!
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                            Discover and join exciting activities at MINDS. Easy registration for individuals and caregivers!
                        </p>
                    
                        {/* Search Bar */}
                        {activities.length > 0 && (
                            <div className="max-w-2xl mx-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="🔍 Search activities by name or category..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none shadow-lg"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Activity Cards Grid */}
                    {activities.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📅</div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Activities Yet</h3>
                            <p className="text-gray-600">Check back soon for upcoming activities!</p>
                        </div>
                    ) : (
                        <>
                            {/* Filter activities based on search */}
                            {(() => {
                                const filteredActivities = activities.filter(activity =>
                                    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    activity.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    activity.description.toLowerCase().includes(searchQuery.toLowerCase())
                                );

                                return filteredActivities.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Activities Found</h3>
                                        <p className="text-gray-600">Try searching for something else!</p>
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="mt-4 btn-primary px-6 py-2 rounded-lg text-white font-medium"
                                        >
                                            Clear Search
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                                        {filteredActivities.map((activity, index) => (
                                            <ActivityCard
                                                key={activity.id}
                                                activity={activity}
                                                staggerClass={`stagger-${(index % 4) + 1}`}
                                                onRegisterClick={setSelectedActivity}
                                            />
                                        ))}
                                    </div>
                                );
                            })()}
                        </>
                    )}
                </div>
            ) : (
                // Admin View
                <AdminDashboard 
                    activities={activities}
                    registrations={registrations}
                    onReload={loadData}
                />
            )}

            {/* Registration Modal */}
            {selectedActivity && (
                <Modal
                    activity={selectedActivity}
                    onClose={() => setSelectedActivity(null)}
                    onSubmit={handleRegister}
                />
            )}
        </div>
    );
}

export default App;