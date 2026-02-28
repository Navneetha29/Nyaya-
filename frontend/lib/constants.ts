// NYAYA Platform Constants

export const APP_NAME = "NYAYA"
export const APP_TAGLINE = "Access to Justice for Every Indian"
export const APP_DESCRIPTION =
  "NYAYA simplifies legal aid, connects citizens with verified lawyers, and empowers women with legal awareness across India."

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "For Women", href: "/women" },
  { label: "Find Lawyers", href: "/dashboard/lawyers" },
  { label: "About", href: "#about" },
] as const

export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Submit Case", href: "/dashboard/submit-case", icon: "FilePlus" },
  { label: "My Cases", href: "/dashboard/cases", icon: "FolderOpen" },
  { label: "Find Lawyers", href: "/dashboard/lawyers", icon: "Users" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
] as const

export const CASE_CATEGORIES = [
  "Family Law",
  "Criminal Law",
  "Property Dispute",
  "Consumer Rights",
  "Labour Law",
  "Domestic Violence",
  "Cyber Crime",
  "Constitutional Rights",
  "Tax Law",
  "Other",
] as const

export const CASE_STATUS = {
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
} as const

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const

export const WOMEN_RIGHTS_CATEGORIES = [
  {
    id: "domestic-violence",
    title: "Domestic Violence",
    description: "Protection of Women from Domestic Violence Act, 2005",
    icon: "Shield",
  },
  {
    id: "workplace-harassment",
    title: "Workplace Harassment",
    description: "Sexual Harassment of Women at Workplace Act, 2013",
    icon: "Building2",
  },
  {
    id: "dowry-prohibition",
    title: "Dowry Prohibition",
    description: "Dowry Prohibition Act, 1961",
    icon: "Ban",
  },
  {
    id: "maternity-benefits",
    title: "Maternity Benefits",
    description: "Maternity Benefit Act, 1961 (amended 2017)",
    icon: "Heart",
  },
  {
    id: "property-rights",
    title: "Property Rights",
    description: "Hindu Succession Act (amended 2005)",
    icon: "Home",
  },
  {
    id: "cyber-stalking",
    title: "Cyber Stalking & Online Abuse",
    description: "IT Act Section 66A & IPC Sections",
    icon: "Wifi",
  },
] as const
