import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FilePlus,
  FolderOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Users,
  TrendingUp,
} from "lucide-react"

// Mock data for the dashboard
const recentCases = [
  {
    id: "CASE-2024-001",
    title: "Property Dispute - Ancestral Land",
    category: "Property Dispute",
    status: "in_progress",
    date: "2024-12-15",
  },
  {
    id: "CASE-2024-002",
    title: "Consumer Rights - Defective Product",
    category: "Consumer Rights",
    status: "submitted",
    date: "2024-12-20",
  },
  {
    id: "CASE-2024-003",
    title: "Labour Law - Wrongful Termination",
    category: "Labour Law",
    status: "under_review",
    date: "2024-12-22",
  },
]

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  submitted: { label: "Submitted", variant: "secondary" },
  under_review: { label: "Under Review", variant: "outline" },
  in_progress: { label: "In Progress", variant: "default" },
  resolved: { label: "Resolved", variant: "secondary" },
  closed: { label: "Closed", variant: "secondary" },
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Welcome back, Priya
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Here's an overview of your cases and recent activity."}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <FolderOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Total Cases</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-warning/10">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Lawyers Matched</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="border-dashed border-primary/30 bg-primary/5 transition-colors hover:border-primary/50">
          <CardContent className="flex items-center gap-4 pt-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <FilePlus className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Submit a New Case</h3>
              <p className="text-sm text-muted-foreground">
                Describe your legal issue and get matched with a lawyer
              </p>
            </div>
            <Button size="sm" asChild>
              <Link href="/dashboard/submit-case">
                Start
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:border-primary/20">
          <CardContent className="flex items-center gap-4 pt-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
              <TrendingUp className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Find a Lawyer</h3>
              <p className="text-sm text-muted-foreground">
                Browse verified lawyers by specialization and location
              </p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/dashboard/lawyers">
                Browse
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Cases</CardTitle>
              <CardDescription>Your most recent case submissions</CardDescription>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/dashboard/cases">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {recentCases.map((c) => {
              const status = statusConfig[c.status] || statusConfig.submitted
              return (
                <Link
                  key={c.id}
                  href={`/dashboard/cases/${c.id}`}
                  className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {c.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {c.category} &middot; {c.id}
                    </p>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                  <ChevronIndicator />
                </Link>
              )
            })}
          </div>
          {recentCases.length === 0 && (
            <div className="py-8 text-center">
              <FolderOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No cases submitted yet
              </p>
              <Button size="sm" className="mt-4" asChild>
                <Link href="/dashboard/submit-case">Submit Your First Case</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ChevronIndicator() {
  return (
    <ArrowRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
  )
}
