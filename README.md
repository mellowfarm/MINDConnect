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

**Team:** LadyBug

**Members:** Nicha Ing See, Jovan Teo Yi

## 📄 License

This project is developed for MINDS Singapore as part of Hack for Good 2026.

---

**Built with ❤️ for MINDS Singapore | Hack for Good 2026**