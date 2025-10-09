import React from 'react'

// shadcn components
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// icons
import Dropdown from '@/app/styles/svg/Dropdown.jsx';

export default function FormSelector({   
    title = "Select Option",
    options = [],
    value = "",
    onChange = () => {}, 
  }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-[16px] leading-[150%] tracking-[0px] text-[rgba(255,255,255,1)]">
        {title}
      </label>

      <div className="w-full flex items-center justify-between 
                      px-3 py-0.5 rounded-lg 
                      bg-[#141414] border border-[#262626] 
                      text-gray-200 
                      focus-within:border-[#999999]">
        <aside className="h-full flex items-center gap-2.5 text-gray-500">
          {value || title}
        </aside>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full">
              <Dropdown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 border border-[#262626] bg-[#1A1A1A] text-[#C8D1D4] p-0">
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#262626]" />

            {options.map((opt) => {
              const val = typeof opt === "object" ? opt.value : String(opt);
              const lbl = typeof opt === "object" ? opt.label : String(opt);

              return (
                <DropdownMenuCheckboxItem
                  key={val}
                  checked={value === val}
                  onCheckedChange={(checked) => onChange(checked ? val : "")}
                >
                  {lbl}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

  );
}
