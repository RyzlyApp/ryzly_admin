"use client"
import { searchAtom } from "@/helper/atom/search";
import { Input } from "@heroui/react";
import { useAtom } from "jotai";

interface IProps {
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClear?: () => void; // optional external clear handler
}

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

export default function SearchField(
    { placeholder, value, onChange, onClear } : IProps
) {

    const [ q, setSearch ] = useAtom(searchAtom)

    return (
        <Input
            isClearable
            value={q}
            onChange={(e) => setSearch(e.target.value)} 
            onClear={onClear}
            classNames={{
                inputWrapper:
                    "bg-white border border-gray-300 rounded-full h-[40px]", // 👈 force height
                input: "text-gray-900 text-sm ",
            }}
            fullWidth={true}
            placeholder={placeholder ?? "Type to search..."}
            radius="full"
            startContent={
                <SearchIcon className="text-black/50 -ml-1 mb-0.5 dark:text-white/90 pointer-events-none shrink-0" />
            }
        />
    );
}
