import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center gap-2 text-primary">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-24 w-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <defs>
               <linearGradient id="truckBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FB8C00" />
                <stop offset="100%" stopColor="#F57C00" />
              </linearGradient>
               <linearGradient id="veggieRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E53935" />
                <stop offset="100%" stopColor="#C62828" />
              </linearGradient>
               <linearGradient id="veggieGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#43A047" />
                <stop offset="100%" stopColor="#2E7D32" />
              </linearGradient>
               <linearGradient id="veggieYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDD835" />
                <stop offset="100%" stopColor="#FBC02D" />
              </linearGradient>
            </defs>
            
            {/* Background Circle */}
            <path d="M 95,58 A 45 45 0 0 1 5,58" fill="#FDE4B4" stroke="none" />
            <path d="M 5,58 L 95,58" fill="#FDE4B4" stroke="none" />
            
            {/* Truck */}
            <path d="M 85,85 H 15 L 12,75 H 88 L 85,85 Z" fill="#FFFFFF" stroke="#4E342E" />
            <path d="M 12,75 L 18,55 H 70 L 88,75" fill="url(#truckBody)" stroke="#4E342E" />
            <path d="M 20,65 H 35 V 58 H 20 Z" fill="#FFFFFF" stroke="#4E342E" />
            <path d="M 70,55 L 80,45 H 85 L 88,55 H 70" fill="#FFFFFF" stroke="#4E342E" />
            <path d="M 72,55 V 65 H 86 V 55" fill="#FFFFFF" stroke="#4E342E" />
            <path d="M 74,60 H 78" stroke="#4E342E" />
            <path d="M 80,60 H 84" stroke="#4E342E" />
            
            {/* Awning */}
            <path d="M 19,55 H 45 L 43,50 H 21 Z" fill="#D32F2F" stroke="#4E342E" />
            <path d="M 21 50 C 21 48, 24 48, 24 50" stroke="#FFFFFF" fill="none" />
            <path d="M 27 50 C 27 48, 30 48, 30 50" stroke="#FFFFFF" fill="none" />
            <path d="M 33 50 C 33 48, 36 48, 36 50" stroke="#FFFFFF" fill="none" />
            <path d="M 39 50 C 39 48, 42 48, 42 50" stroke="#FFFFFF" fill="none" />
            
            {/* Grill */}
            <path d="M 89,75 L 86,65 H 92 L 89,75 Z" fill="#BDBDBD" stroke="#4E342E" />
            <path d="M 87,67 V 73" stroke="#4E342E" />
            <path d="M 89,67 V 73" stroke="#4E342E" />
            <path d="M 91,67 V 73" stroke="#4E342E" />
            
            {/* Wheels */}
            <circle cx="28" cy="85" r="5" fill="#FFFFFF" stroke="#4E342E" />
            <circle cx="28" cy="85" r="2" fill="#4E342E" stroke="none" />
            <circle cx="72" cy="85" r="5" fill="#FFFFFF" stroke="#4E342E" />
            <circle cx="72" cy="85" r="2" fill="#4E342E" stroke="none" />

            {/* Headlights */}
            <circle cx="90" cy="80" r="2" fill="#FFEB3B" stroke="#4E342E" />

            {/* Ground lines */}
            <path d="M 5,90 H 20" stroke="#4E342E" />
            <path d="M 80,90 H 95" stroke="#4E342E" />
            <path d="M 35,90 H 65" stroke="#4E342E" />

            {/* Veggie Plate */}
            <g transform="translate(0, -5)">
              {/* Plate */}
              <path d="M 25 45 Q 50 55 75 45 L 70 50 Q 50 60 30 50 Z" fill="#FFFFFF" stroke="#4E342E" />
              {/* Veggies */}
              <circle cx="40" cy="35" r="6" fill="url(#veggieRed)" stroke="#4E342E" />
              <ellipse cx="55" cy="35" rx="7" ry="5" fill="url(#veggieGreen)" stroke="#4E342E" transform="rotate(20 55 35)" />
              <path d="M 60 40 C 65 35, 70 40, 65 45" fill="url(#veggieYellow)" stroke="#4E342E" />
               <path d="M 35 42 C 38 38, 42 38, 45 42" fill="none" stroke="url(#veggieGreen)" stroke-width="2.5" stroke-linecap="round"/>
               <path d="M 50 44 C 53 40, 57 40, 60 44" fill="none" stroke="#E53935" stroke-width="2" stroke-linecap="round"/>
            </g>
          </svg>
      </div>
      <div className="text-center mt-[-10px]">
         <h1 className="text-2xl font-bold font-headline" style={{ color: '#4E342E' }}>ANNA DAATA</h1>
         <p className="text-xs font-semibold" style={{ color: '#FB8C00' }}>SAHI DAAM, SAHI SAAMAAN</p>
      </div>
    </Link>
  );
}
