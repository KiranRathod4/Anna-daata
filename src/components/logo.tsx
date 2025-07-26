import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 150"
          className="h-16 w-auto"
        >
          <g>
            {/* Background circle */}
            <path fill="#FDE68A" d="M165.5,108.3c0-30-24.3-54.3-54.3-54.3s-54.3,24.3-54.3,54.3" />

            {/* Truck */}
            <g>
              {/* Truck body */}
              <path fill="#F9A825" d="M136.6,108.3H52.5c-0.8,0-1.5-0.7-1.5-1.5V86.9c0-0.8,0.7-1.5,1.5-1.5h77.8c0,0,5.3,0,5.3,5.3v16.1 C135.6,107.5,136.6,108.3,136.6,108.3z" />
              <path fill="#E0E0E0" d="M135.1,108.3H54v6.2h81.1V108.3z" />
              <path fill="#F9A825" d="M51,99.8v-13h-5.3c-0.8,0-1.5,0.7-1.5,1.5v9.9C44.2,99.1,45.2,99.8,51,99.8z" />
              <path fill="#212121" stroke="#212121" strokeWidth="2" strokeMiterlimit="10" d="M48.8,118.8c-2.7,0-4.8,2.2-4.8,4.8s2.2,4.8,4.8,4.8s4.8-2.2,4.8-4.8S51.5,118.8,48.8,118.8z" />
              <path fill="#212121" stroke="#212121" strokeWidth="2" strokeMiterlimit="10" d="M125.2,118.8c-2.7,0-4.8,2.2-4.8,4.8s2.2,4.8,4.8,4.8s4.8-2.2,4.8-4.8S127.8,118.8,125.2,118.8z" />
              <path fill="none" stroke="#212121" strokeWidth="2" strokeMiterlimit="10" d="M54,114.5h71.1" />
              <rect x="57.3" y="90.3" fill="#BDBDBD" width="13" height="11.2" />
              <rect x="74.4" y="90.3" fill="#BDBDBD" width="13" height="11.2" />

              {/* Awning */}
              <path fill="#EF5350" d="M106.9,85.4H88.4c-0.8,0-1.5-0.7-1.5-1.5V81c0-0.8,0.7-1.5,1.5-1.5h18.5c0.8,0,1.5,0.7,1.5,1.5v2.9 C108.4,84.7,107.7,85.4,106.9,85.4z" />
               <path fill="none" stroke="#FFFFFF" strokeWidth="1" strokeMiterlimit="10" d="M89.4,82.4l2,0 M93.4,82.4l2,0 M97.4,82.4l2,0 M101.4,82.4l2,0 M105.4,82.4l2,0" />

              {/* Bumper */}
              <path fill="#BDBDBD" d="M135.1,101.5h5.3v-10h-5.3V101.5z" />
              <path fill="#BDBDBD" d="M140.4,96.8h2.3v-4.5h-2.3V96.8z" />
              <path fill="#BDBDBD" d="M142.6,96.8h2.3v-4.5h-2.3V96.8z" />
            </g>

            {/* Burger */}
            <g>
              <path fill="#FFB74D" d="M134.4,70.8c0,4.2-7.7,7.6-17.2,7.6s-17.2-3.4-17.2-7.6c0-4.2,7.7-7.6,17.2-7.6S134.4,66.6,134.4,70.8z" />
              <path fill="#8D6E63" d="M132.8,77.5H101c-0.8,0-1.5-0.7-1.5-1.5v-3.8c0-0.8,0.7-1.5,1.5-1.5h31.8c0.8,0,1.5,0.7,1.5,1.5v3.8 C134.3,76.8,133.6,77.5,132.8,77.5z" />
              <path fill="#4CAF50" d="M102.5,77.5l2.6,3.8l4.4-2.3l4.4,2.3l4.4-2.3l4.4,2.3l4.4-2.3l2.6,3.8H102.5z" />
              <path fill="#FFEE58" d="M130.6,81.3H103c-0.6,0-1-0.4-1-1l0,0c0-0.6,0.4-1,1-1h27.6c0.6,0,1,0.4,1,1l0,0C131.6,80.9,131.1,81.3,130.6,81.3z" />
              <path fill="#E57373" d="M129.8,85.4H103c-0.8,0-1.5-0.7-1.5-1.5V82c0-0.8,0.7-1.5,1.5-1.5h26.8c0.8,0,1.5,0.7,1.5,1.5v1.9 C131.3,84.7,130.6,85.4,129.8,85.4z" />
              <path fill="#FFB74D" d="M134.4,93.4c0,4.2-7.7,7.6-17.2,7.6s-17.2-3.4-17.2-7.6c0-4.2,7.7-7.6,17.2-7.6S134.4,89.2,134.4,93.4z" />
              <circle fill="#FFFFFF" cx="108.9" cy="68.8" r="1" />
              <circle fill="#FFFFFF" cx="115.9" cy="67.8" r="1.5" />
              <circle fill="#FFFFFF" cx="124.9" cy="68.8" r="1" />
            </g>
          </g>
        </svg>
      </div>
      <div className="text-center">
         <h1 className="text-2xl font-bold font-headline" style={{ color: '#4E342E' }}>ANNA DAATA</h1>
         <p className="text-xs font-semibold" style={{ color: '#FB8C00' }}>SAHI DAAM, SAHI SAAMAAN</p>
      </div>
    </Link>
  );
}
