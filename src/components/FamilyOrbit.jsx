import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const defaultMembers = [
    { name: 'Mom', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS7fNmZ1HJxnC2xcgdPqqjdg0m4mkaNLMUrpCTLqYP1fvmP3bYXASU3zyA0sQXgJBd3vxBdOk3KWGodGluX5ueUcAZ_UontIzz2MXiqrsCKPXgOQywLyYqaujcuVbsDugdvaVZczCL8CPQysocc-eeRkI2JHC3T4h4juV_Obn0tXuzD4i_xCl_r-7xrh-a6RooZV59e8UK2gX4Ftx0RZXh5MVkzVdUU-waDeD8k3ElToyLMQF-WSdwb059MJ9Jg4Emmz45Nuqfgrve', color: '#d4ff00' },
    { name: 'Dad', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3My3vA8b3Ss3_LwWzFqeiQ4okGdp1Hij4DM4FlcRgkWzTLurOlGzGdcc6zgVSPaGzMOGxryEYdVT3RlNvdvmYoUF9Pjo9iPdS-evIBYowIMB0x4dfeSbtkPES70hvLtjTqqNlGFlgG02rliWgS-YjtQTKHBKrkmLDxSOc1xxktoYxFDG5pqQ6Q9kwFeXt_OQSCc86gpdalG_RJjt1zD6B0kCiyeb3hSEpK5T70xsxVsB4yVEmDz6hfIEXWv4yRbVJlIQxDVVnkmkM', color: '#8b5cf6' },
    { name: 'Kids', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5JI2VHxRvvsEqR6Z1yV87JE5CgV7fmWJV5ZDYX9bGl8HWVWWuG0Sskv8NcJp4wokHXf9EqCuzR5wxFzLO9TrGvu4ZX7an07_apN2gFhXbDAuUGO5ewxv1jw1hCzeks0_is1mjMG4CJi3S67dsExkH71zwWnqRI5LDxaXrJ98Od3Gl0FCXvzxmIV_0WwnnJ49TUA3Z7I5fwm8pYDP624ldsKFZ95nPmQIV2X4JPN6J7eHnwnh_3q7tMLR6ak8OPtyE-kBsaQ2J36pH', color: '#22d3ee' },
];

export const FamilyOrbit = ({ members = defaultMembers, scrollTrigger = true }) => {
    const containerRef = useRef(null);
    const orbitRefs = useRef([]);
    const memberRefs = useRef([]);
    const pathRefs = useRef([]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Initial reveal animation for paths
            pathRefs.current.forEach((path, i) => {
                if (path) {
                    gsap.set(path, { strokeDasharray: 1000, strokeDashoffset: 1000 });
                    gsap.to(path, {
                        strokeDashoffset: 0,
                        duration: 1.5,
                        delay: 0.2 + i * 0.15,
                        ease: "power2.out"
                    });
                }
            });

            // Center logo pulse
            gsap.to(".orbit-logo", {
                scale: 1.05,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

            // Set up scroll-driven orbit rotation
            if (scrollTrigger) {
                orbitRefs.current.forEach((orbit, i) => {
                    if (orbit) {
                        const direction = i % 2 === 0 ? 1 : -1;
                        const speed = 360 * (1 + i * 0.3);

                        gsap.to(orbit, {
                            rotation: speed * direction,
                            ease: "none",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1.5,
                            }
                        });
                    }
                });

                // Member avatars counter-rotate to stay upright
                memberRefs.current.forEach((member, i) => {
                    if (member) {
                        const direction = Math.floor(i / 1) % 2 === 0 ? -1 : 1;
                        const speed = 360 * (1 + Math.floor(i / members.length) * 0.3);

                        gsap.to(member, {
                            rotation: speed * direction,
                            ease: "none",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1.5,
                            }
                        });
                    }
                });
            } else {
                // Continuous orbit animation
                orbitRefs.current.forEach((orbit, i) => {
                    if (orbit) {
                        const direction = i % 2 === 0 ? 1 : -1;
                        const duration = 20 + i * 8;

                        gsap.to(orbit, {
                            rotation: 360 * direction,
                            duration: duration,
                            repeat: -1,
                            ease: "none"
                        });
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef, dependencies: [scrollTrigger, members] });

    const orbitSizes = [55, 75, 95]; // percentages
    const memberPositions = [
        { orbit: 0, angle: 0 },
        { orbit: 1, angle: 120 },
        { orbit: 2, angle: 240 },
    ];

    return (
        <div ref={containerRef} className="relative w-full aspect-square max-w-[300px] mx-auto">
            {/* SVG Orbital Paths */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="orbitGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4ff00" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="orbitGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="orbitGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#d4ff00" stopOpacity="0.25" />
                    </linearGradient>
                </defs>
                {orbitSizes.map((size, i) => (
                    <circle
                        key={i}
                        ref={el => pathRefs.current[i] = el}
                        cx="100"
                        cy="100"
                        r={size * 0.9}
                        fill="none"
                        stroke={`url(#orbitGradient${i + 1})`}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                ))}
            </svg>

            {/* Orbital rings with members */}
            {orbitSizes.map((size, orbitIndex) => (
                <div
                    key={orbitIndex}
                    ref={el => orbitRefs.current[orbitIndex] = el}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        width: `${size}%`,
                        height: `${size}%`,
                    }}
                >
                    {/* Members on this orbit */}
                    {members.map((member, memberIndex) => {
                        const pos = memberPositions[memberIndex];
                        if (pos.orbit !== orbitIndex) return null;

                        const angle = (pos.angle * Math.PI) / 180;
                        const x = 50 + 50 * Math.cos(angle);
                        const y = 50 + 50 * Math.sin(angle);

                        return (
                            <div
                                key={memberIndex}
                                ref={el => memberRefs.current[memberIndex] = el}
                                className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                }}
                            >
                                <div className="relative w-full h-full">
                                    <div
                                        className="absolute inset-0 rounded-full blur-md opacity-50"
                                        style={{ backgroundColor: member.color }}
                                    />
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="relative w-full h-full rounded-full object-cover border-2 border-surface"
                                        style={{ boxShadow: `0 0 15px ${member.color}40` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Center Logo */}
            <div className="orbit-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="orbit-logo relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-lg" />
                    <div className="relative w-14 h-14 bg-surface rounded-full flex items-center justify-center border border-white/10 shadow-neon">
                        <span className="text-primary text-2xl font-bold font-display">S</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
