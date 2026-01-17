import React, { useState } from 'react';
import { addActivity, deleteActivity, updateActivity } from '../firebase/firestoreService';

function ActivitiesTab({ activities, onReload }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);
    const [newActivity, setNewActivity] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: 10,
        registered: 0,
        category: 'Wellness',
        image: '🎨'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const targetActivity = editingActivity || newActivity;
        const setter = editingActivity ? setEditingActivity : setNewActivity;
        
        setter(prev => ({
            ...prev,
            [name]: name === 'capacity' || name === 'registered' ? parseInt(value) : value
        }));
    };

    const handleAddActivity = async (e) => {
        e.preventDefault();
        try {
            await addActivity(newActivity);
            alert('✅ Activity added successfully!');
            setShowAddForm(false);
            resetForm();
            onReload();
        } catch (error) {
            console.error("Error adding activity:", error);
            alert('❌ Failed to add activity');
        }
    };

    const handleEditActivity = async (e) => {
        e.preventDefault();
        try {
            const { id, ...activityData } = editingActivity;
            await updateActivity(id, activityData);
            alert('✅ Activity updated successfully!');
            setEditingActivity(null);
            onReload();
        } catch (error) {
            console.error("Error updating activity:", error);
            alert('❌ Failed to update activity');
        }
    };

    const handleDeleteActivity = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteActivity(id);
                alert('✅ Activity deleted successfully!');
                onReload();
            } catch (error) {
                console.error("Error deleting activity:", error);
                alert('❌ Failed to delete activity');
            }
        }
    };

    const startEditing = (activity) => {
        setEditingActivity({ ...activity });
        setShowAddForm(false);
    };

    const cancelEditing = () => {
        setEditingActivity(null);
    };

    const resetForm = () => {
        setNewActivity({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            capacity: 10,
            registered: 0,
            category: 'Wellness',
            image: '🎨'
        });
    };

    const currentActivity = editingActivity || newActivity;
    const isEditing = !!editingActivity;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Manage Activities</h3>
                {!isEditing && (
                    <button 
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="btn-primary px-6 py-2 rounded-lg text-white font-medium"
                    >
                        {showAddForm ? '✕ Cancel' : '➕ Add New Activity'}
                    </button>
                )}
            </div>

            {/* Add/Edit Activity Form */}
            {(showAddForm || isEditing) && (
                <div className="bg-white border-2 border-blue-500 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold text-gray-800">
                            {isEditing ? '✏️ Edit Activity' : '➕ Create New Activity'}
                        </h4>
                        {isEditing && (
                            <button 
                                onClick={cancelEditing}
                                className="text-gray-600 hover:text-gray-800 font-semibold"
                            >
                                ✕ Cancel
                            </button>
                        )}
                    </div>
                    <form onSubmit={isEditing ? handleEditActivity : handleAddActivity} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Activity Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={currentActivity.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                                    placeholder="e.g., Art Workshop"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={currentActivity.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                                >
                                    <option value="Creative">Creative</option>
                                    <option value="Wellness">Wellness</option>
                                    <option value="Life Skills">Life Skills</option>
                                    <option value="Nature">Nature</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Social">Social</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={currentActivity.description}
                                onChange={handleInputChange}
                                required
                                rows="3"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                                placeholder="Describe the activity..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={currentActivity.date}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Time *
                                </label>
                                <input
                                    type="text"
                                    name="time"
                                    value={currentActivity.time}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                                    placeholder="e.g., 10:00 AM - 12:00 PM"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={currentActivity.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                                    placeholder="e.g., Activity Room 1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Capacity *
                                </label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={currentActivity.capacity}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Emoji Icon *
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={currentActivity.image}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
                                placeholder="e.g., 🎨 🎵 🍳 🤸 🌱 🎬"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary px-6 py-3 rounded-lg text-white font-semibold"
                        >
                            {isEditing ? '✅ Update Activity' : '✅ Create Activity'}
                        </button>
                    </form>
                </div>
            )}

            {/* Activities List */}
            {activities.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Activities Yet</h3>
                    <p className="text-gray-600">Click "Add New Activity" to create your first activity!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {activities.map(activity => (
                        <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="text-4xl">{activity.image}</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                                        <p className="text-sm text-gray-600">{activity.date}</p>
                                        <p className="text-xs text-gray-500">
                                            {activity.registered}/{activity.capacity} registered
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => startEditing(activity)}
                                    className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-all"
                                >
                                    ✏️ Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteActivity(activity.id, activity.title)}
                                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ActivitiesTab;