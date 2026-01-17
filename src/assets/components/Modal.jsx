import React, { useState } from 'react';

function Modal({ activity, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        relationship: 'self',
        participantName: '',
        specialNeeds: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        alert('🎉 Registration successful! You will receive a confirmation email shortly.');
    };

    return (
        <div 
            className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div 
                className="modal-content bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                    >
                        <span className="text-2xl">✕</span>
                    </button>
                    <div className="flex items-center space-x-4">
                        <div className="text-5xl">{activity.image}</div>
                        <div>
                            <h2 className="heading-font text-3xl font-bold">Register for Activity</h2>
                            <p className="text-blue-100 mt-1">{activity.title}</p>
                        </div>
                    </div>
                </div>

                {/* Activity Info Summary */}
                <div className="bg-blue-50 p-4 m-6 rounded-lg">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                            <span className="mr-2">📅</span>
                            <span className="text-gray-700">{activity.date}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">🕐</span>
                            <span className="text-gray-700">{activity.time}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                            <span className="mr-2">📍</span>
                            <span className="text-gray-700">{activity.location}</span>
                        </div>
                    </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Relationship Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            I am registering as: *
                        </label>
                        <select
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-all"
                        >
                            <option value="self">Myself (Individual)</option>
                            <option value="caregiver">Caregiver</option>
                            <option value="family">Family Member</option>
                        </select>
                    </div>

                    {/* Contact Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name: *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* If registering for someone else */}
                    {formData.relationship !== 'self' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Participant Name: *
                            </label>
                            <input
                                type="text"
                                name="participantName"
                                value={formData.participantName}
                                onChange={handleChange}
                                required
                                placeholder="Name of person attending activity"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-all"
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address: *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number: *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+65 1234 5678"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* Special Needs */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Special Needs or Requirements: (Optional)
                        </label>
                        <textarea
                            name="specialNeeds"
                            value={formData.specialNeeds}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Any dietary restrictions, mobility requirements, or other needs we should know about..."
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-all resize-none"
                        />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-4 btn-primary text-white rounded-lg font-semibold shadow-lg"
                        >
                            ✅ Complete Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;