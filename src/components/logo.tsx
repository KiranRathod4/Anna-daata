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
              <linearGradient id="burgerBun" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDB813" />
                <stop offset="100%" stopColor="#F9A825" />
              </linearGradient>
              <linearGradient id="burgerMeat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C62828" />
                <stop offset="100%" stopColor="#B71C1C" />
              </linearGradient>
               <linearGradient id="truckBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FB8C00" />
                <stop offset="100%" stopColor="#F57C00" />
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

            {/* Burger */}
            <g transform="translate(0, -5)">
              <path d="M 30,30 H 70 C 70,20 60,15 50,15 C 40,15 30,20 30,30 Z" fill="url(#burgerBun)" stroke="#4E342E" />
              <rect x="30" y="30" width="40" height="4" rx="2" fill="#FFFFFF" stroke="#4E342E" />
              <path d="M 31 36 C 33 34, 35 34, 37 36 S 41 38, 43 36 S 47 34, 49 36 S 53 38, 55 36 S 59 34, 61 36 S 65 38, 67 36" fill="none" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="30" y="38" width="40" height="5" rx="2" fill="url(#burgerMeat)" stroke="#4E342E" />
              <rect x="30" y="43" width="40" height="7" rx="2" fill="url(#burgerBun)" stroke="#4E342E" />
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
