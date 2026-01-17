import React from 'react';

function ActivitiesTab({ activities }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Manage Activities</h3>
                <button className="btn-primary px-6 py-2 rounded-lg text-white font-medium">
                    ➕ Add New Activity
                </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {activities.map(activity => (
                    <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="text-4xl">{activity.image}</div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                                    <p className="text-sm text-gray-600">{activity.date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-all">
                                ✏️ Edit
                            </button>
                            <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all">
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivitiesTab;