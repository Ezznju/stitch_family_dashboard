import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Calendar = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [viewMode, setViewMode] = useState('month');

    const today = new Date();
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Events on specific days
    const eventDays = {
        2: { title: 'Team Meeting', color: '#8b5cf6' },
        5: { title: 'Birthday Party', color: '#fb7185' },
        12: { title: 'Doctor Visit', color: '#22d3ee' },
        18: { title: 'School Event', color: '#fbbf24' },
        26: { title: 'Family Dinner', color: '#d4ff00' },
        28: { title: 'Halloween Prep', color: '#f97316' },
    };

    useGSAP(() => {
        // Header animation
        gsap.from(".header-anim", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });

        // View switcher
        gsap.from(".view-switcher", {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "back.out(1.7)"
        });

        // Calendar grid - ripple from today (center)
        const todayIndex = today.getDate() - 1;
        gsap.from(".calendar-day", {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: {
                each: 0.02,
                from: todayIndex,
                grid: "auto"
            },
            delay: 0.3,
            ease: "back.out(1.5)"
        });

        // Event cards slide up
        gsap.from(".event-preview", {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.8,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    // Get days in current month
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-void text-text-main overflow-x-hidden pb-28">
            <div className="gradient-mesh" />
            <div className="noise-bg" />

            {/* Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-void/60 backdrop-blur-xl border-b border-white/5">
                <button className="header-anim p-2 -ml-2 rounded-xl hover:bg-white/5 text-white transition-colors" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <h2 className="header-anim text-lg font-display font-semibold">{currentMonth}</h2>
                <button className="header-anim p-2 rounded-xl hover:bg-white/5 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">tune</span>
                </button>
            </header>

            {/* View Switcher */}
            <div className="flex justify-center py-4 sticky top-[72px] z-20 bg-void/50 backdrop-blur-sm">
                <div className="view-switcher flex bg-surface p-1 rounded-2xl border border-white/10 shadow-glass">
                    {['Month', 'Week', 'Day'].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode.toLowerCase())}
                            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${viewMode === mode.toLowerCase()
                                    ? 'bg-primary text-void font-bold shadow-neon-sm'
                                    : 'text-text-muted hover:text-white'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 text-center mb-3">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-text-muted text-[10px] font-mono font-bold py-2 tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1.5">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {/* Actual days */}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                        const isToday = day === today.getDate();
                        const isSelected = day === selectedDay;
                        const hasEvent = eventDays[day];

                        return (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`calendar-day aspect-square relative flex flex-col items-center justify-center rounded-xl transition-all duration-300 border ${isToday
                                        ? 'bg-primary/10 border-primary text-primary font-bold shadow-neon-sm'
                                        : isSelected
                                            ? 'bg-surface border-white/20 text-white'
                                            : 'border-transparent hover:border-white/10 hover:bg-white/5 text-text-main'
                                    }`}
                            >
                                <span className="text-sm font-medium">{day}</span>
                                {hasEvent && (
                                    <div
                                        className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: hasEvent.color }}
                                    />
                                )}
                                {isToday && (
                                    <div className="absolute inset-0 rounded-xl border border-primary/50 animate-pulse-slow" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Event Previews */}
                <div className="mt-8 space-y-3">
                    <h3 className="text-text-muted font-mono text-[10px] uppercase tracking-[0.2em] px-1">
                        {selectedDay === today.getDate() ? "Today's Events" : `Events on ${selectedDay}`}
                    </h3>

                    {eventDays[selectedDay] ? (
                        <div className="event-preview glass-card rounded-2xl p-4 flex gap-4 items-center group cursor-pointer hover:border-primary/30 transition-all">
                            <div
                                className="flex flex-col items-center justify-center w-14 h-14 rounded-xl border border-white/5 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: `${eventDays[selectedDay].color}15` }}
                            >
                                <span className="text-[10px] font-bold uppercase font-mono" style={{ color: eventDays[selectedDay].color }}>
                                    {today.toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                                <span className="text-xl font-bold leading-none" style={{ color: eventDays[selectedDay].color }}>
                                    {selectedDay}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-display font-semibold group-hover:text-primary transition-colors">
                                    {eventDays[selectedDay].title}
                                </h4>
                                <p className="text-text-muted text-xs font-mono">6:00 PM • Home</p>
                            </div>
                            <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">
                                chevron_right
                            </span>
                        </div>
                    ) : (
                        <div className="event-preview glass-card rounded-2xl p-6 text-center">
                            <span className="material-symbols-outlined text-3xl text-text-muted mb-2">event_busy</span>
                            <p className="text-text-muted text-sm">No events scheduled</p>
                            <button className="mt-3 text-primary text-sm font-semibold hover:underline">
                                + Add Event
                            </button>
                        </div>
                    )}

                    {/* Upcoming Events */}
                    <h3 className="text-text-muted font-mono text-[10px] uppercase tracking-[0.2em] px-1 pt-4">
                        Upcoming
                    </h3>
                    {Object.entries(eventDays)
                        .filter(([day]) => parseInt(day) > today.getDate())
                        .slice(0, 2)
                        .map(([day, event]) => (
                            <div
                                key={day}
                                className="event-preview glass-card rounded-2xl p-4 flex gap-4 items-center group cursor-pointer hover:border-white/20 transition-all"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${event.color}15` }}
                                >
                                    <span className="text-lg font-bold font-mono" style={{ color: event.color }}>
                                        {day}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-display font-medium group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h4>
                                    <p className="text-text-muted text-xs font-mono">All Day</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
};
