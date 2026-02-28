"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { PublicHeader } from "@/components/layout/public-header"
import { PublicFooter } from "@/components/layout/public-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  MapPin,
  Star,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Phone,
  Clock,
  Shield,
  Users,
  Calendar,
  Globe,
  IndianRupee,
} from "lucide-react"

const womenLawyers = [
  {
    id: "wl_001",
    name: "Adv. Sunita Desai",
    specialization: "Domestic Violence",
    location: "Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    experience: 12,
    rating: 4.9,
    cases: 98,
    fee: 1500,
    mode: "Online & In-person",
    verified: true,
    initials: "SD",
    available: true,
    bio: "Specializes in domestic violence cases with over a decade of experience helping women navigate the legal system. Committed to providing compassionate and effective legal representation.",
  },
  {
    id: "wl_002",
    name: "Adv. Meera Nair",
    specialization: "Workplace Harassment",
    location: "Chennai",
    languages: ["English", "Tamil"],
    experience: 14,
    rating: 4.9,
    cases: 110,
    fee: 2000,
    mode: "Online & In-person",
    verified: true,
    initials: "MN",
    available: true,
    bio: "Expert in POSH Act implementation and workplace harassment cases. Has trained over 50 companies on prevention of sexual harassment at the workplace.",
  },
  {
    id: "wl_003",
    name: "Adv. Priya Kapoor",
    specialization: "Divorce & Family Law",
    location: "Delhi",
    languages: ["Hindi", "English", "Punjabi"],
    experience: 18,
    rating: 4.8,
    cases: 200,
    fee: 2500,
    mode: "In-person",
    verified: true,
    initials: "PK",
    available: true,
    bio: "Senior family law practitioner with expertise in divorce, custody, and maintenance cases. Known for achieving fair settlements through mediation.",
  },
  {
    id: "wl_004",
    name: "Adv. Anjali Reddy",
    specialization: "Property Rights",
    location: "Hyderabad",
    languages: ["Telugu", "Hindi", "English"],
    experience: 10,
    rating: 4.7,
    cases: 65,
    fee: 1800,
    mode: "Online & In-person",
    verified: true,
    initials: "AR",
    available: true,
    bio: "Focuses on women's property and inheritance rights. Has successfully represented clients in landmark partition suits and succession cases.",
  },
  {
    id: "wl_005",
    name: "Adv. Kavitha Krishnan",
    specialization: "Cyber Crime",
    location: "Bangalore",
    languages: ["English", "Kannada", "Hindi"],
    experience: 8,
    rating: 4.6,
    cases: 45,
    fee: 1200,
    mode: "Online",
    verified: true,
    initials: "KK",
    available: false,
    bio: "Specialist in cyber crimes against women including online harassment, stalking, and non-consensual image sharing. Works closely with cyber crime cells.",
  },
  {
    id: "wl_006",
    name: "Adv. Ritu Sharma",
    specialization: "Criminal Law",
    location: "Jaipur",
    languages: ["Hindi", "English"],
    experience: 15,
    rating: 4.8,
    cases: 150,
    fee: 2000,
    mode: "In-person",
    verified: true,
    initials: "RS",
    available: true,
    bio: "Experienced criminal law practitioner focusing on cases involving crimes against women. Expert in bail matters and FIR procedures.",
  },
  {
    id: "wl_007",
    name: "Adv. Deepa Menon",
    specialization: "Domestic Violence",
    location: "Kochi",
    languages: ["Malayalam", "English", "Hindi"],
    experience: 11,
    rating: 4.7,
    cases: 80,
    fee: 1000,
    mode: "Online & In-person",
    verified: true,
    initials: "DM",
    available: true,
    bio: "Passionate advocate for women's rights with deep knowledge of the PWDVA Act. Provides free initial consultations for women in distress.",
  },
  {
    id: "wl_008",
    name: "Adv. Fatima Sheikh",
    specialization: "Divorce & Family Law",
    location: "Pune",
    languages: ["Hindi", "Urdu", "English", "Marathi"],
    experience: 20,
    rating: 4.9,
    cases: 250,
    fee: 3000,
    mode: "In-person",
    verified: true,
    initials: "FS",
    available: true,
    bio: "One of the most experienced family law practitioners in western India with expertise in both Hindu and Muslim personal law for women.",
  },
]

const locations = [
  "All Locations",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Jaipur",
  "Kochi",
]
const languages = [
  "All Languages",
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Kannada",
  "Marathi",
  "Malayalam",
  "Punjabi",
  "Urdu",
]
const domains = [
  "All Domains",
  "Domestic Violence",
  "Workplace Harassment",
  "Divorce & Family Law",
  "Property Rights",
  "Cyber Crime",
  "Criminal Law",
]
const feeRanges = [
  "All Fees",
  "Under Rs 1,500",
  "Rs 1,500 - Rs 2,000",
  "Rs 2,000 - Rs 3,000",
  "Above Rs 3,000",
]
const modes = ["All Modes", "Online", "In-person", "Online & In-person"]

