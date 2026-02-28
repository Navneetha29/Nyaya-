"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { CASE_CATEGORIES, INDIAN_STATES } from "@/lib/constants"
import { toast } from "sonner"

const caseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .min(20, "Please provide at least 20 characters of description"),
  state: z.string().min(1, "Please select a state"),
  district: z.string().min(2, "Please enter your district"),
  urgency: z.enum(["low", "medium", "high"]),
})

type CaseFormData = z.infer<typeof caseSchema>

export default function SubmitCasePage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      urgency: "medium",
    },
  })

  async function onSubmit(data: CaseFormData) {
    // Mock submission
    console.log("Case submitted:", data)
    toast.success("Case submitted successfully! You will receive updates soon.")
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard" aria-label="Back to Dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Submit a New Case
          </h1>
          <p className="text-sm text-muted-foreground">
            Describe your legal issue and we will match you with the right
            lawyer
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Case Details</CardTitle>
          <CardDescription>
            Provide as much detail as possible about your legal issue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Case Title</Label>
              <Input
                id="title"
                placeholder="Brief title for your case"
                {...register("title")}
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Category & State Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select onValueChange={(val) => setValue("category", val)}>
                  <SelectTrigger aria-invalid={!!errors.category}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CASE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>State</Label>
                <Select onValueChange={(val) => setValue("state", val)}>
                  <SelectTrigger aria-invalid={!!errors.state}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-xs text-destructive">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            {/* District & Urgency */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  placeholder="Your district"
                  {...register("district")}
                  aria-invalid={!!errors.district}
                />
                {errors.district && (
                  <p className="text-xs text-destructive">
                    {errors.district.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Urgency Level</Label>
                <Select
                  defaultValue="medium"
                  onValueChange={(val) =>
                    setValue("urgency", val as "low" | "medium" | "high")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Not urgent</SelectItem>
                    <SelectItem value="medium">
                      Medium - Needs attention soon
                    </SelectItem>
                    <SelectItem value="high">High - Immediate help needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Describe Your Issue</Label>
              <Textarea
                id="description"
                rows={6}
                placeholder="Explain your legal issue in your own words. Include relevant dates, names, and any details that can help a lawyer understand your situation."
                {...register("description")}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Your information is kept confidential and shared only with
                assigned lawyers.
              </p>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button type="submit" className="gap-2" disabled={isSubmitting}>
                <Send className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Case"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
