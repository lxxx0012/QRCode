QR Code Management Application
A full‑stack web application for generating, managing, and updating QR codes dynamically. The system was designed to support a static LEGO‑built QR code that can redirect to different URLs without modifying the physical code. The application provides a clean dashboard interface for creating and updating QR entries.

🚀 Features
- Generate unique QR codes with customizable destination URLs
- Update or change the URL behind an existing QR code
- Dashboard interface for viewing and managing all QR entries
- Responsive front‑end built with modern UI practices
- REST API for creating, retrieving, and updating QR code data

🛠️ Tech Stack
Front-End
- React.js
- HTML5, CSS3
- Axios
- Responsive UI components
Back-End
- Node.js
- Express.js
- REST API architecture
Database
- MongoDB (Mongoose ODM)
Tools
- Git & GitHub
- VS Code
- Postman
- npm / Node Package Manager

👨‍💻 My Contributions
- Implemented QR code generation and update logic
- Built dashboard components and UI layout
- Integrated front‑end with back‑end API endpoints
- Collaborated through GitHub for version control and debugging
- Helped structure the project for maintainability and clarity

📦 Installation & Setup
1. Clone the repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name


2. Install dependencies
Client
cd client
npm install


Server
cd server
npm install


3. Environment variables
Create a .env file in the server folder with:
MONGO_URI=your_mongodb_connection_string
PORT=5000


4. Run the application
Start the server
cd server
npm start


Start the client
cd client
npm start


The app will run at:
http://localhost:3000

📁 Project Structure
/client
  /src
    components/
    pages/
    App.js
    index.js

/server
  /routes
  /models
  /controllers
  server.js

README.md



🎯 Project Goal
The main objective was to create a system where a static physical QR code (built from LEGO bricks) could remain unchanged while its destination URL could be updated dynamically through a web interface. This required a combination of front‑end UI, back‑end logic, and database integration.

📌 Future Improvements
- User authentication for secure QR management
- Analytics dashboard (scan counts, traffic sources)
- Custom QR styling and downloadable images
- Deployment to Vercel / Netlify + Render / Railway

🤝 Contributors
- Team project for Humber College Web Development Program
- My role: Front‑end development, QR logic, dashboard UI, GitHub collaboration
