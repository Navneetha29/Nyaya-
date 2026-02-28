"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Scale, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { APP_NAME, INDIAN_STATES } from "@/lib/constants"

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .min(10, "Enter a valid phone number")
      .max(15, "Enter a valid phone number"),
    state: z.string().min(1, "Please select your state"),
    role: z.enum(["citizen", "lawyer"], {
      required_error: "Please select a role",
    }),
    barCouncilNumber: z.string().optional(),
    specialization: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      data.role !== "lawyer" ||
      (data.barCouncilNumber && data.barCouncilNumber.trim().length >= 3),
    {
      message: "Bar Council Registration Number is required for lawyers",
      path: ["barCouncilNumber"],
    }
  )
  .refine(
    (data) =>
      data.role !== "lawyer" ||
      (data.specialization && data.specialization.trim().length >= 2),
    {
      message: "Specialization is required for lawyers",
      path: ["specialization"],
    }
  )

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "citizen",
    },
  })

  const selectedRole = watch("role")

  async function onSubmit(data: RegisterFormData) {
    console.log("Register attempt:", data.email)
    window.location.href = "/dashboard"
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Brand */}
      <div className="hidden flex-1 flex-col justify-between bg-primary p-10 lg:flex">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/20">
            <Scale className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">
            {APP_NAME}
          </span>
        </Link>
        <div>
          <h2 className="font-serif text-3xl font-bold text-primary-foreground">
            Join {APP_NAME} Today
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/70">
            Create your free account to submit legal cases, connect with
            verified lawyers, and track your case progress in real-time.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">
          {`\u00A9 ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.`}
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Scale className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                {APP_NAME}
              </span>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold text-foreground">
              Create Account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started with your free {APP_NAME} account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                autoComplete="name"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>State</Label>
              <Select onValueChange={(val) => setValue("state", val)}>
                <SelectTrigger aria-invalid={!!errors.state}>
                  <SelectValue placeholder="Select your state" />
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

            <div className="flex flex-col gap-2">
              <Label>I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background p-3 text-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    value="citizen"
                    {...register("role")}
                    className="accent-primary"
                    defaultChecked
                  />
                  Citizen
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background p-3 text-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="radio"
                    value="lawyer"
                    {...register("role")}
                    className="accent-primary"
                  />
                  Lawyer
                </label>
              </div>
            </div>

            {selectedRole === "lawyer" && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="barCouncilNumber">
                    Bar Council Registration Number
                  </Label>
                  <Input
                    id="barCouncilNumber"
                    placeholder="e.g. UP/1234/2020"
                    {...register("barCouncilNumber")}
                    aria-invalid={!!errors.barCouncilNumber}
                  />
                  {errors.barCouncilNumber && (
                    <p className="text-xs text-destructive">
                      {errors.barCouncilNumber.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    placeholder="e.g. Family Law, Criminal Law"
                    {...register("specialization")}
                    aria-invalid={!!errors.specialization}
                  />
                  {errors.specialization && (
                    <p className="text-xs text-destructive">
                      {errors.specialization.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Already have an account? "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
