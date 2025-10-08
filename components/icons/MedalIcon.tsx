import React from 'react';

export const MedalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 1 9 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 12.75h.75a6 6 0 0 0 6-6v-.75a3 3 0 0 0-3-3h-3.75a3 3 0 0 0-3 3v.75a6 6 0 0 0 6 6Zm-6-6h.75a6 6 0 0 1 6-6v-.75a3 3 0 0 1-3-3h-3.75a3 3 0 0 1-3 3v.75a6 6 0 0 1 6 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75v3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 18.75 18 16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 18.75-2.25-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
);