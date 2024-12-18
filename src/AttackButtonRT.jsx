import React from 'react';
import { useDispatch } from 'react-redux';
import { launchAttack } from './services/energyService';
import { updateEnergy } from './redux/energySlice';
import { addAttack } from './redux/attackHistorySlice';
import {useState} from 'react';

const AttackButtonRT = ({ power,onclick }) => {
    const dispatch = useDispatch();
    const [animationClass, setAnimationClass] = useState('');



    return (
      <div className="attack-button-container">
        <button
            className="attack-button"
            onClick={onclick}
            disabled={power.energyCost > power.level}
        >
            {power.name} ({power.energyCost} Energy)
        </button>
      </div>

    );
};

export default AttackButtonRT;
