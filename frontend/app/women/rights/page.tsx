"use client"

import { useState } from "react"
import Link from "next/link"
import { PublicHeader } from "@/components/layout/public-header"
import { PublicFooter } from "@/components/layout/public-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Building2,
  FileText,
  AlertTriangle,
  Heart,
  Home,
  Wifi,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Users,
} from "lucide-react"

const rightsTopic = [
  {
    id: "domestic-violence-act",
    title: "Domestic Violence Act",
    shortDescription:
      "Protection of Women from Domestic Violence Act, 2005 - your rights against physical, emotional, sexual, and economic abuse.",
    icon: Shield,
    color: "bg-destructive/10 text-destructive",
    explanation:
      "The Protection of Women from Domestic Violence Act, 2005 (PWDVA) provides a comprehensive remedy for women who are victims of domestic violence. It covers physical, emotional, verbal, sexual, and economic abuse. The Act recognizes that domestic violence is a violation of fundamental rights and provides civil remedies rather than just criminal prosecution.",
    steps: [
      "Identify the nature of violence (physical, emotional, sexual, economic)",
      "Contact a Protection Officer in your district or call Women Helpline 181",
      "File a Domestic Incident Report (DIR) with the Protection Officer",
      "Apply for Protection Order, Residence Order, or Monetary Relief",
      "The Magistrate must hear your case within 3 days of filing",
      "Obtain and serve the protection order on the respondent",
    ],
    checklist: [
      "Do you face physical harm, threats, or intimidation?",
      "Are you being denied access to finances or resources?",
      "Has your right to reside in the shared household been violated?",
      "Do you have a medical report documenting injuries?",
      "Have you identified a Protection Officer or service provider?",
      "Do you have a safe place to stay if needed?",
    ],
  },
  {
    id: "posh-rights",
    title: "POSH Rights",
    shortDescription:
      "Sexual Harassment of Women at Workplace Act, 2013 - every woman has the right to a safe workplace.",
    icon: Building2,
    color: "bg-warning/10 text-warning-foreground",
    explanation:
      "The POSH Act (Prevention of Sexual Harassment) mandates that every employer with 10 or more employees must constitute an Internal Complaints Committee (ICC). The Act covers all women, regardless of employment status, and includes contract workers, interns, and volunteers. Harassment can include unwelcome physical contact, sexually coloured remarks, showing pornography, and any unwelcome sexual gesture.",
    steps: [
      "Document every incident with dates, times, places, and witnesses",
      "File a written complaint with the Internal Complaints Committee (ICC)",
      "If your workplace has no ICC, approach the Local Complaints Committee (LCC)",
      "Complaint must be filed within 3 months of the last incident",
      "Request interim relief during the inquiry if needed",
      "ICC must complete its inquiry within 90 days",
      "If unsatisfied with the outcome, appeal to the court within 90 days",
    ],
    checklist: [
      "Have you documented the incidents in writing?",
      "Do you know if your organization has an ICC?",
      "Is the complaint within the 3-month time limit?",
      "Do you have supporting evidence (emails, messages, witnesses)?",
      "Are you aware of your right to interim relief during inquiry?",
    ],
  },
  {
    id: "fir-filing-guide",
    title: "FIR Filing Guide",
    shortDescription:
      "Your step-by-step guide to filing a First Information Report at any police station in India.",
    icon: FileText,
    color: "bg-primary/10 text-primary",
    explanation:
      "An FIR (First Information Report) is the first step in the criminal justice process. Under Section 154 of CrPC, every police station is required to register an FIR for cognizable offenses. The police cannot refuse to register your FIR. You have the right to a free copy of the FIR. For women, the statement must be recorded by a female officer or in the presence of a female officer.",
    steps: [
      "Go to the nearest police station (any station, not just the one in your area)",
      "Provide all details of the incident to the duty officer",
      "Insist on the FIR being registered immediately for cognizable offenses",
      "Get a free copy of the FIR with the FIR number",
      "If police refuse, approach the Superintendent of Police or file online at your state portal",
      "You can also approach the Magistrate under Section 156(3) CrPC to direct FIR registration",
      "For women: your statement must be recorded by/in presence of a female officer",
    ],
    checklist: [
      "Do you have all details of the incident (date, time, place)?",
      "Do you have descriptions or identification of the accused?",
      "Are there witnesses who can support your account?",
      "Have you preserved physical evidence (torn clothes, injury marks)?",
      "Do you have a written summary of events ready?",
    ],
  },
  {
    id: "arrest-rights",
    title: "Arrest Rights",
    shortDescription:
      "Know your fundamental rights during arrest as guaranteed by the Indian Constitution.",
    icon: AlertTriangle,
    color: "bg-destructive/10 text-destructive",
    explanation:
      "Article 22 of the Indian Constitution protects every person from arbitrary arrest. The Supreme Court's D.K. Basu Guidelines (1997) laid down strict procedures that police must follow during arrest. Women have additional protections: a woman cannot be arrested after sunset and before sunrise except in exceptional circumstances, and only by a female police officer.",
    steps: [
      "Know that police must inform you of the grounds of arrest",
      "You must be produced before a Magistrate within 24 hours",
      "You have the right to inform a friend, relative, or lawyer immediately",
      "You can demand a medical examination within 48 hours",
      "Request a copy of the arrest memo (signed by a witness)",
      "Apply for bail as soon as possible through a lawyer",
      "For women: arrest only by a female officer; no arrest between sunset and sunrise",
    ],
    checklist: [
      "Were you informed of the reason for arrest?",
      "Was a family member or friend informed immediately?",
      "Was an arrest memo prepared and signed by a witness?",
      "Were you produced before a Magistrate within 24 hours?",
      "Have you been given access to a lawyer?",
      "Was a medical examination conducted?",
    ],
  },
  {
    id: "divorce-procedure",
    title: "Divorce Procedure",
    shortDescription:
      "Understanding the legal process of divorce, maintenance, and custody rights in India.",
    icon: Heart,
    color: "bg-primary/10 text-primary",
    explanation:
      "Divorce in India is governed by personal laws (Hindu Marriage Act, Muslim Personal Law, Special Marriage Act, etc.). There are two types: mutual consent divorce (both parties agree) and contested divorce (one party files). Women have the right to maintenance under Section 125 CrPC regardless of religion. Custody of children below 5 years typically goes to the mother unless proven unfit.",
    steps: [
      "Consult a family law lawyer to understand your specific situation",
      "Attempt mediation or counselling (mandatory in many courts)",
      "File a divorce petition in the Family Court of your jurisdiction",
      "For mutual consent: file joint petition, wait 6 months, second motion hearing",
      "For contested: serve notice, attend hearings, present evidence",
      "Apply for interim maintenance under Section 24 HMA or Section 125 CrPC",
      "Apply for custody of children along with the divorce petition",
    ],
    checklist: [
      "Have you gathered all financial documents and marriage proof?",
      "Are children involved? Have you considered their welfare?",
      "Do you have grounds for divorce (cruelty, desertion, adultery, etc.)?",
      "Have you explored mediation or counselling?",
      "Do you need immediate financial support (interim maintenance)?",
    ],
  },
  {
    id: "property-inheritance",
    title: "Property Inheritance",
    shortDescription:
      "Equal rights for daughters in ancestral and family property under amended Hindu Succession Act.",
    icon: Home,
    color: "bg-success/10 text-success",
    explanation:
      "The Hindu Succession (Amendment) Act, 2005 gave daughters equal coparcenary rights in ancestral property as sons. This applies to all Hindu, Buddhist, Jain, and Sikh women. A daughter has the same rights as a son to inherit, demand partition, and manage ancestral property. For self-acquired property, the owner can bequeath it to anyone through a valid will.",
    steps: [
      "Identify whether the property is ancestral or self-acquired",
      "Obtain copies of property documents from the Sub-Registrar office",
      "Check mutation records at the local revenue/tehsildar office",
      "Send a legal notice to other family members asserting your right",
      "If disputed, file a partition suit in the Civil Court",
      "Apply for an injunction to prevent unauthorized sale or transfer",
      "Obtain a succession certificate from the court if the owner is deceased",
    ],
    checklist: [
      "Is the property ancestral (inherited) or self-acquired?",
      "Do you have copies of the property documents?",
      "Is there a will? If so, have you seen it?",
      "Are other family members acknowledging your rights?",
      "Have you checked the mutation records?",
    ],
  },
  {
    id: "cyber-safety",
    title: "Cyber Safety",
    shortDescription:
      "Protection against online harassment, stalking, and digital crimes under IT Act and IPC.",
    icon: Wifi,
    color: "bg-warning/10 text-warning-foreground",
    explanation:
      "India's IT Act 2000 and IPC have provisions against cyber crimes targeting women including voyeurism (Section 354C IPC), stalking (Section 354D IPC), obscenity (Section 67 IT Act), and identity theft (Section 66C IT Act). Non-consensual sharing of intimate images is a serious offense. The government has set up a dedicated portal (cybercrime.gov.in) and helpline (1930) for reporting.",
    steps: [
      "Immediately take screenshots of all harassing content with timestamps",
      "Do not delete any messages, emails, or communications from the harasser",
      "Report the content to the platform (Instagram, Facebook, etc.) for removal",
      "File a complaint online at cybercrime.gov.in or call 1930",
      "File an FIR at the nearest police station or Cyber Crime Cell",
      "Consult a lawyer if the harassment is severe or ongoing",
      "Enable two-factor authentication on all your accounts",
    ],
    checklist: [
      "Have you taken screenshots of all harassment evidence?",
      "Have you reported the content to the platform?",
      "Do you know the identity of the harasser?",
      "Have you secured your accounts with 2FA?",
      "Have you filed a police complaint or FIR?",
    ],
  },
]

