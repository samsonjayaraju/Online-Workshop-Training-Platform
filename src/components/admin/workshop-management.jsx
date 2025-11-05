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
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import { Calendar, Users, Clock, Edit, Trash2, Plus } from "lucide-react"

export function WorkshopManagement() {
  const [workshops, setWorkshops] = useState([
    {
      id: "1",
      title: "React Advanced Patterns",
      description:
        "Learn advanced React patterns including render props, HOCs, and custom hooks.",
      date: "2025-01-15",
      time: "10:00",
      duration: 120,
      maxAttendees: 30,
      currentAttendees: 25,
      status: "published",
      category: "Development"
    },
    {
      id: "2",
      title: "UX Design Fundamentals",
      description:
        "Introduction to user experience design principles and best practices.",
      date: "2025-01-18",
      time: "14:00",
      duration: 90,
      maxAttendees: 20,
      currentAttendees: 18,
      status: "published",
      category: "Design"
    },
    {
      id: "3",
      title: "Digital Marketing Strategy",
      description:
        "Complete guide to digital marketing strategies and implementation.",
      date: "2025-01-22",
      time: "11:00",
      duration: 180,
      maxAttendees: 25,
      currentAttendees: 12,
      status: "draft",
      category: "Marketing"
    }
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingWorkshop, setEditingWorkshop] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    maxAttendees: "",
    category: ""
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      maxAttendees: "",
      category: ""
    })
  }

  const handleCreateWorkshop = e => {
    e.preventDefault()
    const newWorkshop = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      duration: parseInt(formData.duration),
      maxAttendees: parseInt(formData.maxAttendees),
      currentAttendees: 0,
      status: "draft",
      category: formData.category
    }

    setWorkshops([...workshops, newWorkshop])
    setIsCreateModalOpen(false)
    resetForm()
  }

  const handleEditWorkshop = workshop => {
    setEditingWorkshop(workshop)
    setFormData({
      title: workshop.title,
      description: workshop.description,
      date: workshop.date,
      time: workshop.time,
      duration: workshop.duration.toString(),
      maxAttendees: workshop.maxAttendees.toString(),
      category: workshop.category
    })
  }

  const handleUpdateWorkshop = e => {
    e.preventDefault()
    if (!editingWorkshop) return

    const updatedWorkshop = {
      ...editingWorkshop,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      duration: parseInt(formData.duration),
      maxAttendees: parseInt(formData.maxAttendees),
      category: formData.category
    }

    setWorkshops(
      workshops.map(w => (w.id === editingWorkshop.id ? updatedWorkshop : w))
    )
    setEditingWorkshop(null)
    resetForm()
  }

  const handleDeleteWorkshop = id => {
    if (confirm("Are you sure you want to delete this workshop?")) {
      setWorkshops(workshops.filter(w => w.id !== id))
    }
  }

  const toggleWorkshopStatus = id => {
    setWorkshops(
      workshops.map(w =>
        w.id === id
          ? { ...w, status: w.status === "published" ? "draft" : "published" }
          : w
      )
    )
  }

  const getStatusColor = status => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const WorkshopForm = ({ onSubmit, workshop }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Workshop Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={e => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={e =>
              setFormData({ ...formData, duration: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxAttendees">Max Attendees</Label>
          <Input
            id="maxAttendees"
            type="number"
            value={formData.maxAttendees}
            onChange={e =>
              setFormData({ ...formData, maxAttendees: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={value => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="flex-1">
          {workshop ? "Update Workshop" : "Create Workshop"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            workshop ? setEditingWorkshop(null) : setIsCreateModalOpen(false)
            resetForm()
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Workshop Management</h1>
          <p className="text-muted-foreground">
            Create and manage your workshops
          </p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Workshop</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workshop</DialogTitle>
              <DialogDescription>
                Fill in the details for your new workshop
              </DialogDescription>
            </DialogHeader>
            <WorkshopForm onSubmit={handleCreateWorkshop} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Workshops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(workshop => (
          <Card key={workshop.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{workshop.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {workshop.description}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(workshop.status)}>
                  {workshop.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {workshop.date} at {workshop.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{workshop.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {workshop.currentAttendees}/{workshop.maxAttendees}{" "}
                    attendees
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditWorkshop(workshop)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleWorkshopStatus(workshop.id)}
                  className="flex-1"
                >
                  {workshop.status === "published" ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteWorkshop(workshop.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Workshop Dialog */}
      <Dialog
        open={!!editingWorkshop}
        onOpenChange={open => !open && setEditingWorkshop(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Workshop</DialogTitle>
            <DialogDescription>
              Update the details for your workshop
            </DialogDescription>
          </DialogHeader>
          <WorkshopForm
            onSubmit={handleUpdateWorkshop}
            workshop={editingWorkshop || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
