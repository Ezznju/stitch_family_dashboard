import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Emergency = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const familyContacts = [
        { name: 'Jane Doe', role: 'Mom', label: 'Primary', initials: 'JD', color: '#8b5cf6', online: true },
        { name: 'John Doe', role: 'Dad', label: 'Secondary', initials: 'JD', color: '#22d3ee', online: true },
        { name: 'Grandma Miller', role: 'Grandparent', label: 'Emergency', initials: 'GM', color: '#fb7185', online: false },
    ];

    const emergencyServices = [
        { name: 'Emergency Services', number: '911', icon: 'sos', color: '#ef4444' },
        { name: 'Police Department', number: '555-0123', icon: 'local_police', color: '#3b82f6' },
        { name: 'Fire Department', number: '555-0124', icon: 'fire_truck', color: '#f97316' },
        { name: 'Poison Control', number: '1-800-222-1222', icon: 'medication', color: '#a855f7' },
    ];

    useGSAP(() => {
        // SOS Button Pulse
        gsap.to(".sos-pulse", {
            scale: 1.5,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "power2.out"
        });

        // Header Entry
        gsap.from(".header-anim", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });

        // SOS section
        gsap.from(".sos-card", {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "back.out(1.5)"
        });

        // Service cards
        gsap.from(".service-card", {
            x: 40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.4,
            ease: "power3.out"
        });

        // Contact cards
        gsap.from(".contact-card", {
            x: 40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.6,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-void text-text-main overflow-x-hidden pb-12">
            <div className="gradient-mesh" />
            <div className="noise-bg" />

            {/* Danger-themed Header */}
            <header className="sticky top-0 z-50 bg-danger/5 backdrop-blur-xl border-b border-danger/20 px-5 py-4">
                <div className="flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="header-anim p-2 -ml-2 rounded-xl hover:bg-white/5 text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">arrow_back</span>
                    </button>
                    <h1 className="header-anim text-xl font-display font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-danger text-2xl">emergency</span>
                        Emergency
                    </h1>
                    <button className="header-anim text-danger text-xs font-mono font-bold uppercase px-3 py-1.5 rounded-lg bg-danger/10 border border-danger/30 hover:bg-danger/20 transition-colors">
                        Edit
                    </button>
                </div>
            </header>

            <div className="px-5 py-6 space-y-8">
                {/* Main SOS Card */}
                <section className="sos-card relative">
                    <div className="relative bg-gradient-to-br from-danger/20 to-danger/5 p-6 rounded-3xl border border-danger/30 overflow-hidden">
                        {/* Background pulse */}
                        <div className="absolute inset-0 bg-danger/5 animate-pulse" />

                        <div className="relative z-10 flex items-center gap-5">
                            {/* SOS Button with pulse */}
                            <div className="relative">
                                <div className="sos-pulse absolute inset-0 bg-danger rounded-full" />
                                <button className="relative w-16 h-16 rounded-full bg-danger text-white flex items-center justify-center shadow-lg hover:bg-red-500 active:scale-95 transition-all">
                                    <span className="material-symbols-outlined text-3xl font-bold">sos</span>
                                </button>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-display font-bold text-white mb-1">
                                    Emergency Services
                                </h2>
                                <p className="text-danger/80 text-sm font-mono">Tap to call 911</p>
                            </div>

                            <button className="px-5 py-3 bg-danger hover:bg-red-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all">
                                CALL
                            </button>
                        </div>
                    </div>
                </section>

                {/* Quick Services */}
                <section>
                    <h3 className="text-text-muted text-xs font-mono uppercase tracking-[0.2em] mb-4 px-1">
                        Emergency Numbers
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {emergencyServices.slice(1).map((service, i) => (
                            <button
                                key={service.name}
                                className="service-card p-4 rounded-2xl border border-white/10 glass-card hover:border-white/20 transition-all text-left group"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: `${service.color}20` }}
                                >
                                    <span className="material-symbols-outlined" style={{ color: service.color }}>
                                        {service.icon}
                                    </span>
                                </div>
                                <p className="text-white font-semibold text-sm mb-0.5">{service.name}</p>
                                <p className="text-text-muted text-xs font-mono">{service.number}</p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Family Contacts */}
                <section>
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-text-muted text-xs font-mono uppercase tracking-[0.2em]">
                            Family Contacts
                        </h3>
                        <button className="text-primary text-xs font-mono font-bold uppercase hover:underline">
                            Notify All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {familyContacts.map((contact) => (
                            <div
                                key={contact.name}
                                className="contact-card flex items-center gap-4 p-4 rounded-2xl glass-card glass-card-hover cursor-pointer"
                            >
                                <div className="relative">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border"
                                        style={{
                                            backgroundColor: `${contact.color}20`,
                                            borderColor: `${contact.color}40`,
                                            color: contact.color
                                        }}
                                    >
                                        {contact.initials}
                                    </div>
                                    {contact.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-surface" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-display font-semibold text-white">{contact.name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-text-muted text-xs">{contact.role}</span>
                                        <span
                                            className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                                            style={{
                                                color: contact.color,
                                                backgroundColor: `${contact.color}15`,
                                                border: `1px solid ${contact.color}30`
                                            }}
                                        >
                                            {contact.label}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="w-11 h-11 rounded-full bg-success/90 hover:bg-success text-void flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-neon-sm"
                                    style={{ boxShadow: '0 0 15px rgba(52, 211, 153, 0.3)' }}
                                >
                                    <span className="material-symbols-outlined text-xl">call</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Safety Tip */}
                <section className="glass-card rounded-2xl p-4 border-l-4 border-l-primary">
                    <div className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">tips_and_updates</span>
                        <div>
                            <p className="text-white font-semibold text-sm mb-1">Safety Tip</p>
                            <p className="text-text-muted text-xs leading-relaxed">
                                Make sure all family members know their home address and can describe it to emergency services.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
