"use client"

import { Button } from "@/components/ui/button"
import { Globe } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {t("language")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={(e) => {
            e.preventDefault()
            console.log("Switching to Korean") // 디버깅용
            setLanguage("ko")
          }} 
          className={language === "ko" ? "bg-blue-50" : ""}
        >
          {t("korean")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={(e) => {
            e.preventDefault()
            console.log("Switching to English") // 디버깅용
            setLanguage("en")
          }} 
          className={language === "en" ? "bg-blue-50" : ""}
        >
          {t("english")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
