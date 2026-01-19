import React, { useState } from 'react';

function CalendarView({ activities, onActivityClick }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Get days in month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();

        return { daysInMonth, startDayOfWeek, year, month };
    };

    // Get activities for a specific date
    const getActivitiesForDate = (dateStr) => {
        return activities.filter(activity => activity.date === dateStr);
    };

    // Navigate months
    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const goToToday = () => {
        setCurrentMonth(new Date());
    };

    const { daysInMonth, startDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create array of days including empty slots for alignment
    const calendarDays = [];
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() && 
               month === today.getMonth() && 
               year === today.getFullYear();
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {monthNames[month]} {year}
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={goToPreviousMonth}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-all"
                    >
                        ← Prev
                    </button>
                    <button
                        onClick={goToToday}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold text-blue-700 transition-all"
                    >
                        Today
                    </button>
                    <button
                        onClick={goToNextMonth}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-all"
                    >
                        Next →
                    </button>
                </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(day => (
                    <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                    if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayActivities = getActivitiesForDate(dateStr);
                    const hasActivities = dayActivities.length > 0;

                    return (
                        <div
                            key={day}
                            className={`aspect-square border-2 rounded-lg p-2 transition-all ${
                                isToday(day)
                                    ? 'border-blue-500 bg-blue-50'
                                    : hasActivities
                                    ? 'border-orange-300 bg-orange-50 hover:bg-orange-100 cursor-pointer'
                                    : 'border-gray-200 bg-white'
                            }`}
                        >
                            <div className="flex flex-col h-full">
                                <div className={`text-sm font-semibold mb-1 ${
                                    isToday(day) ? 'text-blue-600' : 'text-gray-700'
                                }`}>
                                    {day}
                                </div>
                                {hasActivities && (
                                    <div className="flex-1 overflow-y-auto">
                                        {dayActivities.map((activity, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => onActivityClick(activity)}
                                                className="text-xs bg-orange-500 text-white rounded px-1 py-0.5 mb-1 truncate hover:bg-orange-600 cursor-pointer"
                                                title={activity.title}
                                            >
                                                {activity.image} {activity.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-500 bg-blue-50 rounded"></div>
                    <span className="text-gray-600">Today</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-orange-300 bg-orange-50 rounded"></div>
                    <span className="text-gray-600">Has Activities</span>
                </div>
            </div>
        </div>
    );
}

export default CalendarView;