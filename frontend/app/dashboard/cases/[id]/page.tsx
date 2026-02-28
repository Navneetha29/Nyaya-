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
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react"

// Mock case detail data
const caseDetail = {
  id: "CASE-2024-001",
  title: "Property Dispute - Ancestral Land in Pune",
  category: "Property Dispute",
  status: "in_progress",
  urgency: "medium",
  date: "2024-12-15",
  state: "Maharashtra",
  district: "Pune",
  description:
    "There is an ongoing dispute regarding ancestral property located in Pune district. The land measuring approximately 2 acres has been in our family for three generations. Recently, a distant relative has claimed ownership and has filed a claim in the local court. We need legal representation to establish our rightful claim based on the succession records and historical land documents that we possess.",
  lawyer: {
    name: "Adv. Rajesh Mehta",
    specialization: "Property Law",
    experience: "15 years",
    phone: "+91 98765 12345",
  },
  timeline: [
    {
      date: "2024-12-15",
      event: "Case submitted",
      description: "Case was submitted through NYAYA platform",
    },
    {
      date: "2024-12-17",
      event: "Under review",
      description: "Case assigned for initial review",
    },
    {
      date: "2024-12-19",
      event: "Lawyer assigned",
      description: "Adv. Rajesh Mehta accepted the case",
    },
    {
      date: "2024-12-22",
      event: "In progress",
      description: "Document review initiated; first consultation scheduled",
    },
  ],
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  submitted: { label: "Submitted", variant: "secondary" },
  under_review: { label: "Under Review", variant: "outline" },
  in_progress: { label: "In Progress", variant: "default" },
  resolved: { label: "Resolved", variant: "secondary" },
}

const urgencyConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  low: { label: "Low", variant: "secondary" },
  medium: { label: "Medium", variant: "default" },
  high: { label: "High", variant: "destructive" },
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const status = statusConfig[caseDetail.status] || statusConfig.submitted
  const urgency = urgencyConfig[caseDetail.urgency] || urgencyConfig.medium

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild className="mt-1">
          <Link href="/dashboard/cases" aria-label="Back to cases">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
              {caseDetail.title}
            </h1>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant={urgency.variant}>Urgency: {urgency.label}</Badge>
            <span className="text-xs text-muted-foreground">{id}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Case Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Case Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground">
                {caseDetail.description}
              </p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Case Timeline
              </CardTitle>
              <CardDescription>Progress updates for your case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex flex-col gap-6 pl-6">
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-border" />
                {caseDetail.timeline.map((entry, i) => (
                  <div key={i} className="relative flex gap-4">
                    <div className="absolute -left-6 mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-primary bg-card">
                      {i === caseDetail.timeline.length - 1 ? (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      ) : (
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {entry.event}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {entry.description}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {entry.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Case Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Case Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium text-foreground">
                    {caseDetail.category}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">
                    {caseDetail.district}, {caseDetail.state}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Submitted On</p>
                  <p className="font-medium text-foreground">
                    {caseDetail.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Lawyer */}
          {caseDetail.lawyer && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-primary" />
                  Assigned Lawyer
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {caseDetail.lawyer.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {caseDetail.lawyer.specialization} &middot;{" "}
                    {caseDetail.lawyer.experience}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Contact Lawyer
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
