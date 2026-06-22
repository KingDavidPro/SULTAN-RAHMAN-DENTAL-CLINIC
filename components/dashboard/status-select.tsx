"use client"

import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateBookingStatus } from "@/app/dashboard/actions"
import { STATUS_META } from "@/lib/bookings"

export function StatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status)
  const [pending, startTransition] = useTransition()

  const onChange = (next: string) => {
    setValue(next)
    startTransition(async () => {
      const res = await updateBookingStatus(id, next)
      if (res?.error) setValue(status)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange} disabled={pending}>
        <SelectTrigger className="h-9 w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(STATUS_META).map(([key, meta]) => (
            <SelectItem key={key} value={key}>
              {meta.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {pending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
