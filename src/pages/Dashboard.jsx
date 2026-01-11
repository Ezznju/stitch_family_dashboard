import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { FamilyOrbit } from '../components/FamilyOrbit';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

gsap.registerPlugin(ScrollTrigger);

export const Dashboard = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [firstName] = useLocalStorage('stitch_user_first_name', 'Sarah');
    const { photo } = usePhotoGallery();

    const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDS7fNmZ1HJxnC2xcgdPqqjdg0m4mkaNLMUrpCTLqYP1fvmP3bYXASU3zyA0sQXgJBd3vxBdOk3KWGodGluX5ueUcAZ_UontIzz2MXiqrsCKPXgOQywLyYqaujcuVbsDugdvaVZczCL8CPQysocc-eeRkI2JHC3T4h4juV_Obn0tXuzD4i_xCl_r-7xrh-a6RooZV59e8UK2gX4Ftx0RZXh5MVkzVdUU-waDeD8k3ElToyLMQF-WSdwb059MJ9Jg4Emmz45Nuqfgrve";

    useGSAP(() => {
        // Header entrance
        gsap.from(".header-anim", {
            y: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });

        // Hero greeting text
        gsap.from(".hero-text", {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.3
        });

        // Cards with scroll-triggered stagger
        gsap.from(".dashboard-card", {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
                trigger: ".cards-container",
                start: "top 85%",
            }
        });

        // Parallax effect on cards as you scroll
        gsap.to(".parallax-card", {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
                trigger: ".cards-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

    }, { scope: containerRef });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-void text-text-main overflow-x-hidden pb-28">
            {/* Animated Background */}
            <div className="gradient-mesh" />
            <div className="noise-bg" />

            {/* Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-void/60 backdrop-blur-xl border-b border-white/5">
                <div className="header-anim flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-neon">
                            <span className="text-void font-bold text-lg font-display">S</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-display font-bold tracking-tight">
                            Family<span className="text-primary">Hub</span>
                        </h1>
                    </div>
                </div>
                <Link to="/profile" className="header-anim">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-50 blur group-hover:opacity-100 transition-opacity" />
                        <img
                            alt="User"
                            className="relative h-10 w-10 rounded-full object-cover border-2 border-void"
                            src={photo?.webviewPath || defaultAvatar}
                        />
                    </div>
                </Link>
            </header>

            {/* Hero Section with Orbit */}
            <section className="relative px-5 pt-6 pb-8">
                <div className="mb-6">
                    <p className="hero-text text-text-muted text-sm font-mono uppercase tracking-widest mb-2">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                    <h2 className="hero-text text-4xl font-display font-bold leading-tight">
                        {getGreeting()},
                    </h2>
                    <h2 className="hero-text text-4xl font-display font-bold text-gradient leading-tight">
                        {firstName}
                    </h2>
                </div>

                {/* Family Orbit - The "Woah" Factor */}
                <div className="relative -mx-5 py-8">
                    <FamilyOrbit scrollTrigger={true} />
                    <p className="text-center text-text-muted text-xs font-mono mt-4 uppercase tracking-wider">
                        Your Family Constellation
                    </p>
                </div>
            </section>

            {/* Quick Actions Cards */}
            <section className="cards-container px-5 space-y-4">
                {/* Today's Schedule - Hero Card */}
                <div
                    onClick={() => navigate('/schedule')}
                    className="dashboard-card parallax-card group relative overflow-hidden rounded-3xl bg-surface border border-white/10 shadow-glass cursor-pointer transition-all duration-500 hover:border-primary/30 hover:shadow-neon-sm"
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:from-primary/20 transition-colors" />

                    <div className="relative p-5 z-10">
                        <div className="flex justify-between items-start mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-display font-semibold text-white">Today's Schedule</h3>
                                    <p className="text-xs text-text-muted font-mono">4 events</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-primary text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                arrow_outward
                            </span>
                        </div>

                        <div className="space-y-3">
                            {/* Current Event */}
                            <div className="flex gap-3 items-center p-3 rounded-xl bg-white/5 border border-primary/20">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-neon animate-pulse" />
                                    <div className="w-0.5 h-6 bg-gradient-to-b from-primary/50 to-transparent" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-semibold text-white">School Drop-off</p>
                                    <p className="text-primary font-mono text-xs">NOW • 8:00 AM</p>
                                </div>
                            </div>

                            {/* Next Event */}
                            <div className="flex gap-3 items-center px-3 opacity-60">
                                <div className="flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full border border-white/30" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-text-main">Doctor's Appointment</p>
                                    <p className="text-text-muted font-mono text-xs">10:30 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Cards */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Chores */}
                    <div
                        onClick={() => navigate('/chores')}
                        className="dashboard-card group bg-surface border border-white/10 rounded-2xl p-4 shadow-glass cursor-pointer relative overflow-hidden transition-all duration-300 hover:border-secondary/30"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-secondary text-xl">task_alt</span>
                            </div>
                            <h4 className="text-base font-display font-semibold text-white mb-1">Chores</h4>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-mono font-bold text-secondary">1</span>
                                <span className="text-text-muted text-xs">/ 3 done</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 mt-3 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-secondary to-secondary/60 h-full w-1/3 rounded-full shadow-neon-purple" />
                            </div>
                        </div>
                    </div>

                    {/* Shopping */}
                    <div
                        onClick={() => navigate('/shopping')}
                        className="dashboard-card group bg-surface border border-white/10 rounded-2xl p-4 shadow-glass cursor-pointer relative overflow-hidden transition-all duration-300 hover:border-accent/30"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-accent text-xl">shopping_bag</span>
                            </div>
                            <h4 className="text-base font-display font-semibold text-white mb-1">Shopping</h4>
                            <p className="text-sm text-text-main line-clamp-1">Milk, Bananas...</p>
                            <p className="text-xs text-accent font-mono mt-1">+2 items</p>
                        </div>
                    </div>
                </div>

                {/* Emergency/Location Card */}
                <div
                    onClick={() => navigate('/emergency')}
                    className="dashboard-card parallax-card bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-glass cursor-pointer group"
                >
                    <div className="relative h-28 bg-surface-highlight overflow-hidden">
                        <img
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuABuxPpDehQIGVvM_-BUwWDwuwzqT92CC_pfdPdTPr3zX9-3mmd6-CJ2J21y0OYjsK8DyB6muLrHgYXjqRtw_YrhsRdkI0koQjCT30nzbNqpItB7rwtNj_vhnC2LCq0QkLRb0jkZ-0h0zrJCOYa6AmlfIX9s0ZPMI8FG0q-23pbnOYcBj34rMxOKHkLRXZ6RyKyKY301uAUcH70EcovxZyLYG8IRNtE1gOqwevjTD3eE7vMiQ9cgzeN5qLRCoElfBakzhuRYwFRGELy"
                            alt="Map"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                <img className="h-8 w-8 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5JI2VHxRvvsEqR6Z1yV87JE5CgV7fmWJV5ZDYX9bGl8HWVWWuG0Sskv8NcJp4wokHXf9EqCuzR5wxFzLO9TrGvu4ZX7an07_apN2gFhXbDAuUGO5ewxv1jw1hCzeks0_is1mjMG4CJi3S67dsExkH71zwWnqRI5LDxaXrJ98Od3Gl0FCXvzxmIV_0WwnnJ49TUA3Z7I5fwm8pYDP624ldsKFZ95nPmQIV2X4JPN6J7eHnwnh_3q7tMLR6ak8OPtyE-kBsaQ2J36pH" alt="Kid 1" />
                                <img className="h-8 w-8 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk4qB4Om6ajEr_WqvtwY0F-qqMVBLLr633L8Kg6ygbCNxc-n3a6SmSSND6dKrypM3SNvtnucRVToB2aXZOSg4ekUC7zowpCDIfQP1GHkQjYsxMuX-n-Awqo9CDocaknETE78ZO9KWsjWbjj1UtFuOntQh0UUl-uMSW5hJoW0Fjj2mwgtkq7YUU3-kKJicZL9IN0qibMvRkAAX5dc5-1kGCkRA0BLPt-1s7CKXdx09HdzCujs-lbTu56PiKkMnDzcgsmKWHqm-e9-Hx" alt="Kid 2" />
                            </div>
                            <div>
                                <span className="text-white font-medium text-sm">Family Locations</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                    <span className="text-success text-xs font-mono">All Safe</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Add FAB */}
            <button className="fixed bottom-28 right-5 z-40 flex items-center justify-center w-14 h-14 bg-primary text-void rounded-2xl shadow-neon hover:scale-110 hover:rotate-90 active:scale-95 transition-all duration-300">
                <span className="material-symbols-outlined text-2xl font-bold">add</span>
            </button>

            <BottomNav />
        </div>
    );
};
