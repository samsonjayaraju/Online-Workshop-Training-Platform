import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Calendar, Users, BookOpen, TrendingUp, Plus } from "lucide-react"

export function AdminDashboard({ onViewChange }) {
  const stats = [
    {
      title: "Total Workshops",
      value: "24",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Active Registrations",
      value: "156",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "This Month",
      value: "8",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ]

  const upcomingWorkshops = [
    {
      id: "1",
      title: "React Advanced Patterns",
      date: "2025-01-15",
      time: "10:00 AM",
      attendees: 25,
      maxAttendees: 30,
      status: "confirmed"
    },
    {
      id: "2",
      title: "UX Design Fundamentals",
      date: "2025-01-18",
      time: "2:00 PM",
      attendees: 18,
      maxAttendees: 20,
      status: "confirmed"
    },
    {
      id: "3",
      title: "Digital Marketing Strategy",
      date: "2025-01-22",
      time: "11:00 AM",
      attendees: 12,
      maxAttendees: 25,
      status: "confirmed"
    }
  ]

  const recentRegistrations = [
    {
      name: "Sarah Johnson",
      workshop: "React Advanced Patterns",
      registeredAt: "2 hours ago"
    },
    {
      name: "Mike Chen",
      workshop: "UX Design Fundamentals",
      registeredAt: "4 hours ago"
    },
    {
      name: "Emily Davis",
      workshop: "Digital Marketing Strategy",
      registeredAt: "6 hours ago"
    },
    {
      name: "Alex Rodriguez",
      workshop: "React Advanced Patterns",
      registeredAt: "1 day ago"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your workshops and track performance
          </p>
        </div>
        <Button
          onClick={() => onViewChange("create-workshop")}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Workshop</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Workshops */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Workshops</CardTitle>
            <CardDescription>
              Workshops scheduled for the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingWorkshops.map(workshop => (
                <div
                  key={workshop.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{workshop.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {workshop.date} at {workshop.time}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="secondary">
                      {workshop.attendees}/{workshop.maxAttendees} attendees
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {workshop.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => onViewChange("workshops")}
            >
              View All Workshops
            </Button>
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>Latest workshop registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRegistrations.map((registration, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{registration.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {registration.workshop}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {registration.registeredAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => onViewChange("attendees")}
            >
              View All Registrations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
