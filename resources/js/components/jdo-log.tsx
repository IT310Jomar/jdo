import { SVGAttributes } from 'react';

export default function JomarLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
         {...props}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="300"
    >
        <circle cx="50" cy="50" r="45" fill="#3B82F6" stroke="black" stroke-width="6" />
        <path d="M30,30 v30 a10,10 0 0 0 10,10" fill="none" stroke="black" stroke-width="5" stroke-linecap="round" />
        <path d="M48,30 v40 h12 a12,12 0 0 0 0,-40 h-12" fill="none" stroke="black" stroke-width="5" stroke-linecap="round" />
        <circle cx="78" cy="50" r="13" stroke="black" stroke-width="5" fill="none" />
    </svg>
    
    );
}
