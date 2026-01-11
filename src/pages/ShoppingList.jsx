import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ShoppingList = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [activeTab, setActiveTab] = useState('tobuy');
    const [newItem, setNewItem] = useState('');

    const [items, setItems] = useLocalStorage('stitch_shopping_list', [
        { id: 1, name: 'Milk (2 gallons)', category: 'Dairy', assignedTo: 'Dad', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3My3vA8b3Ss3_LwWzFqeiQ4okGdp1Hij4DM4FlcRgkWzTLurOlGzGdcc6zgVSPaGzMOGxryEYdVT3RlNvdvmYoUF9Pjo9iPdS-evIBYowIMB0x4dfeSbtkPES70hvLtjTqqNlGFlgG02rliWgS-YjtQTKHBKrkmLDxSOc1xxktoYxFDG5pqQ6Q9kwFeXt_OQSCc86gpdalG_RJjt1zD6B0kCiyeb3hSEpK5T70xsxVsB4yVEmDz6hfIEXWv4yRbVJlIQxDVVnkmkM', checked: false },
        { id: 2, name: 'Bananas', category: 'Produce', assignedTo: 'Mom', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS7fNmZ1HJxnC2xcgdPqqjdg0m4mkaNLMUrpCTLqYP1fvmP3bYXASU3zyA0sQXgJBd3vxBdOk3KWGodGluX5ueUcAZ_UontIzz2MXiqrsCKPXgOQywLyYqaujcuVbsDugdvaVZczCL8CPQysocc-eeRkI2JHC3T4h4juV_Obn0tXuzD4i_xCl_r-7xrh-a6RooZV59e8UK2gX4Ftx0RZXh5MVkzVdUU-waDeD8k3ElToyLMQF-WSdwb059MJ9Jg4Emmz45Nuqfgrve', checked: false },
        { id: 3, name: 'Whole Wheat Bread', category: 'Bakery', assignedTo: 'Kids', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5JI2VHxRvvsEqR6Z1yV87JE5CgV7fmWJV5ZDYX9bGl8HWVWWuG0Sskv8NcJp4wokHXf9EqCuzR5wxFzLO9TrGvu4ZX7an07_apN2gFhXbDAuUGO5ewxv1jw1hCzeks0_is1mjMG4CJi3S67dsExkH71zwWnqRI5LDxaXrJ98Od3Gl0FCXvzxmIV_0WwnnJ49TUA3Z7I5fwm8pYDP624ldsKFZ95nPmQIV2X4JPN6J7eHnwnh_3q7tMLR6ak8OPtyE-kBsaQ2J36pH', checked: false },
        { id: 4, name: 'Eggs (1 dozen)', category: 'Dairy', assignedTo: 'Dad', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3My3vA8b3Ss3_LwWzFqeiQ4okGdp1Hij4DM4FlcRgkWzTLurOlGzGdcc6zgVSPaGzMOGxryEYdVT3RlNvdvmYoUF9Pjo9iPdS-evIBYowIMB0x4dfeSbtkPES70hvLtjTqqNlGFlgG02rliWgS-YjtQTKHBKrkmLDxSOc1xxktoYxFDG5pqQ6Q9kwFeXt_OQSCc86gpdalG_RJjt1zD6B0kCiyeb3hSEpK5T70xsxVsB4yVEmDz6hfIEXWv4yRbVJlIQxDVVnkmkM', checked: false },
    ]);

    useGSAP(() => {
        // Header elements
        gsap.from(".header-anim", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });

        // Toggle switch
        gsap.from(".toggle-container", {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "back.out(1.7)"
        });

        // List items stagger
        gsap.from(".shopping-item", {
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.3,
            ease: "power3.out"
        });

        // Input bar entrance
        gsap.from(".input-bar", {
            y: 60,
            opacity: 0,
            duration: 0.7,
            delay: 0.5,
            ease: "back.out(1.5)"
        });
    }, { scope: containerRef });

    const handleToggle = (id) => {
        const item = items.find(i => i.id === id);
        const wasChecked = item?.checked;

        setItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        }));

        // Celebration animation when checking off
        if (!wasChecked) {
            // Scale bounce
            gsap.to(`#item-${id}`, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });

            // Checkmark pop
            gsap.fromTo(`#check-${id}`,
                { scale: 0, rotation: -45 },
                { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }
            );

            // Mini confetti burst
            createConfetti(id);
        }
    };

    const createConfetti = (id) => {
        const element = document.getElementById(`item-${id}`);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const colors = ['#d4ff00', '#22d3ee', '#8b5cf6', '#fb7185'];

        for (let i = 0; i < 8; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                left: ${rect.left + 20}px;
                top: ${rect.top + rect.height / 2}px;
                width: 6px;
                height: 6px;
                background: ${colors[i % colors.length]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
            `;
            document.body.appendChild(confetti);

            gsap.to(confetti, {
                x: (Math.random() - 0.5) * 100,
                y: -50 - Math.random() * 50,
                rotation: Math.random() * 360,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => confetti.remove()
            });
        }
    };

    const handleAddItem = () => {
        if (!newItem.trim()) return;
        const newItemObj = {
            id: Date.now(),
            name: newItem,
            category: 'General',
            assignedTo: 'Anyone',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS7fNmZ1HJxnC2xcgdPqqjdg0m4mkaNLMUrpCTLqYP1fvmP3bYXASU3zyA0sQXgJBd3vxBdOk3KWGodGluX5ueUcAZ_UontIzz2MXiqrsCKPXgOQywLyYqaujcuVbsDugdvaVZczCL8CPQysocc-eeRkI2JHC3T4h4juV_Obn0tXuzD4i_xCl_r-7xrh-a6RooZV59e8UK2gX4Ftx0RZXh5MVkzVdUU-waDeD8k3ElToyLMQF-WSdwb059MJ9Jg4Emmz45Nuqfgrve',
            checked: false
        };
        setItems([newItemObj, ...items]);
        setNewItem('');
    };

    const filteredItems = items.filter(item =>
        activeTab === 'tobuy' ? !item.checked : item.checked
    );

    const uncheckedCount = items.filter(i => !i.checked).length;
    const checkedCount = items.filter(i => i.checked).length;

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-void text-text-main overflow-x-hidden pb-36">
            <div className="gradient-mesh" />
            <div className="noise-bg" />

            {/* Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-void/60 backdrop-blur-xl border-b border-white/5">
                <button onClick={() => navigate(-1)} className="header-anim p-2 -ml-2 rounded-xl hover:bg-white/5 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <h2 className="header-anim text-lg font-display font-semibold">Shopping List</h2>
                <button className="header-anim p-2 rounded-xl hover:bg-white/5 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">person_add</span>
                </button>
            </header>

            {/* Tab Switcher */}
            <div className="px-5 py-4 sticky top-[72px] z-20 bg-void/50 backdrop-blur-sm">
                <div className="toggle-container flex bg-surface p-1 rounded-2xl border border-white/10 shadow-glass">
                    <button
                        onClick={() => setActiveTab('tobuy')}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'tobuy'
                                ? 'bg-primary text-void shadow-neon-sm'
                                : 'text-text-muted hover:text-white'
                            }`}
                    >
                        To Buy ({uncheckedCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('purchased')}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'purchased'
                                ? 'bg-success/80 text-void'
                                : 'text-text-muted hover:text-white'
                            }`}
                    >
                        Done ({checkedCount})
                    </button>
                </div>
            </div>

            {/* Items List */}
            <div className="px-5 space-y-3 mt-2">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-4xl text-text-muted mb-3">
                            {activeTab === 'tobuy' ? 'shopping_cart' : 'check_circle'}
                        </span>
                        <p className="text-text-muted">
                            {activeTab === 'tobuy' ? 'All items purchased!' : 'No completed items yet'}
                        </p>
                    </div>
                ) : (
                    filteredItems.map((item) => (
                        <div
                            key={item.id}
                            id={`item-${item.id}`}
                            onClick={() => handleToggle(item.id)}
                            className={`shopping-item flex items-center gap-4 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 ${item.checked
                                    ? 'bg-surface/50 border-white/5 opacity-60'
                                    : 'glass-card glass-card-hover'
                                }`}
                        >
                            {/* Custom Checkbox */}
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${item.checked
                                        ? 'bg-success border-success'
                                        : 'border-white/20 group-hover:border-primary'
                                    }`} />
                                {item.checked && (
                                    <span
                                        id={`check-${item.id}`}
                                        className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-void text-base font-bold"
                                    >
                                        check
                                    </span>
                                )}
                            </div>

                            {/* Item Details */}
                            <div className="flex-1 min-w-0">
                                <p className={`text-base font-semibold truncate transition-all ${item.checked ? 'text-text-muted line-through' : 'text-white'
                                    }`}>
                                    {item.name}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-primary/70 font-mono">{item.category}</span>
                                    <span className="text-text-dim">•</span>
                                    <span className="text-xs text-text-muted">{item.assignedTo}</span>
                                </div>
                            </div>

                            {/* Avatar */}
                            <img
                                className="h-8 w-8 rounded-full border-2 border-surface object-cover flex-shrink-0"
                                src={item.avatar}
                                alt={item.assignedTo}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Floating Input */}
            <div className="input-bar fixed bottom-24 left-4 right-4 z-40">
                <div className="flex items-center gap-2 bg-surface/95 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-glass">
                    <input
                        className="flex-1 h-12 px-4 bg-transparent text-white placeholder:text-text-muted focus:outline-none text-sm font-medium"
                        placeholder="Add an item..."
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                    />
                    <button
                        onClick={handleAddItem}
                        className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-void shadow-neon-sm hover:scale-110 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined font-bold">add</span>
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};
