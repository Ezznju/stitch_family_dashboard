/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export const NavButton = ({ to, icon, label, active }) => (
    <Link to={to} className={`flex flex-1 flex-col items-center justify-end gap-1 ${active ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <div className="flex h-8 items-center justify-center">
            <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
        </div>
        {label && <p className="text-xs font-medium leading-normal tracking-[0.015em]">{label}</p>}
    </Link>
);
