import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocalStorage } from '../hooks/useLocalStorage';

gsap.registerPlugin(ScrollTrigger);

export const Schedule = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const [firstName] = useLocalStorage('stitch_user_first_name', 'Sarah');

    const initialEvents = [
        { time: "07:30 AM", title: "Wake Up & Breakfast", type: "routine", icon: "sunny", color: "#fbbf24" },
        { time: "08:15 AM", title: "School Drop-off", type: "transport", icon: "directions_car", color: "#d4ff00" },
        { time: "09:00 AM", title: "Work Zoom Call", type: "work", icon: "videocam", color: "#8b5cf6" },
        { time: "10:30 AM", title: "Dentist Appointment", type: "health", icon: "dentistry", color: "#22d3ee" },
        { time: "12:00 PM", title: "Lunch Break", type: "routine", icon: "restaurant", color: "#fb7185" },
        { time: "03:30 PM", title: "School Pickup", type: "transport", icon: "directions_car", color: "#d4ff00" },
    ];

    const [events, setEvents] = useLocalStorage('stitch_schedule_events', initialEvents);
    const [isAdding, setIsAdding] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', time: '12:00 PM', icon: 'event' });

    useGSAP(() => {
        // Header entrance
        gsap.from(".header-anim", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });

        // Date header
        gsap.from(".date-anim", {
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.2,
            ease: "power3.out"
        });

        // Timeline "Draw" Animation - The core scroll scrub effect
        if (timelineRef.current) {
            gsap.fromTo(timelineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".schedule-container",
                        start: "top 60%",
                        end: "bottom 40%",
                        scrub: 1.2,
                    }
                }
            );
        }

        // Event Cards Stagger with scroll trigger
        gsap.from(".event-card", {
            x: 60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".schedule-container",
                start: "top 80%"
            }
        });

        // Timeline dots pulse in sequence
        gsap.from(".timeline-dot", {
            scale: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.5,
            ease: "back.out(2)"
        });

    }, { scope: containerRef, dependencies: [events] });

    const handleAddEvent = () => {
        if (!newEvent.title) return;
        const colors = ["#d4ff00", "#8b5cf6", "#22d3ee", "#fb7185", "#fbbf24"];
        setEvents([...events, {
            ...newEvent,
            type: 'activity',
            color: colors[Math.floor(Math.random() * colors.length)]
        }]);
        setNewEvent({ title: '', time: '12:00 PM', icon: 'event' });
        setIsAdding(false);
    };

    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-void text-text-main overflow-x-hidden pb-28">
            <div className="gradient-mesh" />
            <div className="noise-bg" />

            {/* Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-void/60 backdrop-blur-xl border-b border-white/5">
                <button onClick={() => navigate(-1)} className="header-anim p-2 -ml-2 rounded-xl hover:bg-white/5 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <h1 className="header-anim text-lg font-display font-semibold">{firstName}'s Schedule</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="header-anim p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">{isAdding ? 'close' : 'add'}</span>
                </button>
            </header>

            {/* Date Header */}
            <div className="px-6 py-8">
                <p className="date-anim text-primary font-mono text-xs tracking-[0.2em] uppercase mb-2">Today</p>
                <h2 className="date-anim text-4xl font-display font-bold text-white">{dayName}</h2>
                <p className="date-anim text-text-muted font-mono text-sm mt-1">{monthDay}</p>
            </div>

            {/* Add Event Form */}
            {isAdding && (
                <div className="px-5 mb-6 animate-scale-in">
                    <div className="bg-surface border border-primary/30 rounded-2xl p-5 shadow-neon-sm">
                        <input
                            placeholder="What's happening?"
                            className="w-full bg-transparent border-b border-white/10 pb-3 text-white font-display text-lg mb-4 focus:outline-none focus:border-primary placeholder:text-text-muted"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        />
                        <div className="flex gap-3 items-center">
                            <input
                                type="time"
                                className="bg-white/5 rounded-xl px-4 py-2.5 text-sm text-white border border-white/10 focus:border-primary/50 outline-none"
                                onChange={(e) => {
                                    const [h, m] = e.target.value.split(':');
                                    const ampm = h >= 12 ? 'PM' : 'AM';
                                    const hour = h % 12 || 12;
                                    setNewEvent({ ...newEvent, time: `${hour}:${m} ${ampm}` });
                                }}
                            />
                            <button
                                onClick={handleAddEvent}
                                className="flex-1 py-2.5 bg-primary text-void font-bold rounded-xl shadow-neon-sm hover:shadow-neon active:scale-95 transition-all"
                            >
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Timeline Container */}
            <div className="schedule-container relative px-5">
                {/* Background track */}
                <div className="absolute left-[38px] top-0 bottom-0 w-[3px] bg-white/5 rounded-full" />

                {/* Animated gradient timeline */}
                <div
                    ref={timelineRef}
                    className="absolute left-[38px] top-0 w-[3px] rounded-full timeline-gradient timeline-glow"
                    style={{ height: '0%' }}
                />

                <div className="space-y-6 relative z-10">
                    {events.map((event, index) => (
                        <div key={index} className="event-card flex gap-5 items-start group">
                            {/* Timeline Node */}
                            <div className="flex flex-col items-center gap-1 min-w-[32px] pt-1">
                                <div
                                    className="timeline-dot w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                                    style={{
                                        borderColor: event.color,
                                        backgroundColor: index === 0 ? event.color : 'transparent',
                                        boxShadow: index === 0 ? `0 0 12px ${event.color}60` : 'none'
                                    }}
                                >
                                    {index === 0 && <div className="w-1.5 h-1.5 rounded-full bg-void" />}
                                </div>
                            </div>

                            {/* Event Card */}
                            <div className="flex-1 p-4 rounded-2xl bg-surface border border-white/5 shadow-glass group-hover:bg-surface-elevated group-hover:border-white/10 transition-all duration-300">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-display font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="font-mono text-xs font-medium px-2 py-0.5 rounded-md"
                                                style={{
                                                    color: event.color,
                                                    backgroundColor: `${event.color}15`,
                                                    border: `1px solid ${event.color}30`
                                                }}
                                            >
                                                {event.time}
                                            </span>
                                            <span className="text-text-muted text-xs capitalize">{event.type}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: `${event.color}15` }}
                                    >
                                        <span className="material-symbols-outlined text-lg" style={{ color: event.color }}>
                                            {event.icon}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
};
