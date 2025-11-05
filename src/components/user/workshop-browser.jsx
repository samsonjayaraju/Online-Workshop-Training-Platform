import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import { Calendar, Clock, Users, Search, Filter, Star } from "lucide-react"
import { ImageWithFallback } from "../figma/ImageWithFallback"

export function WorkshopBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [registeredWorkshops, setRegisteredWorkshops] = useState(new Set())

  const workshops = [
    {
      id: "1",
      title: "React Advanced Patterns",
      description:
        "Master advanced React patterns including render props, HOCs, custom hooks, and context patterns for building scalable applications.",
      instructor: "Sarah Johnson",
      date: "2025-01-15",
      time: "10:00 AM",
      duration: "2 hours",
      price: "Free",
      category: "Development",
      level: "Advanced",
      attendees: 25,
      maxAttendees: 30,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1750768145390-f0ad18d3e65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBtZWV0aW5nJTIwb25saW5lJTIwd29ya3Nob3B8ZW58MXx8fHwxNzU4NzAyNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: "2",
      title: "UX Design Fundamentals",
      description:
        "Learn the core principles of user experience design, from user research to prototyping and testing.",
      instructor: "Mike Chen",
      date: "2025-01-18",
      time: "2:00 PM",
      duration: "1.5 hours",
      price: "$29",
      category: "Design",
      level: "Beginner",
      attendees: 18,
      maxAttendees: 20,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1758691736722-cda1858056e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsZWFybmluZyUyMHRyYWluaW5nfGVufDF8fHx8MTc1ODcwMjc5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["UX", "Design", "User Research"]
    },
    {
      id: "3",
      title: "Digital Marketing Strategy",
      description:
        "Complete guide to digital marketing strategies, from SEO and content marketing to social media and email campaigns.",
      instructor: "John Smith",
      date: "2025-01-22",
      time: "11:00 AM",
      duration: "3 hours",
      price: "Free",
      category: "Marketing",
      level: "Intermediate",
      attendees: 12,
      maxAttendees: 25,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1750768145390-f0ad18d3e65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBtZWV0aW5nJTIwb25saW5lJTIwd29ya3Nob3B8ZW58MXx8fHwxNzU4NzAyNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Marketing", "SEO", "Social Media"]
    },
    {
      id: "4",
      title: "Python for Data Science",
      description:
        "Introduction to Python programming for data analysis, including pandas, numpy, and matplotlib.",
      instructor: "Lisa Wang",
      date: "2025-01-25",
      time: "3:00 PM",
      duration: "2.5 hours",
      price: "$49",
      category: "Data Science",
      level: "Beginner",
      attendees: 18,
      maxAttendees: 20,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1758691736722-cda1858056e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsZWFybmluZyUyMHRyYWluaW5nfGVufDF8fHx8MTc1ODcwMjc5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Python", "Data Science", "Programming"]
    },
    {
      id: "5",
      title: "Business Strategy Essentials",
      description:
        "Learn fundamental business strategy concepts including market analysis, competitive positioning, and strategic planning.",
      instructor: "David Rodriguez",
      date: "2025-01-28",
      time: "1:00 PM",
      duration: "2 hours",
      price: "$39",
      category: "Business",
      level: "Intermediate",
      attendees: 8,
      maxAttendees: 15,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1750768145390-f0ad18d3e65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBtZWV0aW5nJTIwb25saW5lJTIwd29ya3Nob3B8ZW58MXx8fHwxNzU4NzAyNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Business", "Strategy", "Planning"]
    },
    {
      id: "6",
      title: "Advanced JavaScript Concepts",
      description:
        "Deep dive into advanced JavaScript topics including closures, prototypes, async programming, and design patterns.",
      instructor: "Alex Thompson",
      date: "2025-02-01",
      time: "4:00 PM",
      duration: "2.5 hours",
      price: "$59",
      category: "Development",
      level: "Advanced",
      attendees: 22,
      maxAttendees: 25,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1758691736722-cda1858056e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsZWFybmluZyUyMHRyYWluaW5nfGVufDF8fHx8MTc1ODcwMjc5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["JavaScript", "Programming", "Frontend"]
    }
  ]

  const categories = [
    "Development",
    "Design",
    "Marketing",
    "Data Science",
    "Business"
  ]
  const levels = ["Beginner", "Intermediate", "Advanced"]

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesCategory =
      !selectedCategory || workshop.category === selectedCategory
    const matchesLevel = !selectedLevel || workshop.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const handleRegister = workshopId => {
    const newRegistered = new Set(registeredWorkshops)
    if (newRegistered.has(workshopId)) {
      newRegistered.delete(workshopId)
    } else {
      newRegistered.add(workshopId)
    }
    setRegisteredWorkshops(newRegistered)
  }

  const getLevelColor = level => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Browse Workshops</h1>
        <p className="text-muted-foreground">
          Discover and register for upcoming workshops
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workshops, instructors, or topics..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredWorkshops.length} of {workshops.length} workshops
        </p>
      </div>

      {/* Workshop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkshops.map(workshop => (
          <Card key={workshop.id} className="overflow-hidden">
            <div className="relative">
              <ImageWithFallback
                src={workshop.image}
                alt={workshop.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary">{workshop.category}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className={getLevelColor(workshop.level)}>
                  {workshop.level}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="line-clamp-2">{workshop.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{workshop.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    by {workshop.instructor}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-3">
                {workshop.description}
              </CardDescription>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {workshop.date} at {workshop.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{workshop.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {workshop.attendees}/{workshop.maxAttendees} registered
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {workshop.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-lg font-semibold">{workshop.price}</span>
                <Button
                  onClick={() => handleRegister(workshop.id)}
                  variant={
                    registeredWorkshops.has(workshop.id)
                      ? "secondary"
                      : "default"
                  }
                  disabled={workshop.attendees >= workshop.maxAttendees}
                >
                  {registeredWorkshops.has(workshop.id)
                    ? "Registered"
                    : workshop.attendees >= workshop.maxAttendees
                    ? "Full"
                    : "Register"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkshops.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No workshops found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all workshops
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("")
                setSelectedLevel("")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