export default function WomenLawyersPage() {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("All Locations")
  const [language, setLanguage] = useState("All Languages")
  const [domain, setDomain] = useState("All Domains")
  const [feeRange, setFeeRange] = useState("All Fees")
  const [mode, setMode] = useState("All Modes")
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null)

  const filteredLawyers = useMemo(() => {
    return womenLawyers.filter((l) => {
      if (
        search &&
        !l.name.toLowerCase().includes(search.toLowerCase()) &&
        !l.specialization.toLowerCase().includes(search.toLowerCase())
      ) {
        return false
      }
      if (location !== "All Locations" && l.location !== location) return false
      if (
        language !== "All Languages" &&
        !l.languages.includes(language)
      )
        return false
      if (domain !== "All Domains" && l.specialization !== domain) return false
      if (feeRange !== "All Fees") {
        if (feeRange === "Under Rs 1,500" && l.fee >= 1500) return false
        if (feeRange === "Rs 1,500 - Rs 2,000" && (l.fee < 1500 || l.fee > 2000))
          return false
        if (feeRange === "Rs 2,000 - Rs 3,000" && (l.fee < 2000 || l.fee > 3000))
          return false
        if (feeRange === "Above Rs 3,000" && l.fee <= 3000) return false
      }
      if (mode !== "All Modes" && l.mode !== mode) return false
      return true
    })
  }, [search, location, language, domain, feeRange, mode])

  const lawyer = womenLawyers.find((l) => l.id === selectedLawyer)

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1 bg-background">
        {!lawyer ? (
          <>
            {/* Hero */}
            <section className="bg-primary/5 py-10 sm:py-14">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-sm text-primary">
                    <Users className="h-4 w-4" />
                    <span>Verified Women Lawyers</span>
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
                    Find a Women Lawyer
                  </h1>
                  <p className="mt-3 text-muted-foreground">
                    Connect with experienced, verified lawyers who specialize in
                    {"women's"} legal issues across India
                  </p>
                </div>
              </div>
            </section>

            {/* Filters */}
            <section className="border-b border-border bg-card py-4">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or specialization..."
                      className="pl-9"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={domain} onValueChange={setDomain}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {domains.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={feeRange} onValueChange={setFeeRange}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {feeRanges.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={mode} onValueChange={setMode}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {modes.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </section>

            {/* Lawyer Cards */}
            <section className="py-8 sm:py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredLawyers.length} lawyer
                  {filteredLawyers.length !== 1 ? "s" : ""}
                </p>
                {filteredLawyers.length === 0 ? (
                  <div className="py-16 text-center">
                    <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                    <p className="text-muted-foreground">
                      No lawyers found matching your filters. Try adjusting your
                      search criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filteredLawyers.map((l) => (
                      <Card
                        key={l.id}
                        className="transition-all hover:border-primary/20 hover:shadow-sm"
                      >
                        <CardContent className="flex gap-4 pt-0">
                          <Avatar className="h-14 w-14 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                              {l.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-semibold text-foreground">
                                    {l.name}
                                  </p>
                                  {l.verified && (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {l.specialization}
                                </p>
                              </div>
                              {l.available ? (
                                <Badge
                                  variant="secondary"
                                  className="shrink-0 bg-success/10 text-[10px] text-success border-success/20"
                                >
                                  Available
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="shrink-0 text-[10px]">
                                  Busy
                                </Badge>
                              )}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {l.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {l.experience} yrs
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-warning text-warning" />
                                {l.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <IndianRupee className="h-3 w-3" />
                                {l.fee.toLocaleString("en-IN")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                {l.mode}
                              </span>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button
                                size="sm"
                                className="gap-1.5 text-xs"
                                onClick={() => setSelectedLawyer(l.id)}
                              >
                                Book
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5 text-xs"
                                onClick={() => setSelectedLawyer(l.id)}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          /* Lawyer Profile */
          <section className="py-10 sm:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLawyer(null)}
                className="mb-6 gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Directory
              </Button>

              <div className="flex flex-col gap-6">
                {/* Profile Header */}
                <Card>
                  <CardContent className="flex flex-col items-center gap-4 pt-0 text-center sm:flex-row sm:text-left">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                        {lawyer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <h1 className="text-xl font-bold text-foreground">
                          {lawyer.name}
                        </h1>
                        {lawyer.verified && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lawyer.specialization}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground sm:justify-start">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {lawyer.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {lawyer.experience} years
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          {lawyer.rating} rating
                        </span>
                        <span>{lawyer.cases} cases handled</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {lawyer.available ? (
                        <Badge className="bg-success/10 text-success border-success/20">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Currently Busy</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Details */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <IndianRupee className="h-4 w-4 text-primary" />
                        Consultation Fee
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-foreground">
                        {"Rs "}{lawyer.fee.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Per session
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Globe className="h-4 w-4 text-primary" />
                        Consultation Mode
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium text-foreground">
                        {lawyer.mode}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Languages: {lawyer.languages.join(", ")}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground">
                      {lawyer.bio}
                    </p>
                  </CardContent>
                </Card>

                {/* Book CTA */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="flex flex-col items-center gap-4 pt-0 text-center">
                    <Calendar className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Book a Consultation
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Schedule a confidential session with {lawyer.name}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="lg" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Book Now
                      </Button>
                      <Button size="lg" variant="outline" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </Button>
                    </div>
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
