# 🏥 MediSync Frontend (Client)

> **Note:** This README is for the **frontend** (client) application only. The backend (API/server) has its own README located in the backend folder (`helthcare-server/MediSync-Server/README.md`).

---

# 🏥 MediSync Management Platform

A comprehensive MediSync management system built with Next.js 15, TypeScript, and Material-UI, featuring role-based access control, video consultations, appointment management, and payment integration.

## 🚀 Live Demo

[Add your live demo link here]

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Key Features](#-key-features)
- [User Roles & Permissions](#-user-roles--permissions)
- [API Integration](#-api-integration)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## ✨ Features

### 🏠 Landing Page

- **Hero Section**: Modern, responsive design with call-to-action buttons
- **Specialists Showcase**: Display of medical specialties with filtering
- **Top Rated Doctors**: Featured doctors with ratings and reviews
- **How It Works**: Step-by-step guide for users
- **Why Choose Us**: Value proposition and benefits

### 👥 Multi-Role Dashboard System

- **Patient Dashboard**: Appointment booking, medical history, video consultations
- **Doctor Dashboard**: Schedule management, patient consultations, profile management
- **Admin Dashboard**: Doctor management, appointment oversight, system administration
- **Super Admin**: Complete system control and user management

### 🎥 Video Consultation System

- **Agora Integration**: Real-time video calling with high-quality streaming
- **Mobile Support**: Responsive design for mobile devices
- **WebRTC Support**: Cross-browser compatibility
- **Token-based Security**: Secure video call authentication

### 📅 Appointment Management

- **Smart Scheduling**: Doctor availability and slot management
- **Status Tracking**: Real-time appointment status updates
- **Reminder System**: Automated appointment notifications
- **Calendar Integration**: Visual scheduling interface

### 💳 Payment Integration

- **Secure Payments**: Integrated payment gateway
- **Transaction History**: Complete payment records
- **Multiple Payment Methods**: Support for various payment options

## 🛠 Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Material-UI (MUI)**: Component library and theming
- **Redux Toolkit**: State management with RTK Query
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation
- **Tailwind CSS**: Utility-first CSS framework

### Backend Integration

- **RESTful APIs**: Custom backend with Express.js
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Multi-level user permissions
- **Database**: MongoDB with Mongoose ODM

### Video Calling

- **Agora SDK**: Real-time video communication
- **WebRTC**: Browser-based video calling
- **Mobile Optimization**: Responsive video interface

### Development Tools

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Git**: Version control

## 🏗 Architecture

### Frontend Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (withCommonLayout)/ # Public pages with common layout
│   └── (withDashboardLayout)/ # Protected dashboard pages
├── components/             # Reusable UI components
├── redux/                  # State management
│   ├── api/               # RTK Query API slices
│   └── store.ts           # Redux store configuration
├── types/                 # TypeScript type definitions
├── services/              # API service functions
├── utils/                 # Utility functions
└── middleware.ts          # Next.js middleware for auth
```

### Key Design Patterns

- **Component Composition**: Modular, reusable components
- **Custom Hooks**: Logic separation and reusability
- **Type Safety**: Comprehensive TypeScript implementation
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant components

## 🔑 Key Features

### 1. Authentication & Authorization

- JWT-based authentication
- Role-based route protection
- Secure cookie management
- Password reset functionality

### 2. Real-time Video Consultations

- High-quality video streaming
- Screen sharing capabilities
- Chat functionality during calls
- Call recording (optional)

### 3. Appointment System

- Doctor availability management
- Patient appointment booking
- Automated scheduling
- Appointment reminders

### 4. Payment Processing

- Secure payment gateway integration
- Multiple payment methods
- Transaction history
- Invoice generation

### 5. Admin Management

- Doctor profile management
- Patient data oversight
- System analytics
- User role management

## 👤 User Roles & Permissions

### Patient

- Book appointments with doctors
- View medical history
- Participate in video consultations
- Manage profile information
- View payment history

### Doctor

- Manage appointment schedule
- Conduct video consultations
- Update profile and specialties
- View patient information
- Manage availability

### Admin

- Manage doctor accounts
- Oversee appointments
- Monitor system usage
- Handle user support
- Generate reports

### Super Admin

- Complete system control
- User role management
- System configuration
- Database administration
- Security management

## 🔌 API Integration

### RESTful Endpoints

- **Authentication**: `/api/v1/auth/*`
- **Users**: `/api/v1/user/*`
- **Doctors**: `/api/v1/doctor/*`
- **Appointments**: `/api/v1/appointment/*`
- **Payments**: `/api/v1/payment/*`
- **Video Calls**: `/api/v1/video-call/*`

### RTK Query Implementation

- Automatic caching and invalidation
- Optimistic updates
- Error handling
- Loading states
- Real-time data synchronization

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone [https://github.com/tanvirTheDev/MediSync-client.git]
   cd health-care
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env

## 🎯 Key Technical Achievements

### 1. **Modern React Patterns**

- Custom hooks for reusable logic
- Component composition patterns
- Type-safe props and state management

### 2. **Performance Optimization**

- Next.js App Router for optimal routing
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Redux Toolkit for efficient state management

### 3. **Security Implementation**

- JWT token-based authentication
- Role-based access control
- Secure API communication
- Input validation and sanitization

### 4. **User Experience**

- Responsive design for all devices
- Intuitive navigation and layouts
- Real-time updates and notifications
- Accessibility compliance

### 5. **Scalable Architecture**

- Modular component structure
- API-first design approach
- Type-safe development
- Comprehensive error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: [ahamedtanvir374@gmail.com]
- **LinkedIn**: [https://www.linkedin.com/in/tanvirthedev]
- **Portfolio**: [https://tanvir-portfolio-sable.vercel.app]

---

**Note**: This is a full-stack MediSync management platform demonstrating modern web development practices, real-time communication, and comprehensive user management systems.
```
#   d u t c h - e - b i k e  
 