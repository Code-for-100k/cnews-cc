"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  User,
  Settings,
  ShieldCheck,
  LogOut,
  LogIn,
} from "lucide-react";

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  if (status === "loading") {
    return (
      <div className="size-8 animate-pulse rounded-full bg-muted" />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/auth/signin"
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <LogIn className="size-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Link>
    );
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80"
      >
        <Avatar size="sm">
          {user.image && <AvatarImage src={user.image} alt={user.name ?? ""} />}
          <AvatarFallback className="bg-canton/20 text-xs text-canton">
            {initials}
          </AvatarFallback>
        </Avatar>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-white/10 bg-background/95 p-1 shadow-xl backdrop-blur-xl">
          {/* User info header */}
          <div className="border-b border-white/10 px-3 py-2.5">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
            {(user as { role?: string }).role && (
              <span className="mt-1 inline-block rounded-full bg-canton/15 px-2 py-0.5 text-[10px] font-medium capitalize text-canton">
                {(user as { role?: string }).role}
              </span>
            )}
          </div>

          {/* Menu items */}
          <div className="py-1">
            <MenuItem
              href="/profile"
              icon={<User className="size-4" />}
              label="Profile"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              href="/preferences"
              icon={<Settings className="size-4" />}
              label="Preferences"
              onClick={() => setOpen(false)}
            />
            <MenuItem
              href="/verifications"
              icon={<ShieldCheck className="size-4" />}
              label="My Verifications"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Sign out */}
          <div className="border-t border-white/10 pt-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {icon}
      {label}
    </Link>
  );
}
