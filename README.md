# Video Mela - Frontend Web Application

[![Frontend Repository](https://img.shields.io/badge/GitHub-Frontend_Repo-61DAFB?style=for-the-badge&logo=react)](https://github.com/vikrant48/Video_Mela_frontend)
[![Backend Repository](https://img.shields.io/badge/GitHub-Backend_Repo-181717?style=for-the-badge&logo=github)](https://github.com/vikrant48/Video_Mela_backend)

A modern, highly responsive Single-Page Application (SPA) for **Video Mela**—a full-featured video streaming platform built with React 18, Vite, Redux Toolkit, React Hook Form, and Tailwind CSS.

---

## 🔗 Quick Links
- **Frontend GitHub Repo**: [https://github.com/vikrant48/Video_Mela_frontend](https://github.com/vikrant48/Video_Mela_frontend)
- **Backend GitHub Repo**: [https://github.com/vikrant48/Video_Mela_backend](https://github.com/vikrant48/Video_Mela_backend)
- **Data Model Workspace**: [Eraser.io Design Workspace](https://app.eraser.io/workspace/OO3HFmjKmUYmLl8JiwRk?origin=share)

---



## 🛠️ Technology Stack

- **Framework & Runtime**: React 18 & Vite
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS & Vanilla CSS
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios with custom interceptors
- **Icons & UI Utilities**: React Icons (`react-icons/io5`, `react-icons/fa`, `react-icons/ci`, `react-icons/md`) & `react-hot-toast`

---

## 📊 Application Architecture & Diagrams

### 1. Route Protection & Auth Popup Flow

```mermaid
flowchart TD
    A[User clicks route /watch or /upload] --> B[AuthLayout Wrapper]
    B --> C{Is User Logged In?}
    C -->|Yes| D[Render Protected Component]
    C -->|No| E[Blur Background & Freeze Interaction]
    E --> F[Display LoginPopup Overlay Modal]
    F --> G{User Action}
    G -->|Click Close X or Backdrop| H[Redirect to Home Page /]
    G -->|Submit Login Form| I[Dispatch userLogin Thunk]
    I -->|Success| D
```

---

### 2. Redux Toolkit Data & API Flow

```mermaid
sequenceDiagram
    autonumber
    actor UI as React Component
    participant Thunk as Redux Async Thunk
    participant Axios as axiosInstance.js
    participant Reducer as Redux Slice Reducer
    participant Store as Redux Store

    UI->>Thunk: dispatch(fetchVideos(params))
    Thunk->>Axios: axiosInstance.get('/videos')
    alt Delay > 2.5s (Render Cold Start)
        Axios-->>UI: toast.loading("Backend is connecting... Please be patient")
    end
    Axios-->>Thunk: API Response Payload
    alt Request Succeeded
        Axios-->>UI: toast.dismiss()
        Thunk->>Reducer: fulfillWithValue(data)
        Reducer->>Store: Update state.video.videos
        Store-->>UI: Re-render UI with new videos
    else Request Failed (401 / Network Error)
        Axios-->>UI: Interceptor handles / suppresses toast
        Thunk->>Reducer: rejectWithValue(error)
    end
```

---



