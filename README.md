# 🛡️ Tails RPG Project - Character Sheet Creation and Management System 🛡️

## 📋 Description

This project is a system for creating and managing RPG campaigns, specifically designed for *Gaia: The Prelude*. It allows game masters and players to create, manage, and participate in campaigns, as well as configure character sheets. The system is divided into steps to set up characters, define attributes and skills, and create campaigns where players can interact.

### 🚀 Key Features
- **Character Sheet Creation**: Create character sheets with attributes, equipment, and skills.
- **Campaign Management**: Game masters can create campaigns and add other players' character sheets.
- **Campaign Participation**: Players can search for campaigns and request to join them.
- **Secure Authentication**: Utilizes JWT for authentication, ensuring each user accesses only their own character sheets and campaigns.
- **Responsive Interface**: Frontend styled with Tailwind CSS.

## 🛠️ Technologies Used

### Backend
- **Node.js**: Platform for building the server.
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database integration.
- **MongoDB**: NoSQL database for data persistence.
- **JWT (JSON Web Token)**: For user authentication and authorization.

### Frontend
- **React**: JavaScript library for building the interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client to consume the API.

## 📂 Project Structure

```
📂 projeto-rpg
├── 📁 backend
│   ├── controllers/
│   ├── routes/
│   ├── model/
│   ├── prisma/
│   ├── utils/
│   ├── middlewares/
│   └── server.js
├── 📁 frontend
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
└── 📄 README.md
```

## ⚙️ Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)

## 🚀 How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/alinirv/sysTails
cd projeto-rpg
```

### 2. Backend Setup

```bash
cd app
npm install
```
Create a `.env` file with the following variables:
```
DATABASE_URL=mongodb://localhost:27017/projeto-rpg
JWT_SECRET=your_secret_key
PORT=4000
```

**Start the serverr**
```bash
npx prisma generate
npx prisma migrate dev
node --watch server.js
```

### 3. Frontend Setup

```bash
cd api
npm install
```

**Start the frontend**
```bash
npm run dev
```
The project will be available at http://localhost:.

## 🔄 Development Flow

1. **Login**: Users need to authenticat .
2. **Dashboard**: Logged-in area with access to character sheets and campaigns.
3. **Criação de Fichas**: Sheet Creation: Set up attributes, equipment, and skills.
4. **Campanhas**: Create, manage, and join campaigns.


## 🛡️ License

This software was developed for non-commercial, didactic purposes. It is provided through GNU GPLv3.

