import React, { useState } from 'react';
import ActivityCard from './components/ActivityCard';
import Modal from './components/Modal';
import AdminDashboard from './components/AdminDashboard';
import { MOCK_ACTIVITIES } from './data/mockData';
import './App.css';

function App() {
    const [currentView, setCurrentView] = useState('user'); // 'user' or 'admin'
    const [activities, setActivities] = useState(MOCK_ACTIVITIES);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [registrations, setRegistrations] = useState([]);

    const handleRegister = (formData) => {
        const newRegistration = {
            id: Date.now(),
            ...formData,
            activityId: selectedActivity.id,
            activityTitle: selectedActivity.title,
            registeredAt: new Date().toISOString()
        };

        setRegistrations([...registrations, newRegistration]);
        
        // Update activity registered count
        setActivities(activities.map(activity => 
            activity.id === selectedActivity.id 
                ? { ...activity, registered: activity.registered + 1 }
                : activity
        ));

        setSelectedActivity(null);
    };

    return (
        <div className="min-h-screen">
            {/* Toggle View Button */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={() => setCurrentView(currentView === 'user' ? 'admin' : 'user')}
                    className="btn-primary px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    {currentView === 'user' ? '👤 Switch to Admin' : '🏠 Back to User View'}
                </button>
            </div>

            {currentView === 'user' ? (
                // User View
                <div className="container mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
                            <div className="text-6xl">🏠</div>
                        </div>
                        <h1 className="heading-font text-5xl font-bold text-gray-800 mb-4">
                            Welcome to ActivityHub
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover and join exciting activities at MINDS. Easy registration for individuals and caregivers!
                        </p>
                    </div>

                    {/* Activity Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {activities.map((activity, index) => (
                            <ActivityCard
                                key={activity.id}
                                activity={activity}
                                staggerClass={`stagger-${(index % 4) + 1}`}
                                onRegisterClick={setSelectedActivity}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                // Admin View
                <AdminDashboard 
                    activities={activities}
                    registrations={registrations}
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