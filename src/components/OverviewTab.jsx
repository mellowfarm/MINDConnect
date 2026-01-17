import React from 'react';

function OverviewTab({ activities, registrations }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Status</h3>
            <div className="space-y-4">
                {activities.map(activity => {
                    const percentFull = (activity.registered / activity.capacity) * 100;
                    return (
                        <div key={activity.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-lg">{activity.title}</h4>
                                    <p className="text-sm text-gray-600">{activity.date} • {activity.time}</p>
                                </div>
                                <span className="tag">{activity.category}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all"
                                            style={{ width: `${percentFull}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-sm font-semibold text-gray-700">
                                    {activity.registered}/{activity.capacity}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default OverviewTab;