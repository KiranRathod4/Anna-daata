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
              <linearGradient id="awning" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#E53935" />
                  <stop offset="50%" stopColor="#E53935" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="75%" stopColor="#FFFFFF" />
                  <stop offset="75%" stopColor="#E53935" />
                  <stop offset="100%" stopColor="#E53935" />
              </linearGradient>
               <linearGradient id="veggieRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E53935" />
                <stop offset="100%" stopColor="#C62828" />
              </linearGradient>
               <linearGradient id="veggieGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#43A047" />
                <stop offset="100%" stopColor="#2E7D32" />
              </linearGradient>
            </defs>

            {/* Background */}
            <path d="M 95,58 A 45 45 0 0 1 5,58" fill="#FDE4B4" stroke="none" />
            <path d="M 5,58 L 95,58" fill="#FDE4B4" stroke="none" />

            {/* Cart Body */}
            <path d="M 10 70 H 80 L 85 85 H 5 L 10 70 Z" fill="#F57C00" stroke="#4E342E" />
            <path d="M 10 70 L 15 60 H 75 L 80 70" fill="#FB8C00" stroke="#4E342E" />
            <path d="M 15 60 V 55 H 75 V 60" fill="#FFFFFF" stroke="#4E342E" />
            <rect x="12" y="72" width="68" height="3" fill="#4E342E" stroke="none" />
            
            {/* Awning */}
            <path d="M 12 35 H 78 V 40 H 12 Z" fill="url(#awning)" stroke="#4E342E" />
            <path d="M 12 40 L 10 45 H 80 L 78 40 Z" fill="#FFFFFF" stroke="#4E342E" />
            <path d="M 20 45 V 55" stroke="#4E342E" />
            <path d="M 70 45 V 55" stroke="#4E342E" />
            <path d="M 45 45 V 55" stroke="#4E342E" />

            {/* Wheels */}
            <g transform="translate(0, 3)">
                <circle cx="25" cy="85" r="7" fill="#FFFFFF" stroke="#4E342E" />
                <circle cx="25" cy="85" r="2" fill="#4E342E" />
                <path d="M 25 78 V 92" stroke="#4E342E" strokeWidth="1" />
                <path d="M 18 85 H 32" stroke="#4E342E" strokeWidth="1" />
                <path d="M 20 79.5 L 30 90.5" stroke="#4E342E" strokeWidth="1" />
                <path d="M 20 90.5 L 30 79.5" stroke="#4E342E" strokeWidth="1" />

                <circle cx="65" cy="85" r="7" fill="#FFFFFF" stroke="#4E342E" />
                <circle cx="65" cy="85" r="2" fill="#4E342E" />
                <path d="M 65 78 V 92" stroke="#4E342E" strokeWidth="1" />
                <path d="M 58 85 H 72" stroke="#4E342E" strokeWidth="1" />
                <path d="M 60 79.5 L 70 90.5" stroke="#4E342E" strokeWidth="1" />
                <path d="M 60 90.5 L 70 79.5" stroke="#4E342E" strokeWidth="1" />
            </g>

            {/* Handle */}
            <path d="M 80 70 L 90 65 L 90 70 L 85 75 Z" fill="#FB8C00" stroke="#4E342E"/>
            <path d="M 90 65 H 95 V 60 H 90" fill="#4E342E" />

            {/* Veggies */}
            <g transform="translate(5, -2)">
              <circle cx="25" cy="55" r="5" fill="url(#veggieRed)" stroke="#4E342E" />
              <circle cx="35" cy="55" r="5" fill="url(#veggieRed)" stroke="#4E342E" />
              <path d="M 45 50 C 50 50, 50 58, 55 58" stroke="url(#veggieGreen)" strokeWidth="3" strokeLinecap="round" />
              <path d="M 50 52 C 55 52, 55 60, 60 60" stroke="url(#veggieGreen)" strokeWidth="3" strokeLinecap="round" />
            </g>

             {/* Ground */}
            <path d="M 2, 95 H 98" stroke="#4E342E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
      </div>
      <div className="text-center mt-[-20px]">
         <h1 className="text-2xl font-bold font-headline" style={{ color: '#4E342E' }}>ANNA DAATA</h1>
         <p className="text-xs font-semibold" style={{ color: '#FB8C00' }}>SAHI DAAM, SAHI SAAMAAN</p>
      </div>
    </Link>
  );
}
