import React from 'react';

function RegistrationsTab({ registrations, activities }) {
    const handlePrint = () => {
        window.print();
    };

    if (registrations.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Registrations Yet</h3>
                <p className="text-gray-600">Registrations will appear here once people sign up for activities.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">All Registrations</h3>
                <button 
                    onClick={handlePrint}
                    className="btn-primary px-6 py-2 rounded-lg text-white font-medium hover:shadow-lg transition-all"
                >
                    🖨️ Print List
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Activity</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {registrations.map(reg => (
                            <tr key={reg.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-800">{reg.name}</td>
                                <td className="px-4 py-3 text-gray-600">{reg.activityTitle}</td>
                                <td className="px-4 py-3 text-gray-600">{reg.email}</td>
                                <td className="px-4 py-3 text-gray-600">{reg.phone}</td>
                                <td className="px-4 py-3">
                                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                        {reg.relationship}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RegistrationsTab;