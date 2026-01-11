import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const MealPlanner = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const initialMeals = [
        { id: 1, day: "Monday", meal: "Turkey & Cheese Rollups", type: "Lunch", image: "https://images.unsplash.com/photo-1547049082-1a12c3bf2946?auto=format&fit=crop&q=80&w=400" },
        { id: 2, day: "Tuesday", meal: "Chicken Stir-fry", type: "Dinner", image: "https://images.unsplash.com/photo-1512058560566-42749ad56fd3?auto=format&fit=crop&q=80&w=400" },
        { id: 3, day: "Monday", meal: "Overnight Oats", type: "Breakfast", image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=400" },
    ];

    const [meals, setMeals] = useLocalStorage('stitch_meal_plan', initialMeals);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [weekView, setWeekView] = useState('current');

    const mealOptions = [
        { name: 'Grilled Chicken Salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
        { name: 'Spaghetti Bolognese', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e6?auto=format&fit=crop&q=80&w=400' },
        { name: 'Taco Night', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400' },
        { name: 'Homemade Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400' },
        { name: 'Beef Stew', image: 'https://images.unsplash.com/photo-1608039829572-453d93a31716?auto=format&fit=crop&q=80&w=400' },
    ];

    useGSAP(() => {
        gsap.from(".header-anim", { y: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" });
        gsap.from(".week-toggle", { scale: 0.9, opacity: 0, duration: 0.5, delay: 0.2, ease: "back.out(1.7)" });
        gsap.from(".day-section", { x: -30, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power3.out" });
        gsap.from(".meal-card", { scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.4, ease: "back.out(1.5)" });
    }, { scope: containerRef });

    const handleAddMeal = (mealOption) => {
        const newMeal = {
            id: Date.now(),
            day: selectedSlot.day,
            type: selectedSlot.type,
            meal: mealOption.name,
            image: mealOption.image
        };
        setMeals([...meals, newMeal]);
        setIsAdding(false);
        setSelectedSlot(null);

        // Animate the new card in
        setTimeout(() => {
            gsap.from(`#meal-${newMeal.id}`, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(2)"
            });
        }, 50);
    };

    const handleDeleteMeal = (e, id) => {
        e.stopPropagation();
        gsap.to(`#meal-${id}`, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setMeals(meals.filter(m => m.id !== id));
            }
        });
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-void text-text-main overflow-x-hidden pb-28">
            <div className="gradient-mesh" />
            <div className="noise-bg" />

            {/* Header */}
            <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-void/60 backdrop-blur-xl border-b border-white/5">
                <button onClick={() => navigate(-1)} className="header-anim p-2 -ml-2 rounded-xl hover:bg-white/5 text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <h1 className="header-anim text-lg font-display font-semibold">Meal Planner</h1>
                <div className="header-anim w-10" />
            </header>

            {/* Week Toggle */}
            <div className="px-5 pt-4">
                <div className="week-toggle flex bg-surface p-1 rounded-2xl border border-white/10 shadow-glass">
                    <button
                        onClick={() => setWeekView('current')}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${weekView === 'current'
                                ? 'bg-primary text-void shadow-neon-sm'
                                : 'text-text-muted hover:text-white'
                            }`}
                    >
                        This Week
                    </button>
                    <button
                        onClick={() => setWeekView('next')}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${weekView === 'next'
                                ? 'bg-primary text-void shadow-neon-sm'
                                : 'text-text-muted hover:text-white'
                            }`}
                    >
                        Next Week
                    </button>
                </div>
            </div>

            {/* Days */}
            <div className="px-5 py-6 space-y-8">
                {days.map(day => {
                    const dayMeals = meals.filter(m => m.day === day);
                    return (
                        <div key={day} className="day-section">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-display font-bold text-white">{day}</h2>
                                <span className="text-xs font-mono text-text-muted">{dayMeals.length} meals</span>
                            </div>

                            {/* Meal Cards */}
                            <div className="space-y-3">
                                {dayMeals.map(meal => (
                                    <div
                                        key={meal.id}
                                        id={`meal-${meal.id}`}
                                        className="meal-card group relative aspect-[2.5/1] rounded-2xl overflow-hidden border border-white/10 shadow-glass cursor-pointer transition-all duration-300 hover:border-primary/30"
                                    >
                                        <img
                                            src={meal.image}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            alt={meal.meal}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-4 w-full">
                                            <span
                                                className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase mb-1"
                                                style={{
                                                    backgroundColor: meal.type === 'Breakfast' ? '#fbbf2420' : meal.type === 'Lunch' ? '#22d3ee20' : '#8b5cf620',
                                                    color: meal.type === 'Breakfast' ? '#fbbf24' : meal.type === 'Lunch' ? '#22d3ee' : '#8b5cf6',
                                                    border: `1px solid ${meal.type === 'Breakfast' ? '#fbbf2440' : meal.type === 'Lunch' ? '#22d3ee40' : '#8b5cf640'}`
                                                }}
                                            >
                                                {meal.type}
                                            </span>
                                            <h3 className="text-lg font-display font-semibold text-white group-hover:text-primary transition-colors">
                                                {meal.meal}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={(e) => handleDeleteMeal(e, meal.id)}
                                            className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-void/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ))}

                                {/* Add Meal Placeholder */}
                                {dayMeals.length < 3 && (
                                    <button
                                        onClick={() => { setSelectedSlot({ day, type: mealTypes[dayMeals.length] }); setIsAdding(true); }}
                                        className="meal-card w-full py-6 rounded-2xl border border-dashed border-white/10 text-text-muted hover:border-primary/30 hover:bg-white/5 transition-all flex flex-col items-center gap-1"
                                    >
                                        <span className="material-symbols-outlined text-2xl">add_circle</span>
                                        <span className="text-sm font-medium">Add {mealTypes[dayMeals.length]}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Meal Modal */}
            {isAdding && selectedSlot && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-void/70 backdrop-blur-sm">
                    <div
                        className="w-full max-w-md bg-surface border border-white/20 rounded-t-3xl p-6 shadow-2xl animate-slide-up"
                        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-white font-display font-bold text-xl">{selectedSlot.type}</h3>
                                <p className="text-text-muted text-sm">{selectedSlot.day}</p>
                            </div>
                            <button onClick={() => setIsAdding(false)} className="text-text-muted hover:text-white transition-colors p-2">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="space-y-3 max-h-[50vh] overflow-y-auto thin-scrollbar">
                            {mealOptions.map(option => (
                                <button
                                    key={option.name}
                                    onClick={() => handleAddMeal(option)}
                                    className="w-full p-3 rounded-2xl border border-white/10 hover:border-primary/30 hover:bg-white/5 transition-all flex items-center gap-4 group"
                                >
                                    <img
                                        src={option.image}
                                        alt={option.name}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <span className="flex-1 text-left font-medium text-white group-hover:text-primary transition-colors">
                                        {option.name}
                                    </span>
                                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">
                                        add_circle
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
};