export default function WomenRightsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const topic = rightsTopic.find((t) => t.id === selectedTopic)

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        {!topic ? (
          <>
            {/* Hero */}
            <section className="bg-primary/5 py-12 sm:py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm text-primary">
                    <BookOpen className="h-4 w-4" />
                    <span>Know Your Rights</span>
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                    Laws That Protect You
                  </h1>
                  <p className="mt-4 text-muted-foreground">
                    Understanding your legal rights is the first step towards
                    justice. Learn about the key laws that protect women in India.
                  </p>
                </div>
              </div>
            </section>

            {/* Topics Grid */}
            <section className="py-12 sm:py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {rightsTopic.map((rt) => {
                    const Icon = rt.icon
                    return (
                      <Card
                        key={rt.id}
                        className="transition-all hover:border-primary/20 hover:shadow-sm"
                      >
                        <CardContent className="flex flex-col gap-4 pt-0">
                          <div className="flex items-start gap-4">
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${rt.color}`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground">
                                {rt.title}
                              </h3>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {rt.shortDescription}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-fit gap-1"
                            onClick={() => setSelectedTopic(rt.id)}
                          >
                            Learn More
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Detail View for Selected Topic */
          <section className="py-10 sm:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTopic(null)}
                className="mb-6 gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to All Rights
              </Button>

              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${topic.color}`}
                >
                  <topic.icon className="h-5 w-5" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  {topic.title}
                </h1>
              </div>

              <div className="flex flex-col gap-6">
                {/* Explanation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground">
                      {topic.explanation}
                    </p>
                  </CardContent>
                </Card>

                {/* Step-by-Step Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Step-by-Step Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="flex flex-col gap-3">
                      {topic.steps.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                {/* Checklist */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <FileText className="h-4 w-4 text-primary" />
                      Self-Assessment Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2">
                      {topic.checklist.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-card text-xs">
                            {"\u2610"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Talk to Lawyer CTA */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="flex flex-col items-center gap-3 pt-0 text-center">
                    <Users className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      Need Legal Assistance?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with a verified lawyer who specializes in this area
                    </p>
                    <Button size="sm" asChild className="gap-2">
                      <Link href="/women/lawyers">
                        Talk to a Lawyer
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>
      <PublicFooter />
    </div>
  )
}
