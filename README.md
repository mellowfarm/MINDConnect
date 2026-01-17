# MINDConnect - Activity Registration System

A modern web application designed for MINDS Singapore to streamline activity registration for individuals with intellectual disabilities and their caregivers.

## 🎯 Problem Statement

**Challenge:** How might we reduce friction in activity sign-ups for both individuals and caregivers, while reducing manual effort for staff in managing and consolidating registration data?

**Solution:** MINDConnect provides an intuitive, user-friendly platform that simplifies the registration process and offers powerful admin tools for activity management.

## ✨ Features

### User Features
- 📅 **Browse Activities** - View all available activities with detailed information
- ✅ **Easy Registration** - Simple, accessible registration forms
- 👥 **Caregiver Support** - Register on behalf of individuals
- 📊 **Real-time Availability** - See spots remaining for each activity
- ♿ **Special Needs** - Option to specify dietary restrictions, mobility requirements, etc.

### Admin Features
- 🔐 **Secure Authentication** - Password-protected admin access
- ➕ **Activity Management** - Create, edit, and delete activities
- 📋 **Registration Tracking** - View all registrations in one place
- 📊 **Dashboard Overview** - Real-time statistics and capacity monitoring
- 💾 **Cloud Database** - All data stored securely in Firebase

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite
- **Styling:** TailwindCSS, Custom CSS
- **Database:** Firebase Firestore
- **Icons/Emojis:** Unicode Emojis
- **Fonts:** Google Fonts (Poppins, Quicksand)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd MINDConnect
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Copy your Firebase config
   - Update `src/firebase/config.js` with your credentials

4. **Run the development server**
```bash
   npm run dev
```

5. **Open in browser**
   - Navigate to `http://localhost:5173`

## 🔐 Admin Access

**Default Admin Password:** `minds2026`

To change the password, edit `src/components/AdminLogin.jsx`:
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

## 📁 Project Structure
```
MINDConnect/
├── public/
│   └── minds-logo.png          # MINDS logo
├── src/
│   ├── components/
│   │   ├── ActivityCard.jsx    # Activity display card
│   │   ├── Modal.jsx           # Registration modal
│   │   ├── AdminLogin.jsx      # Admin authentication
│   │   ├── AdminDashboard.jsx  # Admin main panel
│   │   ├── ActivitiesTab.jsx   # Activity management
│   │   ├── OverviewTab.jsx     # Stats overview
│   │   └── RegistrationsTab.jsx # Registration list
│   ├── data/
│   │   └── mockData.js         # Sample activity data
│   ├── firebase/
│   │   ├── config.js           # Firebase configuration
│   │   └── firestoreService.js # Database operations
│   ├── App.jsx                 # Main application
│   ├── App.css                 # Custom styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Base styles
├── index.html
├── package.json
└── README.md
```

## 🎨 Key Design Choices

### User Experience
- **Clean, Modern Interface** - Minimalist design with clear call-to-actions
- **Accessibility First** - Large text, high contrast, emoji icons for easy recognition
- **Mobile Responsive** - Works seamlessly on all device sizes
- **Progressive Disclosure** - Show only relevant information at each step

### Admin Experience
- **Centralized Dashboard** - All management tools in one place
- **Real-time Updates** - Changes reflect immediately across the system
- **Intuitive Forms** - Simple, validated input fields
- **Visual Feedback** - Success/error messages for all actions

## 💡 How It Works

### For Users
1. Browse available activities on the homepage
2. Click "Register Now" on any activity
3. Fill in registration details
4. Submit and receive confirmation

### For Admins
1. Click "Switch to Admin" and enter password
2. View dashboard with real-time statistics
3. Manage activities (add, edit, delete)
4. View all registrations and export data

### Data Flow
```
User Action → React Component → Firebase Service → Firestore Database
                                    ↓
                            Update Local State → Re-render UI
```

## 🔥 Firebase Collections

### Activities Collection
```javascript
{
  id: "auto-generated",
  title: "Art Workshop",
  description: "Join us for...",
  date: "2026-01-25",
  time: "10:00 AM - 12:00 PM",
  location: "Activity Room 1",
  capacity: 15,
  registered: 8,
  category: "Creative",
  image: "🎨",
  createdAt: Timestamp
}
```

### Registrations Collection
```javascript
{
  id: "auto-generated",
  name: "John Doe",
  email: "john@example.com",
  phone: "+65 1234 5678",
  relationship: "self" | "caregiver" | "family",
  participantName: "Optional",
  specialNeeds: "Optional",
  activityId: "activity-id",
  activityTitle: "Art Workshop",
  registeredAt: Timestamp
}
```

## 🌟 Future Enhancements

- [ ] Email notifications for registrations
- [ ] SMS reminders before activities
- [ ] User accounts and login
- [ ] Activity ratings and feedback
- [ ] Recurring activities
- [ ] Payment integration
- [ ] Export registrations to Excel/CSV
- [ ] Advanced filtering and search
- [ ] Multi-language support
- [ ] Calendar integration

## 🤝 Contributing

This project was developed for Google Developers Hack for Good 2026.

**Team:** [Your Team Name]
**Members:** [Your Names]

## 📄 License

This project is developed for MINDS Singapore as part of Hack for Good 2026.

## 🙏 Acknowledgments

- **MINDS Singapore** - For the problem statement and inspiration
- **Google Developers** - For organizing Hack for Good 2026
- **Anthropic Claude** - For development assistance
- **NUS School of Computing** - For hosting the finale

## 📞 Contact

For questions or support, please contact: [Your Email]

---

**Built with ❤️ for MINDS Singapore | Hack for Good 2026**