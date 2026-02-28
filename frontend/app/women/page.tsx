import Link from "next/link"
import { PublicHeader } from "@/components/layout/public-header"
import { PublicFooter } from "@/components/layout/public-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Heart,
  BookOpen,
  Users,
  ArrowRight,
  Phone,
  MessageSquare,
  Scale,
  HandHelping,
} from "lucide-react"

const helplineNumbers = [
  { name: "Women Helpline", number: "181", description: "24/7 toll-free" },
  {
    name: "Domestic Violence",
    number: "1091",
    description: "Police Women Helpline",
  },
  { name: "NCW", number: "7827-170-170", description: "National Commission for Women" },
]

export default function WomenPortalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary/5 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm text-primary">
                <Shield className="h-4 w-4" />
                <span>Women Legal Support</span>
              </div>
              <h1 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                Know Your Rights.{" "}
                <span className="text-primary">Get Help Now.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Confidential legal guidance & verified women lawyers. A safe
                space to learn about your legal rights, access guided help, and
                connect with lawyers who specialize in {"women's"} legal issues.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/women/guided-help">
                    Enter Women Support
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Primary Navigation Options (Women Dashboard) */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                How Can We Help You?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Choose the type of support you need
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Link href="/women/guided-help">
                <Card className="h-full transition-all hover:border-primary/20 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center gap-4 pt-0 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
                      <HandHelping className="h-7 w-7 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Guided Help
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Step-by-step assistance for your situation. Answer simple
                      questions and get personalized legal guidance with next steps.
                    </p>
                    <Button variant="outline" size="sm" className="gap-1 mt-auto">
                      Start Now
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/women/rights">
                <Card className="h-full transition-all hover:border-primary/20 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center gap-4 pt-0 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <BookOpen className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Know Your Rights
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Learn about the laws that protect you. Simple explanations,
                      step-by-step guides, and checklists for every situation.
                    </p>
                    <Button variant="outline" size="sm" className="gap-1 mt-auto">
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/women/lawyers">
                <Card className="h-full transition-all hover:border-primary/20 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center gap-4 pt-0 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/10">
                      <Users className="h-7 w-7 text-warning-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Talk to a Women Lawyer
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Connect with verified women lawyers who specialize in your
                      type of case. Filter by location, language, and expertise.
                    </p>
                    <Button variant="outline" size="sm" className="gap-1 mt-auto">
                      Find a Lawyer
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Emergency Help */}
        <section className="bg-card py-4 sm:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="#helplines">
              <Card className="border-destructive/20 bg-destructive/5 transition-all hover:shadow-md">
                <CardContent className="flex items-center gap-4 pt-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                    <Phone className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      Emergency Help
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      If you are in immediate danger, access helpline numbers and
                      emergency contacts
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-destructive" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Helplines */}
        <section id="helplines" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                Emergency Helplines
              </h2>
              <p className="mt-3 text-muted-foreground">
                If you are in immediate danger, contact these helplines
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {helplineNumbers.map((hl) => (
                <Card key={hl.number} className="text-center">
                  <CardContent className="flex flex-col items-center gap-2 pt-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                      <Phone className="h-4 w-4 text-destructive" />
                    </div>
                    <h3 className="font-semibold text-foreground">{hl.name}</h3>
                    <p className="text-2xl font-bold text-primary">
                      {hl.number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {hl.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <Scale className="mx-auto mb-4 h-8 w-8 text-primary-foreground/80" />
            <h2 className="font-serif text-2xl font-bold text-primary-foreground sm:text-3xl">
              You Are Not Alone
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
              NYAYA provides free, confidential legal assistance. Take the first
              step towards getting the help you deserve.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link href="/women/guided-help">
                  <MessageSquare className="h-4 w-4" />
                  Start Guided Help
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  )
}
