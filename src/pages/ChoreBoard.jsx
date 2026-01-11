import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ChoreBoard = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [filter, setFilter] = useState('all');

    const [chores, setChores] = useLocalStorage('stitch_chores_list', [
        { id: 1, title: 'Clean your room', points: 50, assignedTo: 'Kids', icon: 'bed', color: '#22d3ee', done: false },
        { id: 2, title: 'Walk the dog', points: 30, assignedTo: 'Dad', icon: 'pets', color: '#fb7185', done: false },
        { id: 3, title: 'Do the dishes', points: 40, assignedTo: 'Mom', icon: 'countertops', color: '#8b5cf6', done: true },
        { id: 4, title: 'Take out trash', points: 20, assignedTo: 'Dad', icon: 'delete', color: '#fbbf24', done: false },
        { id: 5, title: 'Vacuum living room', points: 35, assignedTo: 'Kids', icon: 'weekend', color: '#d4ff00', done: false },
    ]);

    const totalPoints = chores.reduce((sum, c) => sum + (c.done ? c.points : 0), 0);
    const maxPoints = chores.reduce((sum, c) => sum + c.points, 0);

    useGSAP(() => {
        // Header anim
        gsap.from(".header-anim", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });

        // Stats card
        gsap.from(".stats-card", {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "back.out(1.5)"
        });

        // Filter buttons
        gsap.from(".filter-btn", {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.4,
            ease: "back.out(2)"
        });

        // Chore items
        gsap.from(".chore-item", {
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.5,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    const handleToggle = (id) => {
        const chore = chores.find(c => c.id === id);
        const wasCompleted = chore?.done;

        setChores(prev => prev.map(c => {
            if (c.id === id) {
                return { ...c, done: !c.done };
            }
            return c;
        }));

        if (!wasCompleted) {
            // Celebration animation
            gsap.to(`#chore-${id}`, {
                scale: 1.02,
                duration: 0.15,
                yoyo: true,
                repeat: 1
            });

            // Spin the checkmark
            gsap.fromTo(`#check-icon-${id}`,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" }
            );

            // Points popup
            const choreEl = document.getElementById(`chore-${id}`);
            if (choreEl) {
                const popup = document.createElement('div');
                popup.className = 'fixed z-50 text-primary font-mono font-bold text-lg pointer-events-none';
                popup.textContent = `+${chore?.points} XP`;
                const rect = choreEl.getBoundingClientRect();
                popup.style.cssText = `left: ${rect.right - 60}px; top: ${rect.top}px;`;
                document.body.appendChild(popup);

                gsap.to(popup, {
                    y: -40,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => popup.remove()
                });
            }
        }
    };

    const filteredChores = chores.filter(c => {
        if (filter === 'pending') return !c.done;
        if (filter === 'completed') return c.done;
        return true;
    });

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-void text-text-main overflow-x-hidden pb-28">
            <div className="gradient-mesh" />
            <div className="noise-bg" />

            {/* Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-void/60 backdrop-blur-xl border-b border-white/5">
                <button onClick={() => navigate(-1)} className="header-anim p-2 -ml-2 rounded-xl hover:bg-white/5 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <h1 className="header-anim text-lg font-display font-semibold">Chore Board</h1>
                <div className="header-anim w-10" />
            </header>

            {/* Stats Card */}
            <div className="stats-card mx-5 mt-4 p-5 glass-card rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-text-muted text-xs font-mono uppercase tracking-wider">Total XP Earned</p>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-4xl font-bold font-mono text-primary">{totalPoints}</span>
                            <span className="text-text-muted text-sm">/ {maxPoints}</span>
                        </div>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">emoji_events</span>
                    </div>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-700 ease-out"
                        style={{ width: `${(totalPoints / maxPoints) * 100}%` }}
                    />
                </div>
                <p className="text-xs text-text-muted mt-2 text-right">
                    {chores.filter(c => c.done).length} of {chores.length} tasks completed
                </p>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 px-5 mt-6 overflow-x-auto no-scrollbar">
                {['all', 'pending', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`filter-btn px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 capitalize ${filter === f
                                ? 'bg-secondary text-white border-secondary shadow-neon-purple'
                                : 'bg-surface border-white/10 text-text-muted hover:text-white hover:border-white/20'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Chore List */}
            <div className="px-5 mt-6 space-y-3">
                {filteredChores.map((chore) => (
                    <div
                        id={`chore-${chore.id}`}
                        key={chore.id}
                        onClick={() => handleToggle(chore.id)}
                        className={`chore-item group relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${chore.done
                                ? 'bg-surface/50 border-white/5 opacity-60'
                                : 'glass-card glass-card-hover'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            {/* Checkbox */}
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${chore.done
                                    ? 'bg-success border-success'
                                    : 'border-white/20 group-hover:border-primary'
                                }`}>
                                {chore.done && (
                                    <span id={`check-icon-${chore.id}`} className="material-symbols-outlined text-void text-lg font-bold">
                                        check
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className={`text-lg font-display font-semibold transition-all ${chore.done ? 'text-text-muted line-through' : 'text-white'
                                    }`}>
                                    {chore.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span
                                        className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
                                        style={{
                                            color: chore.color,
                                            backgroundColor: `${chore.color}15`,
                                            border: `1px solid ${chore.color}30`
                                        }}
                                    >
                                        +{chore.points} XP
                                    </span>
                                    <span className="text-text-muted text-xs">{chore.assignedTo}</span>
                                </div>
                            </div>

                            {/* Icon */}
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${chore.color}15` }}
                            >
                                <span className="material-symbols-outlined" style={{ color: chore.color }}>
                                    {chore.icon}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* FAB */}
            <button className="fixed bottom-28 right-5 z-40 flex items-center justify-center w-14 h-14 bg-accent text-void rounded-2xl shadow-neon-cyan hover:scale-110 active:scale-95 transition-all duration-300">
                <span className="material-symbols-outlined text-2xl font-bold">add_task</span>
            </button>

            <BottomNav />
        </div>
    );
};
