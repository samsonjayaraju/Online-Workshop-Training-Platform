import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Textarea } from "../ui/textarea"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  Share2,
  Hand,
  Download,
  FileText
} from "lucide-react"

export function WorkshopSession({ workshop, onLeaveSession }) {
  const [hasVideo, setHasVideo] = useState(true)
  const [hasAudio, setHasAudio] = useState(true)
  const [handRaised, setHandRaised] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [chatMessage, setChatMessage] = useState("")

  const participants = [
    {
      id: "1",
      name: "Sarah Johnson (Presenter)",
      isPresenter: true,
      hasVideo: true,
      hasAudio: true,
      hasHandRaised: false
    },
    {
      id: "2",
      name: "You",
      isPresenter: false,
      hasVideo: hasVideo,
      hasAudio: hasAudio,
      hasHandRaised: handRaised
    },
    {
      id: "3",
      name: "Mike Chen",
      isPresenter: false,
      hasVideo: true,
      hasAudio: false,
      hasHandRaised: false
    },
    {
      id: "4",
      name: "Emily Davis",
      isPresenter: false,
      hasVideo: false,
      hasAudio: true,
      hasHandRaised: true
    },
    {
      id: "5",
      name: "Alex Rodriguez",
      isPresenter: false,
      hasVideo: true,
      hasAudio: true,
      hasHandRaised: false
    }
  ]

  const chatMessages = [
    {
      id: "1",
      sender: "Sarah Johnson",
      message: "Welcome everyone! We'll start in just a moment.",
      timestamp: "10:00 AM"
    },
    {
      id: "2",
      sender: "Mike Chen",
      message: "Thanks for hosting this session!",
      timestamp: "10:01 AM"
    },
    {
      id: "3",
      sender: "Emily Davis",
      message: "Looking forward to learning about React patterns.",
      timestamp: "10:02 AM"
    },
    {
      id: "4",
      sender: "Sarah Johnson",
      message: "Great! Let's dive into our first topic - render props.",
      timestamp: "10:03 AM"
    }
  ]

  const resources = [
    { name: "Slide Deck - React Patterns.pdf", type: "PDF", size: "2.4 MB" },
    { name: "Code Examples.zip", type: "ZIP", size: "1.2 MB" },
    { name: "Additional Resources.txt", type: "TXT", size: "856 KB" }
  ]

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message to the server
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-lg font-semibold">{workshop.title}</h1>
              <p className="text-sm text-gray-300">
                with {workshop.instructor} • {workshop.date} at {workshop.time}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-600 text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              Live
            </Badge>
            <Button variant="destructive" onClick={onLeaveSession}>
              Leave Session
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 h-[calc(100vh-80px)]">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Presenter Video */}
          <div className="flex-1 bg-gray-800 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-700 rounded-lg p-8 text-center text-white">
                <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                <Badge className="bg-blue-600">Presenter</Badge>
              </div>
            </div>

            {/* Screen Share Indicator */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-600 text-white">
                <Share2 className="h-4 w-4 mr-1" />
                Screen Sharing
              </Badge>
            </div>
          </div>

          {/* Control Bar */}
          <div className="bg-gray-900 p-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={hasAudio ? "secondary" : "destructive"}
                size="sm"
                onClick={() => setHasAudio(!hasAudio)}
                className="flex items-center space-x-2"
              >
                {hasAudio ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4" />
                )}
                <span>{hasAudio ? "Mute" : "Unmute"}</span>
              </Button>

              <Button
                variant={hasVideo ? "secondary" : "destructive"}
                size="sm"
                onClick={() => setHasVideo(!hasVideo)}
                className="flex items-center space-x-2"
              >
                {hasVideo ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <VideoOff className="h-4 w-4" />
                )}
                <span>{hasVideo ? "Stop Video" : "Start Video"}</span>
              </Button>

              <Button
                variant={handRaised ? "default" : "secondary"}
                size="sm"
                onClick={() => setHandRaised(!handRaised)}
                className="flex items-center space-x-2"
              >
                <Hand className="h-4 w-4" />
                <span>{handRaised ? "Lower Hand" : "Raise Hand"}</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowChat(!showChat)}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {/* Sidebar Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button className="flex-1 px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                  Chat
                </button>
                <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Participants ({participants.length})
                </button>
                <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Resources
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map(message => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{message.message}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  className="flex-1 min-h-[80px] resize-none"
                  onKeyPress={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Resources Panel */}
      <div className="fixed bottom-4 right-4 w-80">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Session Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{resource.name}</p>
                    <p className="text-xs text-gray-500">
                      {resource.type} • {resource.size}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
