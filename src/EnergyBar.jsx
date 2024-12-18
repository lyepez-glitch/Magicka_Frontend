import React, { useState } from 'react';
import './EnergyBar.css';

const EnergyBar = ({ level, max }) => {
    const [isAttacking, setIsAttacking] = useState(false);
    const percentage = (level / max) * 100;

    // Animation trigger for attack
    const handleAttack = () => {
        setIsAttacking(true);
        setTimeout(() => {
            setIsAttacking(false); // Reset after animation
        }, 1000); // Duration of the attack animation
    };

    return (
        <div className="energy-bar-container">
            <div className="energy-bar" onClick={handleAttack}>
                <div
                    className={`energy-bar-filled ${isAttacking ? 'attacking' : ''}`}
                    style={{ width: `${percentage}%` }}
                >
                </div>
                <span>{level}/{max}</span>
            </div>
            <div className="energy-power-icon">
                {isAttacking && <div className="blast-animation"></div>}
            </div>
        </div>
    );
};

export default EnergyBar;
