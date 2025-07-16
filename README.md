# 💸 Finance App

A modern finance management app that helps users take control of their money through intuitive budgeting, transaction tracking, and goal-oriented saving. Built with React and Firebase.

---

## 📊 Features

- **Secure Authentication** via Firebase (Email/Password)
- **Transactions**: View spending history, search transactions, sort by category
- **Overview Dashboard**: High-level view of financial status
- **Budgets**: Set monthly or custom spending limits
- **Pots**: Create and manage financial goals or savings buckets

---

## 🚧 Upcoming features

- **Add, edit, and delete budgets**
- **Add, edit, and delete pots**
- **Mobile and tablet responsiveness**
- **Bills Page**: Track upcoming and recurring payments

---

## ⚙️ Tech Stack

- **Frontend**: React (Vite) and Typescript
- **State Management**: React Context
- **Backend & Database**: Firebase (Auth + Firestore)
- **Routing**: React Router
- **Styling**: SCSS

---

## 🔐 Authentication & API Keys

This app uses **Firebase Authentication** and **Cloud Firestore** for data storage. To protect sensitive data and ensure security, API keys and credentials are not public.

### 🔑 Request Access

> 📧 To run the app, please contact the development team to receive:
>
> - Firebase config keys
> - Demo/test email and password credentials

Contact us via:

- **Email:** `ipusic266@gmail.com`
- **Email:** `09karlomarkovic04@gmail.com`

---

## 🛠 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/IvanaPusic/finance-app.git
cd finance-app
```

### 2. Installation

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root of the project and add your Firebase configuration:

```bash
VITE_API_KEY=<your_api_key>
VITE_AUTH_DOMAIN=<your_auth_domain>
VITE_PROJECT_ID=<your_project_id>
VITE_STORAGE_BUCKET=<your_storage_bucket>
VITE_MESSAGING_SENDER_ID=<your_messaging_sender_id>
VITE_APP_ID=<your_app_id>
VITE_MEASUREMENT_ID=<your_measurement_id>
```

### 4. Start development server

```bash
npm run dev
```
