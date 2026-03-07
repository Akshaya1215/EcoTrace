import React from 'react';

const Logo3D = ({ className = "w-full h-full" }) => {
    return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
                {/* Deep Green Globe Core */}
                <radialGradient id="globeGrad" cx="0.5" cy="0.4" r="0.6" fx="0.4" fy="0.3">
                    <stop offset="0%" stopColor="#255523" />
                    <stop offset="100%" stopColor="#0B2610" />
                </radialGradient>

                {/* Lime to Yellow Circuit Gradient */}
                <linearGradient id="circuitGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#CDFA3D" />
                    <stop offset="40%" stopColor="#AEE928" />
                    <stop offset="100%" stopColor="#5DBD30" />
                </linearGradient>

                {/* Bright Emerald Arrow and Leaf Gradient */}
                <linearGradient id="leafGrad" x1="0" y1="1" x2="0.8" y2="0">
                    <stop offset="0%" stopColor="#038848" />
                    <stop offset="40%" stopColor="#1BB54F" />
                    <stop offset="100%" stopColor="#7CDD28" />
                </linearGradient>

                {/* Outer wrapping ring gradient */}
                <linearGradient id="ringGrad" x1="0" y1="0" x2="0.8" y2="1">
                    <stop offset="0%" stopColor="#8FEB25" />
                    <stop offset="60%" stopColor="#1EB446" />
                    <stop offset="100%" stopColor="#0B5D2D" />
                </linearGradient>
            </defs>

            {/* --- LAYER 1: The Dark Globe Base --- */}
            <circle cx="100" cy="100" r="72" fill="url(#globeGrad)" />

            {/* --- LAYER 2: Abstract Continents (Slightly lighter green patches) --- */}
            {/* North America / Left */}
            <path d="M 60 45 Q 85 45 90 60 Q 95 85 80 100 Q 65 110 50 90 Q 30 70 60 45 Z" fill="#2E692D" opacity="0.6" />
            {/* South America / Bottom Left */}
            <path d="M 70 110 Q 90 110 95 130 Q 100 160 85 165 Q 65 150 70 110 Z" fill="#2E692D" opacity="0.6" />
            {/* Eurasia / Right */}
            <path d="M 115 45 Q 150 40 160 55 Q 165 75 140 85 Q 120 90 115 45 Z" fill="#2E692D" opacity="0.4" />
            {/* Africa / Bottom Right */}
            <path d="M 125 95 Q 160 100 155 130 Q 145 160 120 150 Q 110 130 125 95 Z" fill="#2E692D" opacity="0.4" />

            {/* --- LAYER 3: White Highlight Continents (The "snow/clouds") --- */}
            <g fill="#FFFFFF" opacity="0.9">
                <path d="M 90 40 Q 105 35 110 45 Q 105 55 95 50 Q 88 45 90 40 Z" />
                <path d="M 115 55 Q 130 50 135 60 Q 125 70 115 65 Q 110 60 115 55 Z" />
                <path d="M 120 75 Q 125 70 130 75 Q 125 80 120 75 Z" />
                <path d="M 140 60 Q 150 55 155 65 Q 145 70 140 65 Z" />
                <path d="M 70 50 Q 80 48 82 55 Q 75 60 70 55 Z" />
            </g>

            {/* --- LAYER 4: The Circuit Board Patterns (The core detail) --- */}
            <g stroke="url(#circuitGrad)" strokeLinecap="round" strokeLinejoin="miter" fill="none" opacity="0.95">

                {/* Left Hemisphere Dense Matrix */}
                <g strokeWidth="2.5">
                    {/* Main vertical bus */}
                    <path d="M 68 50 L 68 85 L 85 102 L 85 130" />
                    <path d="M 58 65 L 58 95 L 75 112 L 75 145" />

                    {/* Top horizontals */}
                    <path d="M 40 70 L 50 70 L 60 60 L 68 60" />
                    <path d="M 35 85 L 45 85 L 50 80 L 58 80" />
                    <path d="M 50 45 L 60 45 L 68 53" />

                    {/* Diagonal sprawling traces */}
                    <path d="M 68 75 L 80 75 L 90 65 L 105 65 M 105 65 L 115 55" />
                    <path d="M 85 115 L 95 115 L 110 100 L 125 100" />
                    <path d="M 75 135 L 85 135 L 95 125 L 110 125" />

                    {/* Bottom left matrix */}
                    <path d="M 45 105 L 55 105 L 65 115 L 75 115" />
                    <path d="M 55 125 L 65 125 L 75 115" />
                    <path d="M 60 145 L 70 145 L 75 140" />
                </g>

                {/* Medium Traces */}
                <g strokeWidth="1.5">
                    <path d="M 50 55 L 58 55 L 63 50" />
                    <path d="M 45 80 L 52 80 L 55 77" />
                    <path d="M 75 60 L 85 60 L 95 50" />
                    <path d="M 85 90 L 95 90 L 105 80 L 115 80" />
                    <path d="M 95 135 L 105 135 L 115 125 M 115 125 L 125 125" />
                </g>

                {/* Micro Traces */}
                <g strokeWidth="1" opacity="0.8">
                    <path d="M 40 60 L 45 60 M 70 95 L 80 95" />
                    <path d="M 85 105 L 90 105 L 95 100" />
                    <path d="M 90 125 L 95 130 L 100 130" />
                    <path d="M 100 75 L 105 75 L 110 70" />
                </g>

                {/* Highlight Drops/Nodes on the Circuit */}
                <g fill="url(#circuitGrad)" stroke="none">
                    <circle cx="40" cy="70" r="3" />
                    <circle cx="35" cy="85" r="3" />
                    <circle cx="50" cy="45" r="3" />
                    <circle cx="105" cy="65" r="3.5" />
                    <circle cx="115" cy="55" r="3" />
                    <circle cx="125" cy="100" r="3.5" />
                    <circle cx="110" cy="125" r="3" />

                    <circle cx="45" cy="105" r="2.5" />
                    <circle cx="55" cy="125" r="2.5" />
                    <circle cx="60" cy="145" r="2.5" />

                    {/* Micro nodes */}
                    <circle cx="115" cy="80" r="2" />
                    <circle cx="125" cy="125" r="2" />
                    <circle cx="95" cy="50" r="2" />
                </g>
            </g>

            {/* Right side floating Tech-Block/Continent overlay */}
            <g fill="none" stroke="url(#leafGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
                <path d="M 120 100 L 135 100 L 145 90 L 145 75 L 135 75 L 120 90 Z" fill="#1BB54F" fillOpacity="0.2" />
                <path d="M 125 105 L 140 105 L 150 95 L 150 80" />
                <path d="M 122 95 L 132 95 L 140 87" strokeWidth="1" />
                <path d="M 128 85 L 135 85 L 140 80" strokeWidth="1" />
            </g>

            {/* --- LAYER 5: The Outer Ring & Swooped Arrow (Left -> Bottom) --- */}
            <g>
                {/* Dynamic swooping outer ring going top-right to bottom-left */}
                <path d="M 140 38 Q 120 20 85 20 Q 25 20 25 100 Q 25 150 80 165 L 100 168"
                    fill="none" stroke="url(#ringGrad)" strokeWidth="8" strokeLinecap="round" />
                <path d="M 140 38 Q 120 20 85 20 Q 25 20 25 100 Q 25 150 80 165 L 100 168"
                    fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

                {/* Tiny disconnected accents on the swoop */}
                <path d="M 33 130 L 38 120 M 28 65 L 34 50" stroke="#8FEB25" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                {/* The Arrow Head pointing right at the bottom */}
                <path d="M 115 168 L 90 155 Q 98 165 90 175 Z" fill="url(#ringGrad)" />
                <path d="M 115 168 L 90 155 Q 98 165 90 175 Z" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
                <path d="M 85 165 L 105 168" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
            </g>

            {/* --- LAYER 6: The Organic Leaf (Right Side) --- */}
            <g>
                {/* Outer swooping leaf stem wrapping the right side */}
                <path d="M 130 160 Q 185 140 165 70 Q 155 45 125 35" fill="none" stroke="#0B5D2D" strokeWidth="5" strokeLinecap="round" />
                <path d="M 130 160 Q 185 140 165 70 Q 155 45 125 35" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

                {/* Massive Leaf Blade bursting out of the bottom right */}
                <path d="M 110 155 Q 155 150 160 100 Q 140 120 110 155 Z" fill="url(#leafGrad)" />
                <path d="M 110 155 Q 155 150 160 100 Q 140 120 110 155 Z" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />

                {/* Leaf veins */}
                <path d="M 110 155 Q 140 135 158 103" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
                <path d="M 125 142 L 135 125" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
                <path d="M 138 132 L 148 118" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
                <path d="M 138 141 L 148 135" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
            </g>
        </svg>
    );
};

export default Logo3D;
