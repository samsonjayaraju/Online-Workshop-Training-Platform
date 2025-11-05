import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Calendar, Clock, Users, BookOpen, Play, Download } from "lucide-react"
import { ImageWithFallback } from "../figma/ImageWithFallback"

export function UserDashboard({ onViewChange }) {
  const registeredWorkshops = [
    {
      id: "1",
      title: "React Advanced Patterns",
      instructor: "Sarah Johnson",
      date: "2025-01-15",
      time: "10:00 AM",
      duration: "2 hours",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1750768145390-f0ad18d3e65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBtZWV0aW5nJTIwb25saW5lJTIwd29ya3Nob3B8ZW58MXx8fHwxNzU4NzAyNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      title: "UX Design Fundamentals",
      instructor: "Mike Chen",
      date: "2025-01-18",
      time: "2:00 PM",
      duration: "1.5 hours",
      status: "upcoming",
      image:
        "https://images.unsplash.com/photo-1758691736722-cda1858056e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsZWFybmluZyUyMHRyYWluaW5nfGVufDF8fHx8MTc1ODcwMjc5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ]

  const completedWorkshops = [
    {
      id: "3",
      title: "JavaScript Fundamentals",
      instructor: "Alex Rodriguez",
      completedDate: "2024-12-20",
      rating: 5,
      certificateAvailable: true
    },
    {
      id: "4",
      title: "Git & Version Control",
      instructor: "Emily Davis",
      completedDate: "2024-12-15",
      rating: 4,
      certificateAvailable: true
    }
  ]

  const recommendedWorkshops = [
    {
      id: "5",
      title: "Digital Marketing Strategy",
      instructor: "John Smith",
      date: "2025-01-22",
      time: "11:00 AM",
      price: "Free",
      category: "Marketing",
      attendees: 12,
      maxAttendees: 25
    },
    {
      id: "6",
      title: "Python for Data Science",
      instructor: "Lisa Wang",
      date: "2025-01-25",
      time: "3:00 PM",
      price: "$49",
      category: "Data Science",
      attendees: 18,
      maxAttendees: 20
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Welcome Back!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your workshops
          </p>
        </div>
        <Button
          onClick={() => onViewChange("browse")}
          className="flex items-center space-x-2"
        >
          <BookOpen className="h-4 w-4" />
          <span>Browse Workshops</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-semibold">
                  {registeredWorkshops.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">
                  {completedWorkshops.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Workshops */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Workshops</CardTitle>
            <CardDescription>Your registered workshops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registeredWorkshops.map(workshop => (
                <div key={workshop.id} className="border rounded-lg p-4">
                  <div className="flex space-x-4">
                    <ImageWithFallback
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-medium">{workshop.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          by {workshop.instructor}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{workshop.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{workshop.time}</span>
                        </div>
                      </div>
                      <Button size="sm" className="flex items-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>Join Session</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => onViewChange("my-workshops")}
            >
              View All My Workshops
            </Button>
          </CardContent>
        </Card>

        {/* Completed Workshops */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Completed</CardTitle>
            <CardDescription>Workshops you've finished</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedWorkshops.map(workshop => (
                <div key={workshop.id} className="border rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{workshop.title}</h4>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: workshop.rating }).map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 bg-yellow-400 rounded-full"
                          ></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      by {workshop.instructor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Completed on {workshop.completedDate}
                    </p>
                    {workshop.certificateAvailable && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Certificate</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => onViewChange("resources")}
            >
              View All Resources
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Workshops */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>
            Workshops you might be interested in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedWorkshops.map(workshop => (
              <div key={workshop.id} className="border rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{workshop.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        by {workshop.instructor}
                      </p>
                    </div>
                    <Badge variant="secondary">{workshop.category}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">{workshop.price}</span>
                    <span className="text-sm text-muted-foreground">
                      {workshop.attendees}/{workshop.maxAttendees} spots
                    </span>
                  </div>

                  <Button size="sm" className="w-full">
                    Register Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
