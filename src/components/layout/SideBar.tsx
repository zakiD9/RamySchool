import {
  PersonStanding,
  Square,
  Users,
  BookOpen,
  Layers3,
  CalendarCheck,
  ArrowRight,
} from "lucide-react"
import { FC } from "react"
import { NavLink } from "react-router-dom"

type Role = "director" | "receptionist"

type MenuItem = {
  label: string
  icon: FC<React.SVGProps<SVGSVGElement>>
  to: string
}

const directorMenu: MenuItem[] = [
  { label: "Dashboard", icon: Square, to: "/director/dashboard" },
  { label: "Teachers Revenue", icon: PersonStanding, to: "/director/teachers" },
  { label: "Log Out", icon: ArrowRight, to: "/director/logout" },
]

const receptionistMenu: MenuItem[] = [
  { label: "Dashboard", icon: Square, to: "/receptionist/dashboard" },
  { label: "Teachers", icon: PersonStanding, to: "/receptionist/teachers" },
  { label: "Students", icon: Users, to: "/receptionist/students" },
  { label: "Sessions", icon: BookOpen, to: "/receptionist/sessions" },
  { label: "Groups", icon: Layers3, to: "/receptionist/groups" },
  { label: "Presences", icon: CalendarCheck, to: "/receptionist/presences" },
  { label: "Log Out", icon: ArrowRight, to: "/receptionist/logout" },
]

export default function Sidebar({ role }: { role: Role }) {
  const menuItems = role === "director" ? directorMenu : receptionistMenu

  return (
    <div className="w-1/5 h-fit bg-white border py-2 shadow-sm">
      <ul className="flex flex-col">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  isActive
                    ? "bg-gray-200 font-medium text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          )
        })}
      </ul>
    </div>
  )
}
