import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bell,
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
} from "lucide-react"

const notifications = [
  {
    id: "n1",
    type: "case_update",
    title: "Case CASE-2024-001 Update",
    message:
      "Adv. Rajesh Mehta has scheduled your first consultation for January 3, 2025.",
    time: "2 hours ago",
    read: false,
    icon: FileText,
  },
  {
    id: "n2",
    type: "lawyer_assigned",
    title: "Lawyer Assigned",
    message:
      "Adv. Sunita Desai has been assigned to your case CASE-2024-003 (Labour Law).",
    time: "1 day ago",
    read: false,
    icon: User,
  },
  {
    id: "n3",
    type: "status_change",
    title: "Case Status Changed",
    message:
      "Your case CASE-2024-004 has been marked as Resolved. Please review and confirm.",
    time: "3 days ago",
    read: false,
    icon: CheckCircle2,
  },
  {
    id: "n4",
    type: "reminder",
    title: "Document Reminder",
    message:
      "Please upload the pending documents for case CASE-2024-001 before December 30.",
    time: "5 days ago",
    read: true,
    icon: AlertCircle,
  },
  {
    id: "n5",
    type: "system",
    title: "Welcome to NYAYA",
    message:
      "Your account has been successfully created. Start by submitting your first case.",
    time: "1 week ago",
    read: true,
    icon: Bell,
  },
]

const typeConfig: Record<string, { color: string }> = {
  case_update: { color: "bg-primary/10 text-primary" },
  lawyer_assigned: { color: "bg-success/10 text-success" },
  status_change: { color: "bg-warning/10 text-warning-foreground" },
  reminder: { color: "bg-destructive/10 text-destructive" },
  system: { color: "bg-muted text-muted-foreground" },
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground">
            Stay updated on your cases and platform activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="default">{unreadCount} unread</Badge>
          )}
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        {notifications.map((n) => {
          const Icon = n.icon
          const config = typeConfig[n.type] || typeConfig.system
          return (
            <Card
              key={n.id}
              className={
                n.read
                  ? "opacity-70"
                  : "border-primary/10"
              }
            >
              <CardContent className="flex items-start gap-4 pt-0">
                <div
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {n.title}
                    </p>
                    {!n.read && (
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {n.message}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {n.time}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  aria-label="Delete notification"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
