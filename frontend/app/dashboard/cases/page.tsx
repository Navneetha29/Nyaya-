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
import { Input } from "@/components/ui/input"
import {
  FolderOpen,
  Search,
  ArrowRight,
  FilePlus,
  Calendar,
} from "lucide-react"

const allCases = [
  {
    id: "CASE-2024-001",
    title: "Property Dispute - Ancestral Land in Pune",
    category: "Property Dispute",
    status: "in_progress",
    date: "2024-12-15",
    lawyer: "Adv. Rajesh Mehta",
  },
  {
    id: "CASE-2024-002",
    title: "Consumer Rights - Defective Electronics Product",
    category: "Consumer Rights",
    status: "submitted",
    date: "2024-12-20",
    lawyer: null,
  },
  {
    id: "CASE-2024-003",
    title: "Labour Law - Wrongful Termination from IT Company",
    category: "Labour Law",
    status: "under_review",
    date: "2024-12-22",
    lawyer: "Adv. Sunita Desai",
  },
  {
    id: "CASE-2024-004",
    title: "Family Law - Maintenance and Custody",
    category: "Family Law",
    status: "resolved",
    date: "2024-11-10",
    lawyer: "Adv. Amit Joshi",
  },
]

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive"; color: string }
> = {
  submitted: { label: "Submitted", variant: "secondary", color: "bg-muted-foreground/20 text-muted-foreground" },
  under_review: { label: "Under Review", variant: "outline", color: "bg-warning/10 text-warning-foreground" },
  in_progress: { label: "In Progress", variant: "default", color: "bg-primary/10 text-primary" },
  resolved: { label: "Resolved", variant: "secondary", color: "bg-success/10 text-success" },
  closed: { label: "Closed", variant: "secondary", color: "bg-muted text-muted-foreground" },
}

export default function CasesPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            My Cases
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and manage all your submitted cases
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/submit-case">
            <FilePlus className="h-4 w-4" />
            New Case
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search your cases..."
          className="pl-9"
        />
      </div>

      {/* Cases List */}
      <div className="flex flex-col gap-3">
        {allCases.map((c) => {
          const status = statusConfig[c.status] || statusConfig.submitted
          return (
            <Link key={c.id} href={`/dashboard/cases/${c.id}`}>
              <Card className="transition-colors hover:border-primary/20 hover:shadow-sm">
                <CardContent className="flex items-center gap-4 pt-0">
                  <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                    <FolderOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {c.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{c.category}</span>
                      <span>&middot;</span>
                      <span>{c.id}</span>
                      {c.lawyer && (
                        <>
                          <span>&middot;</span>
                          <span>{c.lawyer}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                      <Calendar className="h-3 w-3" />
                      {c.date}
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <ArrowRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
