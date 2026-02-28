import {
  Card,
  CardContent,
} from "@/components/ui/card"
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
} from "lucide-react"

const lawyers = [
  {
    id: "lw_001",
    name: "Adv. Rajesh Mehta",
    specialization: "Property Law",
    location: "Delhi",
    experience: "15 years",
    rating: 4.8,
    cases: 120,
    verified: true,
    initials: "RM",
    available: true,
  },
  {
    id: "lw_002",
    name: "Adv. Sunita Desai",
    specialization: "Family Law",
    location: "Mumbai",
    experience: "12 years",
    rating: 4.9,
    cases: 98,
    verified: true,
    initials: "SD",
    available: true,
  },
  {
    id: "lw_003",
    name: "Adv. Amit Joshi",
    specialization: "Criminal Law",
    location: "Pune",
    experience: "20 years",
    rating: 4.7,
    cases: 200,
    verified: true,
    initials: "AJ",
    available: false,
  },
  {
    id: "lw_004",
    name: "Adv. Priyanka Singh",
    specialization: "Labour Law",
    location: "Bangalore",
    experience: "8 years",
    rating: 4.6,
    cases: 55,
    verified: true,
    initials: "PS",
    available: true,
  },
  {
    id: "lw_005",
    name: "Adv. Karan Malhotra",
    specialization: "Consumer Rights",
    location: "Hyderabad",
    experience: "10 years",
    rating: 4.5,
    cases: 75,
    verified: true,
    initials: "KM",
    available: true,
  },
  {
    id: "lw_006",
    name: "Adv. Meera Nair",
    specialization: "Domestic Violence",
    location: "Chennai",
    experience: "14 years",
    rating: 4.9,
    cases: 110,
    verified: true,
    initials: "MN",
    available: true,
  },
]

export default function LawyersPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Find a Lawyer
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse verified legal professionals across India
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or specialization..." className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            <SelectItem value="property">Property Law</SelectItem>
            <SelectItem value="family">Family Law</SelectItem>
            <SelectItem value="criminal">Criminal Law</SelectItem>
            <SelectItem value="consumer">Consumer Rights</SelectItem>
            <SelectItem value="labour">Labour Law</SelectItem>
            <SelectItem value="domestic">Domestic Violence</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All India</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lawyer Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {lawyers.map((lawyer) => (
          <Card
            key={lawyer.id}
            className="transition-colors hover:border-primary/20 hover:shadow-sm"
          >
            <CardContent className="flex gap-4 pt-0">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  {lawyer.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {lawyer.name}
                      </p>
                      {lawyer.verified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {lawyer.specialization}
                    </p>
                  </div>
                  {lawyer.available ? (
                    <Badge variant="secondary" className="text-[10px] bg-success/10 text-success border-success/20">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">
                      Busy
                    </Badge>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {lawyer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {lawyer.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {lawyer.rating}
                  </span>
                  <span>{lawyer.cases} cases</span>
                </div>
                <div className="mt-3">
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <MessageSquare className="h-3 w-3" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
