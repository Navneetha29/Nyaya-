"use client"

import { useState } from "react"
import Link from "next/link"
import { PublicHeader } from "@/components/layout/public-header"
import { PublicFooter } from "@/components/layout/public-footer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Scale,
  Shield,
  Building2,
  Heart,
  Home,
  Wifi,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Download,
  Save,
  Users,
  FileText,
  Clock,
  DollarSign,
  CheckCircle2,
  Gavel,
} from "lucide-react"

// -- STEP 1: Categories --
const categories = [
  {
    id: "domestic-violence",
    label: "Domestic violence",
    icon: Shield,
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
  {
    id: "workplace-harassment",
    label: "Workplace harassment",
    icon: Building2,
    color: "bg-warning/10 text-warning-foreground border-warning/20",
  },
  {
    id: "divorce-maintenance",
    label: "Divorce / maintenance",
    icon: Heart,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: "property-rights",
    label: "Property rights",
    icon: Home,
    color: "bg-success/10 text-success border-success/20",
  },
  {
    id: "cyber-harassment",
    label: "Cyber harassment",
    icon: Wifi,
    color: "bg-warning/10 text-warning-foreground border-warning/20",
  },
  {
    id: "arrest-police",
    label: "Arrest / police issue",
    icon: AlertTriangle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
  {
    id: "other",
    label: "Other",
    icon: HelpCircle,
    color: "bg-muted text-muted-foreground border-border",
  },
]

// -- STEP 2: Dynamic questions per category --
type QuestionSet = {
  question: string
  options: string[]
}[]

const categoryQuestions: Record<string, QuestionSet> = {
  "domestic-violence": [
    {
      question: "Are you safe right now?",
      options: ["Yes, I am safe", "No, I am not safe"],
    },
    {
      question: "Is there physical harm involved?",
      options: ["Yes", "No", "I prefer not to say"],
    },
    {
      question: "Do you want emergency support?",
      options: ["Yes, immediately", "Not right now", "I want to know my options first"],
    },
    {
      question: "Has police been involved?",
      options: ["Yes, FIR filed", "Yes, but no FIR", "No"],
    },
  ],
  "workplace-harassment": [
    {
      question: "What kind of harassment are you facing?",
      options: ["Verbal", "Physical", "Online / digital", "Other"],
    },
    {
      question: "Does your workplace have an Internal Complaints Committee (ICC)?",
      options: ["Yes", "No", "I am not sure"],
    },
    {
      question: "Have you reported this to your employer?",
      options: ["Yes", "No", "I am afraid to report"],
    },
    {
      question: "How long has this been happening?",
      options: ["Less than a month", "1-6 months", "More than 6 months"],
    },
  ],
  "divorce-maintenance": [
    {
      question: "What is your current marital situation?",
      options: ["Married and living together", "Separated", "Filed for divorce"],
    },
    {
      question: "Are children involved?",
      options: ["Yes", "No"],
    },
    {
      question: "Is there a maintenance / alimony concern?",
      options: ["Yes, I need maintenance", "No", "I am paying maintenance"],
    },
    {
      question: "Has there been domestic violence?",
      options: ["Yes", "No"],
    },
  ],
  "property-rights": [
    {
      question: "What type of property dispute?",
      options: ["Ancestral / inherited", "Self-acquired", "Jointly owned", "Other"],
    },
    {
      question: "Is there a will or succession document?",
      options: ["Yes", "No", "I am not sure"],
    },
    {
      question: "Are other family members contesting?",
      options: ["Yes", "No"],
    },
    {
      question: "Is any court case already pending?",
      options: ["Yes", "No"],
    },
  ],
  "cyber-harassment": [
    {
      question: "What type of cyber harassment?",
      options: ["Online threats", "Non-consensual images shared", "Stalking / tracking", "Identity theft", "Other"],
    },
    {
      question: "Do you have evidence (screenshots, links)?",
      options: ["Yes", "No, but I can collect", "No"],
    },
    {
      question: "Have you reported to the platform?",
      options: ["Yes", "No"],
    },
    {
      question: "Have you filed a police complaint?",
      options: ["Yes", "No"],
    },
  ],
  "arrest-police": [
    {
      question: "Who has been arrested or detained?",
      options: ["Myself", "A family member", "A friend"],
    },
    {
      question: "Was an FIR registered?",
      options: ["Yes", "No", "I am not sure"],
    },
    {
      question: "Was the arrest done with a warrant?",
      options: ["Yes", "No", "I do not know"],
    },
    {
      question: "Do you need bail assistance?",
      options: ["Yes", "No, I need general guidance"],
    },
  ],
  other: [
    {
      question: "Can you describe the nature of your issue?",
      options: ["Family matter", "Financial / fraud", "Land / property", "Workplace issue", "Government / RTI", "Other"],
    },
    {
      question: "How urgent is this?",
      options: ["Very urgent", "Somewhat urgent", "Not urgent, just exploring"],
    },
    {
      question: "Have you consulted a lawyer before?",
      options: ["Yes", "No"],
    },
    {
      question: "What kind of help do you need?",
      options: ["Legal advice", "Filing a case", "Understanding my rights", "Emergency support"],
    },
  ],
}

// -- STEP 3: AI Response data per category --
const aiResponses: Record<
  string,
  {
    summary: string
    applicableLaw: string
    immediateSteps: string[]
    documentsNeeded: string[]
    timeline: string
    approximateCost: string
  }
> = {
  "domestic-violence": {
    summary:
      "Based on your responses, you appear to be facing a domestic violence situation. This is a serious matter and you have strong legal protections under Indian law.",
    applicableLaw:
      "Protection of Women from Domestic Violence Act, 2005 (PWDVA). Also applicable: Section 498A IPC (cruelty by husband or relatives), Dowry Prohibition Act 1961 if dowry-related.",
    immediateSteps: [
      "If in immediate danger, call Women Helpline 181 or Police 100",
      "File a Domestic Incident Report (DIR) with a Protection Officer",
      "Apply for a Protection Order from the Magistrate",
      "Seek medical attention and preserve medical records as evidence",
      "Contact a shelter home if needed (list available via helpline)",
    ],
    documentsNeeded: [
      "Identity proof (Aadhaar, PAN, Voter ID)",
      "Marriage certificate or proof of relationship",
      "Medical reports documenting injuries",
      "Photos/videos as evidence (if any)",
      "FIR copy (if filed)",
      "Witness statements (if available)",
    ],
    timeline:
      "Protection order can be obtained within 3-7 days in urgent cases. Full proceedings typically take 2-6 months.",
    approximateCost:
      "Free legal aid available through DLSA. Private lawyer fees range from Rs 5,000 - Rs 25,000 depending on complexity and location.",
  },
  "workplace-harassment": {
    summary:
      "Your responses indicate workplace harassment concerns. The POSH Act provides strong protections for women at the workplace.",
    applicableLaw:
      "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act). Also: IPC Sections 354A, 509.",
    immediateSteps: [
      "Document every incident with dates, times, and witnesses",
      "File a written complaint with the Internal Complaints Committee (ICC)",
      "If no ICC exists, approach the Local Complaints Committee (LCC) via District Officer",
      "Complaint must be filed within 3 months of the last incident",
      "Request interim relief (transfer, leave) during inquiry",
    ],
    documentsNeeded: [
      "Written complaint describing incidents",
      "Evidence: emails, messages, CCTV footage",
      "Names and details of witnesses",
      "Employment contract / joining letter",
      "Company POSH policy (if available)",
    ],
    timeline:
      "ICC inquiry must be completed within 90 days. Employer must act on recommendations within 60 days.",
    approximateCost:
      "Filing complaint with ICC is free. If escalating to court, legal fees may range from Rs 10,000 - Rs 50,000.",
  },
  "divorce-maintenance": {
    summary:
      "Based on your responses, you are dealing with divorce and/or maintenance issues. Multiple legal provisions exist to protect your rights.",
    applicableLaw:
      "Hindu Marriage Act 1955 (Sections 13, 24, 25), Special Marriage Act 1954, Section 125 CrPC (maintenance), Hindu Adoption & Maintenance Act.",
    immediateSteps: [
      "Consult a family law lawyer to understand your options",
      "Gather all financial documents and proof of marriage",
      "If facing violence, file a DV complaint separately",
      "Apply for interim maintenance under Section 24 HMA or Section 125 CrPC",
      "Consider mediation as an initial step if safe to do so",
    ],
    documentsNeeded: [
      "Marriage certificate",
      "Income proof of both spouses",
      "Bank statements (joint and individual)",
      "Property documents",
      "Children's birth certificates (if applicable)",
      "Evidence of cruelty/grounds for divorce",
    ],
    timeline:
      "Mutual consent divorce: 6-18 months. Contested divorce: 2-5 years. Interim maintenance order: 1-3 months.",
    approximateCost:
      "Court fees: Rs 500 - Rs 5,000. Lawyer fees: Rs 10,000 - Rs 1,00,000+ depending on complexity.",
  },
  "property-rights": {
    summary:
      "Your responses suggest a property rights dispute. Women have equal rights to ancestral property under the amended Hindu Succession Act.",
    applicableLaw:
      "Hindu Succession Act 1956 (amended 2005), Indian Succession Act 1925, Transfer of Property Act 1882, Registration Act 1908.",
    immediateSteps: [
      "Obtain certified copies of property documents from Sub-Registrar",
      "Check mutation records at the local revenue office",
      "Send a legal notice asserting your rights",
      "File a partition suit if property is not divided",
      "Apply for an injunction to prevent unauthorized sale",
    ],
    documentsNeeded: [
      "Property title deed / sale deed",
      "Succession certificate or will",
      "Family tree / genealogy records",
      "Revenue records (7/12 extract, khatauni)",
      "Proof of relationship with property owner",
      "Previous court orders (if any)",
    ],
    timeline:
      "Partition suit: 1-5 years. Succession certificate: 3-6 months. Injunction: 2-4 weeks for interim order.",
    approximateCost:
      "Court fees based on property value (0.5-2%). Lawyer fees: Rs 15,000 - Rs 2,00,000+.",
  },
  "cyber-harassment": {
    summary:
      "Your responses indicate cyber harassment. Indian law has specific provisions to deal with online crimes against women.",
    applicableLaw:
      "IT Act 2000 (Sections 66C, 66D, 66E, 67, 67A), IPC Sections 354C (voyeurism), 354D (stalking), 499 & 500 (defamation).",
    immediateSteps: [
      "Take screenshots and preserve all evidence immediately",
      "Report the content to the platform for removal",
      "File a complaint at cybercrime.gov.in or call 1930",
      "File an FIR at the nearest police station or Cyber Crime Cell",
      "Inform your bank if financial fraud is involved",
    ],
    documentsNeeded: [
      "Screenshots of harassment with timestamps",
      "URLs / links to offensive content",
      "Your ID proof",
      "Communication records (chats, emails)",
      "Platform report receipts",
    ],
    timeline:
      "Platform takedown: 24-72 hours. FIR to investigation: 1-4 weeks. Court proceedings: 6 months - 2 years.",
    approximateCost:
      "Filing FIR is free. Lawyer fees for cyber cases: Rs 10,000 - Rs 50,000.",
  },
  "arrest-police": {
    summary:
      "Based on your responses, there are concerns regarding arrest or police interaction. Every person has fundamental rights during arrest.",
    applicableLaw:
      "Article 22 of Constitution (right against arbitrary arrest), CrPC Sections 41, 41A, 46, 50, 57. D.K. Basu Guidelines by Supreme Court.",
    immediateSteps: [
      "Know your right: police must inform the grounds of arrest",
      "You have the right to inform a family member immediately",
      "Right to consult a lawyer of your choice",
      "Must be produced before a Magistrate within 24 hours",
      "Apply for bail immediately - regular or anticipatory",
    ],
    documentsNeeded: [
      "FIR copy (right to obtain free copy)",
      "Arrest memo (must be provided by police)",
      "ID proof of the arrested person",
      "Bail application",
      "Surety bond documents",
    ],
    timeline:
      "Bail hearing: within 24 hours for bailable offenses. Anticipatory bail: 1-7 days. Regular bail: 1-4 weeks.",
    approximateCost:
      "Free legal aid available for those who cannot afford. Private bail lawyer: Rs 5,000 - Rs 50,000.",
  },
  other: {
    summary:
      "Based on your responses, we will help you navigate your legal concern. NYAYA can connect you with the right resources and legal professionals.",
    applicableLaw:
      "Applicable laws depend on the specific nature of your issue. A lawyer consultation will help identify the relevant statutes and procedures.",
    immediateSteps: [
      "Document all relevant facts with dates and names",
      "Collect and preserve any evidence you have",
      "Consult a lawyer to identify the applicable law",
      "Check if free legal aid is available through DLSA in your district",
      "Consider sending a legal notice before filing a case",
    ],
    documentsNeeded: [
      "ID proof",
      "All relevant documents and correspondence",
      "Chronological summary of events",
      "Names and addresses of parties involved",
      "Previous legal orders or notices (if any)",
    ],
    timeline:
      "Varies based on the nature of the case. Initial consultation can happen within 1-3 days through NYAYA.",
    approximateCost:
      "Free legal aid available for eligible persons. Private lawyer consultation: Rs 500 - Rs 5,000.",
  },
}

type Phase = "category" | "questions" | "result"

export default function GuidedHelpPage() {
  const [phase, setPhase] = useState<Phase>("category")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const questions = selectedCategory
    ? categoryQuestions[selectedCategory] || categoryQuestions.other
    : []

  function handleCategorySelect(catId: string) {
    setSelectedCategory(catId)
    setPhase("questions")
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
  }

  function handleNext() {
    if (!selectedOption) return
    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)
    setSelectedOption(null)
    if (currentQuestion + 1 >= questions.length) {
      setPhase("result")
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedOption(null)
    } else {
      setPhase("category")
      setSelectedCategory(null)
    }
  }

  function handleRestart() {
    setPhase("category")
    setSelectedCategory(null)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
  }

  const response = selectedCategory
    ? aiResponses[selectedCategory] || aiResponses.other
    : null

  const categoryLabel =
    categories.find((c) => c.id === selectedCategory)?.label || "General"

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1 bg-background py-10 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm text-primary">
              <MessageSquare className="h-4 w-4" />
              <span>Guided Help</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              {phase === "category" && "What do you need help with?"}
              {phase === "questions" && "Let Us Help You"}
              {phase === "result" && "Your Guidance Report"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {phase === "category" &&
                "Select the category that best describes your situation"}
              {phase === "questions" &&
                `Step ${currentQuestion + 1} of ${questions.length} \u2014 Your answers are confidential`}
              {phase === "result" &&
                `Based on your answers about ${categoryLabel.toLowerCase()}`}
            </p>
          </div>

          {/* Progress bar */}
          {phase === "questions" && (
            <div className="mb-8 flex gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= currentQuestion ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
          )}

          {/* PHASE 1: Category Selection */}
          {phase === "category" && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex items-center gap-4 rounded-xl border p-5 text-left transition-all hover:shadow-md hover:border-primary/30 ${cat.color}`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {cat.label}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {/* PHASE 2: Questions */}
          {phase === "questions" && questions[currentQuestion] && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className={`rounded-lg border p-4 text-left text-sm transition-colors ${
                      selectedOption === option
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/30 hover:bg-accent/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="gap-1"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className="gap-1"
                  >
                    {currentQuestion + 1 >= questions.length
                      ? "Get Guidance"
                      : "Next"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PHASE 3: AI Response */}
          {phase === "result" && response && (
            <div className="flex flex-col gap-5">
              {/* Summary */}
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Situation Summary</CardTitle>
                      <CardDescription>{categoryLabel}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground">
                    {response.summary}
                  </p>
                </CardContent>
              </Card>

              {/* Applicable Law */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Gavel className="h-4 w-4 text-primary" />
                    Applicable Law
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground">
                    {response.applicableLaw}
                  </p>
                </CardContent>
              </Card>

              {/* Immediate Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Immediate Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="flex flex-col gap-2">
                    {response.immediateSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Documents Needed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4 text-primary" />
                    Documents Needed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-1.5">
                    {response.documentsNeeded.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Timeline & Cost */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Clock className="h-4 w-4 text-primary" />
                      Timeline Estimate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground">
                      {response.timeline}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Approximate Cost
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground">
                      {response.approximateCost}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="flex flex-col items-center gap-4 pt-0 text-center">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Talk to a Women Lawyer
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Connect with a verified lawyer who specializes in{" "}
                      {categoryLabel.toLowerCase()} cases
                    </p>
                  </div>
                  <Button size="lg" asChild className="gap-2">
                    <Link href="/women/lawyers">
                      Find a Lawyer
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Bottom Actions */}
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Save className="h-3.5 w-3.5" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-3.5 w-3.5" />
                  Download as PDF
                </Button>
                <Button variant="ghost" size="sm" onClick={handleRestart}>
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}
