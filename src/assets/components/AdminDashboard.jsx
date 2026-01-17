import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import RegistrationsTab from './RegistrationsTab';
import ActivitiesTab from './ActivitiesTab';

function AdminDashboard({ activities, registrations }) {
    const [activeTab, setActiveTab] = useState('overview');

    const totalRegistrations = registrations.length;
    const totalActivities = activities.length;
    const totalCapacity = activities.reduce((sum, activity) => sum + activity.capacity, 0);
    const totalRegistered = activities.reduce((sum, activity) => sum + activity.registered, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <div className="admin-nav text-white p-6 shadow-lg">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl">👨‍💼</div>
                            <div>
                                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                                <p className="text-gray-300">MINDS Activity Management</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold">{totalActivities}</div>
                                <div className="text-sm text-gray-300">Activities</div>
                            </div>
                            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold">{totalRegistrations}</div>
                                <div className="text-sm text-gray-300">Registrations</div>
                            </div>
                            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold">{totalRegistered}/{totalCapacity}</div>
                                <div className="text-sm text-gray-300">Capacity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-6 py-4 font-semibold transition-all ${
                                    activeTab === 'overview'
                                        ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('registrations')}
                                className={`px-6 py-4 font-semibold transition-all ${
                                    activeTab === 'registrations'
                                        ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Registrations ({totalRegistrations})
                            </button>
                            <button
                                onClick={() => setActiveTab('activities')}
                                className={`px-6 py-4 font-semibold transition-all ${
                                    activeTab === 'activities'
                                        ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                Manage Activities
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <OverviewTab activities={activities} registrations={registrations} />
                        )}
                        {activeTab === 'registrations' && (
                            <RegistrationsTab registrations={registrations} activities={activities} />
                        )}
                        {activeTab === 'activities' && (
                            <ActivitiesTab activities={activities} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;