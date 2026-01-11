import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useLocalStorage } from '../hooks/useLocalStorage';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Profile = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { photo, takePhoto } = usePhotoGallery();

    const [firstName, setFirstName] = useLocalStorage('stitch_user_first_name', 'Sarah');
    const [lastName, setLastName] = useLocalStorage('stitch_user_last_name', 'Miller');
    const [role, setRole] = useLocalStorage('stitch_user_role', 'MOM');

    const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuB8MBT9c5zvvfAKONHS37n9m3dihz0m5UNUvbmW-1S4XPYf4bvvpMxPFtImDGhV3e9Cidqn5LjzLj0iEFTOGjSpodHtZNfHNCrubyRoQxAjJVuLhumE8gFkd1InofjpXQGae9d9tMfc9uSeevYrK4o5R3wqhpnpR9Zlt5mMLry0spQQ0q3PqBu0Jz6ptUAeSGmXp0BLUZJgj-zRPGvie673NqdBEm-WXVV833DcJK-6L7mfEwgFSni66rTKL9aUiI3wG8hP9f01RgcB";

    useGSAP(() => {
        // Header cascade
        gsap.from(".header-anim", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });

        // Avatar pop with glow
        gsap.from(".avatar-container", {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "back.out(1.5)"
        });

        // Name reveal
        gsap.from(".name-text", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.4,
            ease: "power3.out"
        });

        // Settings cards cascade
        gsap.from(".settings-card", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.6,
            ease: "power3.out"
        });

        // Logout button
        gsap.from(".logout-btn", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: 0.9,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    const settingsItems = [
        { label: 'Notifications', icon: 'notifications', action: 'toggle', value: true },
        { label: 'Privacy', icon: 'lock', action: 'navigate' },
        { label: 'Family Members', icon: 'group', action: 'navigate' },
        { label: 'Linked Accounts', icon: 'link', action: 'navigate' },
        { label: 'Help & Support', icon: 'help', action: 'navigate' },
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-void text-text-main overflow-x-hidden pb-10">
            <div className="gradient-mesh" />
            <div className="noise-bg" />

            {/* Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-void/60 backdrop-blur-xl border-b border-white/5">
                <button onClick={() => navigate(-1)} className="header-anim p-2 -ml-2 rounded-xl hover:bg-white/5 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <h2 className="header-anim text-lg font-display font-semibold">Profile</h2>
                <button onClick={() => navigate(-1)} className="header-anim text-primary text-sm font-semibold hover:text-white transition-colors px-2">
                    Done
                </button>
            </header>

            {/* Profile Section */}
            <div className="flex flex-col items-center pt-8 pb-6 px-5">
                {/* Avatar with animated border */}
                <div onClick={takePhoto} className="avatar-container relative mb-5 group cursor-pointer">
                    {/* Animated gradient ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-70 blur group-hover:opacity-100 animate-gradient-shift transition-opacity"
                        style={{ backgroundSize: '200% 200%' }} />

                    <div
                        className="relative bg-center bg-no-repeat bg-cover rounded-full h-28 w-28 border-4 border-void transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url("${photo?.webviewPath || defaultAvatar}")` }}
                    />

                    <button className="absolute bottom-0 right-0 bg-primary text-void p-2.5 rounded-full shadow-neon border-4 border-void flex items-center justify-center hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-lg font-bold">camera_alt</span>
                    </button>
                </div>

                {/* Name & Role */}
                <h1 className="name-text text-2xl font-display font-bold text-white">{firstName} {lastName}</h1>
                <div className="name-text flex items-center gap-2 mt-2">
                    <span className="bg-primary/10 text-primary text-xs font-mono font-bold px-3 py-1 rounded-lg border border-primary/20 uppercase">
                        {role}
                    </span>
                    <span className="bg-white/5 text-text-muted text-xs font-mono font-bold px-3 py-1 rounded-lg border border-white/10">
                        ADMIN
                    </span>
                </div>
            </div>

            {/* Personal Info Card */}
            <div className="px-5 mb-6">
                <h3 className="text-text-muted text-xs font-mono uppercase tracking-[0.2em] mb-3 px-1">Personal Information</h3>
                <div className="settings-card glass-card rounded-2xl overflow-hidden">
                    <div className="flex flex-col px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                        <label className="text-primary text-[10px] font-mono font-bold mb-1 uppercase tracking-wider">First Name</label>
                        <input
                            className="w-full bg-transparent border-none p-0 text-white text-base font-medium focus:ring-0 outline-none font-display"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                        <label className="text-primary text-[10px] font-mono font-bold mb-1 uppercase tracking-wider">Last Name</label>
                        <input
                            className="w-full bg-transparent border-none p-0 text-white text-base font-medium focus:ring-0 outline-none font-display"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col px-4 py-4 hover:bg-white/5 transition-colors">
                        <label className="text-primary text-[10px] font-mono font-bold mb-1 uppercase tracking-wider">Role</label>
                        <input
                            className="w-full bg-transparent border-none p-0 text-white text-base font-medium focus:ring-0 outline-none font-display uppercase"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Settings List */}
            <div className="px-5 mb-6">
                <h3 className="text-text-muted text-xs font-mono uppercase tracking-[0.2em] mb-3 px-1">Settings</h3>
                <div className="settings-card glass-card rounded-2xl overflow-hidden">
                    {settingsItems.map((item, i) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-colors ${i < settingsItems.length - 1 ? 'border-b border-white/5' : ''
                                }`}
                        >
                            <span className="material-symbols-outlined text-xl text-text-muted">{item.icon}</span>
                            <span className="flex-1 text-left text-white font-medium">{item.label}</span>
                            {item.action === 'toggle' ? (
                                <div className={`w-11 h-6 rounded-full transition-colors relative ${item.value ? 'bg-primary' : 'bg-white/10'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-void transition-all ${item.value ? 'left-6' : 'left-1'}`} />
                                </div>
                            ) : (
                                <span className="material-symbols-outlined text-xl text-text-muted">chevron_right</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Logout */}
            <div className="logout-btn px-5 pb-8">
                <button className="w-full py-4 text-danger font-display font-semibold text-base glass-card rounded-2xl border border-danger/20 hover:bg-danger/10 hover:border-danger/40 transition-all">
                    Log Out
                </button>
            </div>
        </div>
    );
};
