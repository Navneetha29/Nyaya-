import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Scale,
  Shield,
  Users,
  FileText,
  CheckCircle2,
  Phone,
  BookOpen,
  Gavel,
  AlertTriangle,
  Heart,
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Scale className="h-4 w-4 text-primary" />
            <span>Trusted by thousands across India</span>
          </div>
          <h1 className="text-balance font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Access to Justice for{" "}
            <span className="text-primary">Every Indian</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            NYAYA simplifies legal aid, connects you with verified lawyers, and
            empowers citizens with legal awareness. Get the help you need, when
            you need it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/women">{"Women's Legal Aid"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TheProblemSection() {
  return (
    <section className="border-y border-border bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            The Problem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Legal help should not start with confusion.
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-muted-foreground">
            Millions of Indians face legal challenges without knowing their
            rights, the correct procedures, or how to begin. NYAYA bridges this
            gap with AI-powered legal guidance.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="flex flex-col items-center gap-3 pt-0 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-3xl font-bold text-foreground">{"3.5 Cr+"}</p>
              <p className="text-sm font-semibold text-foreground">
                Pending court cases in India
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Many due to lack of proper legal guidance and improper document
                preparation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="flex flex-col items-center gap-3 pt-0 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                <Users className="h-5 w-5 text-warning-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground">70%</p>
              <p className="text-sm font-semibold text-foreground">
                Citizens lack legal awareness
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Most people do not know their basic rights or the procedures
                they must follow.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-3 pt-0 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Gavel className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">
                {"< 1 Lawyer"}
              </p>
              <p className="text-sm font-semibold text-foreground">
                Per 1,000 people
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Access to legal professionals is scarce, especially in Tier-2
                and Tier-3 cities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Submit Your Case",
      description:
        "Describe your legal issue in simple language. Our platform guides you through the process step by step.",
    },
    {
      icon: Users,
      title: "Connect with Lawyers",
      description:
        "Get matched with verified, experienced lawyers in your area who specialize in your type of case.",
    },
    {
      icon: Shield,
      title: "Women's Legal Portal",
      description:
        "Dedicated resources, rights information, and guided help for women facing legal challenges.",
    },
    {
      icon: CheckCircle2,
      title: "Track Progress",
      description:
        "Monitor your case status in real-time. Get updates and notifications at every stage.",
    },
    {
      icon: Phone,
      title: "Multilingual Support",
      description:
        "Access the platform in Hindi, English, and regional languages for better understanding.",
    },
    {
      icon: BookOpen,
      title: "Legal Awareness",
      description:
        "Learn about your rights through curated content written in simple, easy-to-understand language.",
    },
  ]

  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            How NYAYA Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            A simple, transparent process to get legal help
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function WomenLegalSupportSection() {
  return (
    <section className="bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Heart className="h-4 w-4" />
              <span>Women Legal Support</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Confidential Legal Guidance &amp; Verified Women Lawyers
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A safe, supportive space designed specifically for women seeking
              legal help. Access guided assistance, learn about your rights, and
              connect with verified women lawyers who understand your situation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="gap-2">
                <Link href="/women">
                  Enter Women Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: BookOpen,
                title: "Guided Help",
                description: "Step-by-step assistance for your situation",
                color: "bg-success/10 text-success",
              },
              {
                icon: Shield,
                title: "Know Your Rights",
                description: "Laws that protect women in India",
                color: "bg-primary/10 text-primary",
              },
              {
                icon: Users,
                title: "Women Lawyers",
                description: "Verified lawyers who specialize in women's issues",
                color: "bg-warning/10 text-warning-foreground",
              },
              {
                icon: Phone,
                title: "Emergency Help",
                description: "24/7 helpline numbers and safety resources",
                color: "bg-destructive/10 text-destructive",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="transition-all hover:shadow-md">
                  <CardContent className="flex flex-col items-center gap-2 pt-0 text-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Register & Describe Your Issue",
      description:
        "Create a free account and submit your legal issue in your own words. No legal jargon needed.",
    },
    {
      step: "02",
      title: "Get Matched with a Lawyer",
      description:
        "Our system matches you with verified lawyers who have relevant experience in your area.",
    },
    {
      step: "03",
      title: "Track & Resolve",
      description:
        "Track your case progress, communicate with your lawyer, and get timely updates on your case.",
    },
  ]

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Three Simple Steps
          </h2>
          <p className="mt-4 text-muted-foreground">
            Getting legal help has never been easier
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Gavel className="mx-auto mb-6 h-10 w-10 text-primary-foreground/80" />
        <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
          Ready to Get Legal Help?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          Join thousands of citizens who have found justice through NYAYA. It
          takes less than 2 minutes to get started.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="secondary" asChild className="gap-2">
            <Link href="/register">
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary focus-visible:ring-primary-foreground/50 active:bg-primary-foreground/90 active:text-primary"
          >
            <Link href="/women">{"Women's Legal Support"}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
