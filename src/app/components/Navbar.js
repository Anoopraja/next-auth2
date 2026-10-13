
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Pill,
  Home,
  ShoppingBag,
  LayoutGrid,
  ShoppingCart,
  Package,
  UserRound,
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const storeLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop Products", href: "/products", icon: ShoppingBag },
  { name: "Categories", href: "/categories", icon: LayoutGrid },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
  { name: "My Orders", href: "/orders", icon: Package },
  { name: "Profile", href: "/profile", icon: UserRound },
];

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

function NavigationGroup({ title, links, pathname, onNavigate }) {
  return (
    <div className="mb-6">
      <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
        {title}
      </p>

      <div className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/" &&
              pathname.startsWith(item.href + "/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={19} strokeWidth={1.8} />
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </span>

              {active && (
                <ChevronRight size={16} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function closeSidebar() {
    setOpen(false);
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-30 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm md:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <button
          aria-label="Close navigation overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-2.5"
          >
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <Pill size={24} />
            </div>

            <span className="text-2xl font-bold tracking-tight text-slate-900">
              DOC<span className="text-blue-600">med</span>
            </span>
          </Link>

          <button
            onClick={closeSidebar}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <NavigationGroup
            title="Store"
            links={storeLinks}
            pathname={pathname}
            onNavigate={closeSidebar}
          />

          <div className="mb-6 border-t border-slate-200" />

          <NavigationGroup
            title="Management"
            links={adminLinks}
            pathname={pathname}
            onNavigate={closeSidebar}
          />
        </nav>

        {/* Account footer */}
        <div className="shrink-0 border-t border-slate-200 p-4">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              D
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                My Account
              </p>
              <p className="text-xs text-slate-500">
                Manage your profile
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
