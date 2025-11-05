import { useState, useEffect } from "react";
import { Login } from "./components/auth/login";
import { Signup } from "./components/auth/signup";
import { Navbar } from "./components/navigation/navbar";
import { AdminDashboard } from "./components/admin/admin-dashboard";
import { WorkshopManagement } from "./components/admin/workshop-management";
import { UserDashboard } from "./components/user/user-dashboard";
import { WorkshopBrowser } from "./components/user/workshop-browser";
import { WorkshopSession } from "./components/workshop/workshop-session";

export default function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [currentView, setCurrentView] = useState("dashboard");
  const [sessionWorkshop, setSessionWorkshop] = useState(null);

  // Restore user from localStorage on mount (so refresh keeps you logged in)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved);
        // sanity check that parsed has expected shape
        if (parsed && parsed.email && parsed.role) {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.warn("Failed to parse saved user:", err);
      localStorage.removeItem("user");
    }
  }, []);

  // When a user logs in, save to state AND localStorage
  const handleLogin = (email, role) => {
    const u = { email, role };
    setUser(u);
    // persist user to localStorage (token would go here too if you have one)
    localStorage.setItem("user", JSON.stringify(u));
    setCurrentView("dashboard");
    setAuthMode("login");
  };

  // When a user signs up, save to state AND localStorage
  const handleSignup = (email, role) => {
    const u = { email, role };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    setCurrentView("dashboard");
    setAuthMode("login");
  };

  // Logout: clear user from state AND localStorage and show login screen
  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (!ok) return;

    // Remove known auth keys (adjust if you store tokens under different keys)
    localStorage.removeItem("user");
    localStorage.removeItem("authToken"); // remove if you store a token
    // If you prefer wiping everything: localStorage.clear(); sessionStorage.clear();

    // Reset app state to show auth view
    setUser(null);
    setAuthMode("login");
    setCurrentView("dashboard");
  };

  const handleViewChange = (view) => {
    if (view === "session") {
      // Mock workshop data for session
      setSessionWorkshop({
        id: "1",
        title: "React Advanced Patterns",
        instructor: "Sarah Johnson",
        date: "2025-01-15",
        time: "10:00 AM",
        duration: "2 hours",
      });
    }
    setCurrentView(view);
  };

  const handleLeaveSession = () => {
    setSessionWorkshop(null);
    setCurrentView("dashboard");
  };

  // Authentication views
  if (!user) {
    if (authMode === "login") {
      return (
        <Login
          onLogin={handleLogin}
          onToggleMode={() => setAuthMode("signup")}
        />
      );
    } else {
      return (
        <Signup
          onSignup={handleSignup}
          onToggleMode={() => setAuthMode("login")}
        />
      );
    }
  }

  // Session view (full screen)
  if (currentView === "session" && sessionWorkshop) {
    return (
      <WorkshopSession
        workshop={sessionWorkshop}
        onLeaveSession={handleLeaveSession}
      />
    );
  }

  // Main application views
  return (
    <div className="min-h-screen bg-background">
      <Navbar
        userRole={user.role}
        userEmail={user.email}
        currentView={currentView}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
      />

      <main className="min-h-[calc(100vh-80px)]">
        {/* Admin Views */}
        {user.role === "admin" && (
          <>
            {currentView === "dashboard" && (
              <AdminDashboard onViewChange={handleViewChange} />
            )}
            {(currentView === "workshops" ||
              currentView === "create-workshop") && <WorkshopManagement />}
            {currentView === "attendees" && (
              <div className="p-6">
                <h1>Attendee Management</h1>
                <p className="text-muted-foreground">
                  Manage workshop registrations and attendee information
                </p>
                {/* Attendee management component would go here */}
              </div>
            )}
            {currentView === "materials" && (
              <div className="p-6">
                <h1>Training Materials</h1>
                <p className="text-muted-foreground">
                  Upload and manage workshop resources and materials
                </p>
                {/* Materials management component would go here */}
              </div>
            )}
          </>
        )}

        {/* User Views */}
        {user.role === "user" && (
          <>
            {currentView === "dashboard" && (
              <UserDashboard onViewChange={handleViewChange} />
            )}
            {currentView === "browse" && <WorkshopBrowser />}
            {currentView === "my-workshops" && (
              <div className="p-6">
                <h1>My Workshops</h1>
                <p className="text-muted-foreground">
                  View your registered and completed workshops
                </p>
                {/* My workshops component would go here */}
              </div>
            )}
            {currentView === "resources" && (
              <div className="p-6">
                <h1>My Resources</h1>
                <p className="text-muted-foreground">
                  Access downloaded materials and certificates
                </p>
                {/* Resources component would go here */}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
