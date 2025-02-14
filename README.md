# Blog Frontend

This is the **frontend** for the Blog Project, built using **React, TypeScript, Redux, and Tailwind CSS**.  
It provides an interactive user interface for **authentication, creating/editing posts, and viewing blog content**.

## 🚀 Features

- **User Authentication** (Login/Register with JWT)  
- **Create, Read, Update, and Delete (CRUD) Posts**  
- **Profile Management** (Update user details & profile image)  
- **Dark Mode Support** (Using Tailwind & Next Themes)  
- **File Uploads** (For profile images and post attachments)  
- **Redux Toolkit for State Management**  
- **Fully Responsive UI (Tailwind CSS)**  

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/arvinzaferani/blog-front-end.git
cd blog-front-end
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a **`.env`** file in the root directory and add:  
```env
VITE_API_BASE_URL=https://your-backend-api.com
```
Replace `https://your-backend-api.com` with your actual **backend URL**.

### 4️⃣ Start the Development Server  
```bash
npm run dev
```
The app will be available at **`http://localhost:5173`**.

---

## 🚀 Running with Docker  

### 1️⃣ Build Docker Image  
```bash
docker build -t blog-frontend .
```

### 2️⃣ Run Docker Container  
```bash
docker run -p 3000:80 blog-frontend
```
Now, the frontend will be available at **`http://localhost:3000`**.

---

## 📖 Project Structure  
```
blog-front-end/
│── src/
│   ├── components/        # Reusable UI Components
│   ├── features/          # Redux Slices (Auth, Posts, Alerts)
│   ├── views/             # Page Views (Home, Profile, Login)
│   ├── router/            # React Router Configuration
│   ├── store/             # Redux Store Setup
│   ├── service/           # API Calls (Axios)
│   ├── assets/            # Images, Icons, and Static Files
│   ├── types/             # TypeScript Interfaces & Types
│   ├── App.tsx            # Main Application Component
│   ├── main.tsx           # Root File
│── public/                # Static Assets
│── .env                   # Environment Variables
│── package.json           # Project Dependencies
│── tailwind.config.js      # Tailwind CSS Configuration
```

---

## 📖 API Endpoints (Consumes Backend API)  

### **Auth Routes**  
| Method | Endpoint          | Description               |
|--------|------------------|---------------------------|
| `POST` | `/auth/register` | Register a new user      |
| `POST` | `/auth/login`    | Login and get JWT token  |

### **User Routes**  
| Method | Endpoint       | Description                  |
|--------|---------------|------------------------------|
| `GET`  | `/users`      | Get current user info       |
| `PUT`  | `/users`      | Update user profile         |

### **Post Routes**  
| Method | Endpoint          | Description                    |
|--------|------------------|--------------------------------|
| `POST` | `/posts`        | Create a new post             |
| `GET`  | `/posts`        | Get all posts                 |
| `GET`  | `/posts/:id`    | Get a single post by ID       |
| `PUT`  | `/posts/:id`    | Update a post                 |
| `DELETE` | `/posts/:id`  | Delete a post                 |

### **File Upload Route**  
| Method | Endpoint          | Description            |
|--------|------------------|------------------------|
| `POST` | `/upload`        | Upload a file         |

---

## 🛠 Technologies Used  

- **React (Vite)** - Fast frontend development  
- **TypeScript** - Type safety and better development experience  
- **Redux Toolkit** - State management  
- **React Router** - Frontend routing  
- **Tailwind CSS** - Styling and responsive design  
- **Axios** - API calls to the backend  
- **Docker** - Containerization for easy deployment  

---

## 🎯 Contributing  

Contributions are welcome! Please follow these steps:  
1. **Fork** the repo  
2. **Create a new branch** (`feature-new`)  
3. **Commit your changes** (`git commit -m "Add new feature"`)  
4. **Push to your branch** (`git push origin feature-new`)  
5. **Open a pull request**  

---

## 📜 License  
This project is licensed under the **MIT License**.  

---

## 🌎 Contact  
📧 **Email:** [arzaferani@gmail.com](mailto:arzaferani@gmail.com)  
🔗 **GitHub:** [arvinzaferani](https://github.com/arvinzaferani)  
