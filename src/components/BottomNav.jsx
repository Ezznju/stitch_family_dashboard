import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const navItems = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/calendar', icon: 'calendar_today', label: 'Calendar', matchRoutes: ['/calendar', '/schedule'] },
    { to: '/chores', icon: 'task_alt', label: 'Chores' },
    { to: '/shopping', icon: 'shopping_bag', label: 'Shop' },
    { to: '/meals', icon: 'restaurant', label: 'Meals' },
];

export const BottomNav = () => {
    const location = useLocation();
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const itemRefs = useRef([]);
    const [isScrolled, setIsScrolled] = useState(false);

    const getActiveIndex = () => {
        return navItems.findIndex(item => {
            if (item.matchRoutes) {
                return item.matchRoutes.includes(location.pathname);
            }
            return location.pathname === item.to;
        });
    };

    const activeIndex = getActiveIndex();

    // Handle scroll to shrink nav
    useEffect(() => {
        let lastScrollY = 0;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setIsScrolled(currentScrollY > 50);
                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animate indicator on route change
    useGSAP(() => {
        if (indicatorRef.current && itemRefs.current[activeIndex]) {
            const activeItem = itemRefs.current[activeIndex];
            const navRect = navRef.current.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();

            gsap.to(indicatorRef.current, {
                x: itemRect.left - navRect.left - 8,
                width: itemRect.width + 16,
                duration: 0.4,
                ease: "power3.out"
            });
        }
    }, { dependencies: [activeIndex] });

    // Initial mount animation
    useGSAP(() => {
        gsap.from(navRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "back.out(1.7)"
        });

        gsap.from(".nav-item", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            delay: 0.5,
            ease: "power3.out"
        });
    }, { scope: navRef });

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe transition-all duration-300 ${isScrolled ? 'pb-3' : ''}`}>
            <nav
                ref={navRef}
                className={`relative mx-auto flex items-center justify-around gap-1 bg-surface/90 backdrop-blur-xl border border-white/10 shadow-glass transition-all duration-500 ${isScrolled
                        ? 'rounded-full px-4 py-2 max-w-[280px]'
                        : 'rounded-3xl px-6 py-3 max-w-[400px]'
                    }`}
            >
                {/* Morphing Indicator */}
                <div
                    ref={indicatorRef}
                    className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-12px)] bg-primary/10 rounded-2xl border border-primary/20 pointer-events-none"
                    style={{ left: 0, width: 60 }}
                >
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-sm" />
                </div>

                {navItems.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            ref={el => itemRefs.current[index] = el}
                            className={`nav-item relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${isActive
                                    ? 'text-primary'
                                    : 'text-text-muted hover:text-text-main'
                                }`}
                        >
                            <span
                                className={`material-symbols-outlined text-[22px] transition-all duration-300 ${isActive ? 'scale-110' : ''
                                    }`}
                                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                {item.icon}
                            </span>
                            <span className={`text-[9px] font-mono font-medium uppercase tracking-wider transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};
