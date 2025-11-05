// src/components/navigation/navbar.jsx
"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  CalendarDays,
  Users,
  BookOpen,
  Settings,
  User,
  LogOut,
} from "lucide-react";

/**
 * Navbar
 *
 * Props:
 * - userRole: "admin" | "user"
 * - userEmail: string
 * - currentView: string
 * - onViewChange: function(view)
 * - onLogout: function()  <-- optional, fallback provided
 */
export function Navbar({
  userRole = "user",
  userEmail = "guest@domain.com",
  currentView,
  onViewChange = () => {},
  onLogout,
}) {
  const adminNavItems = [
    { key: "dashboard", label: "Dashboard", icon: CalendarDays },
    { key: "workshops", label: "Manage Workshops", icon: BookOpen },
    { key: "attendees", label: "Attendees", icon: Users },
    { key: "materials", label: "Materials", icon: BookOpen },
  ];

  const userNavItems = [
    { key: "dashboard", label: "Dashboard", icon: CalendarDays },
    { key: "browse", label: "Browse Workshops", icon: BookOpen },
    { key: "my-workshops", label: "My Workshops", icon: User },
    { key: "resources", label: "Resources", icon: BookOpen },
  ];

  const navItems = userRole === "admin" ? adminNavItems : userNavItems;

  // Fallback logout if parent didn't supply one (clears known localStorage keys and redirects)
  const fallbackLogout = () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (!ok) return;

    try {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      // If you prefer to clear everything: localStorage.clear(); sessionStorage.clear();
    } catch (err) {
      console.warn("Error clearing localStorage on logout:", err);
    } finally {
      // navigate to login route (adjust if your app uses a different path)
      window.location.href = "/login";
    }
  };

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      try {
        onLogout();
      } catch (err) {
        console.error("onLogout threw an error, falling back:", err);
        fallbackLogout();
      }
    } else {
      fallbackLogout();
    }
  };

  return (
    <nav className="bg-white border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">WorkshopHub</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onViewChange(item.key)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {userRole === "admin" ? "Admin" : "User"} • {userEmail}
          </div>

          {/* ---------- TEMP: Visible Logout + Settings buttons (always visible) ---------- */}
          {/* Replace this block later with your DropdownMenu if you want the dropdown again */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewChange("settings")}
              className="flex items-center px-3 py-2 rounded-md hover:bg-accent"
              type="button"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md hover:bg-accent bg-red-50 text-red-700"
              type="button"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
          {/* -------------------------------------------------------------------------------- */}
        </div>
      </div>
    </nav>
  );
}
