import React from 'react';
import { useDispatch } from 'react-redux';
import { launchAttack } from './services/energyService';
import { updateEnergy } from './redux/energySlice';
import { addAttack } from './redux/attackHistorySlice';
import {useState} from 'react';

const AttackButton = ({ power }) => {
    const dispatch = useDispatch();
    const [animationClass, setAnimationClass] = useState('');

    const handleAttack = async () => {
        try {
            if (power.name === 'Fireball') {
                setAnimationClass('fire-blast');
            } else if (power.name === 'Ice Shard') {
                setAnimationClass('ice-shard');
            }
            const result = await launchAttack({"power_id":power.id});

            dispatch(updateEnergy({ max: 100,level: result.remaining_energy}));
            dispatch(addAttack({ name: result.name, timestamp: result.timestamp }));
        } catch (err) {
            console.error('Attack failed:');
        }
    };

    return (
        <button
            className="border !border-gray-500 !bg-gray-300"
            onClick={handleAttack}
            disabled={power.energyCost > power.level}
        >
            {power.name} ({power.energyCost} Energy)
        </button>
    );
};

export default AttackButton;
