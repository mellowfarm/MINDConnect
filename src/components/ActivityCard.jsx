import React from 'react';

function ActivityCard({ activity, staggerClass, onRegisterClick }) {
    const spotsLeft = activity.capacity - activity.registered;
    const percentFull = (activity.registered / activity.capacity) * 100;
    const isAlmostFull = percentFull > 80;
    const isFull = activity.registered >= activity.capacity;

    return (
        <div className={`card-hover activity-badge ${staggerClass} bg-white rounded-2xl shadow-xl overflow-hidden`}>
            {/* Header with emoji and category */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
                <div className="text-7xl mb-3">{activity.image}</div>
                <span className="tag">{activity.category}</span>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="heading-font text-2xl font-bold text-gray-800 mb-3">
                    {activity.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                    {activity.description}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                        <span className="mr-3 text-xl">📅</span>
                        <span className="font-medium">{activity.date}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <span className="mr-3 text-xl">🕐</span>
                        <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <span className="mr-3 text-xl">📍</span>
                        <span>{activity.location}</span>
                    </div>
                </div>

                {/* Availability Bar */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                            Availability
                        </span>
                        <span className={`text-sm font-bold ${
                            isFull ? 'text-red-600' : 
                            isAlmostFull ? 'text-orange-600' : 
                            'text-green-600'
                        }`}>
                            {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 rounded-full ${
                                isFull ? 'bg-gradient-to-r from-red-400 to-red-500' :
                                isAlmostFull ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                                'bg-gradient-to-r from-green-400 to-green-500'
                            }`}
                            style={{ width: `${percentFull}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">0</span>
                        <span className="text-xs text-gray-500">{activity.capacity}</span>
                    </div>
                </div>

                {/* Register Button */}
                <button
                    onClick={() => onRegisterClick(activity)}
                    disabled={isFull}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                        isFull
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'btn-primary text-white shadow-lg hover:shadow-xl'
                    }`}
                >
                    {isFull ? '❌ Activity Full' : '✅ Register Now'}
                </button>
            </div>
        </div>
    );
}

export default ActivityCard;