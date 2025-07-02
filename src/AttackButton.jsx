import React from 'react';
import { useDispatch } from 'react-redux';
import { launchAttack } from './services/energyService';
import { updateEnergy } from './redux/energySlice';
import { addAttack } from './redux/attackHistorySlice';
import {useState} from 'react';
import PropTypes from 'prop-types';

const AttackButton = ({setAnimationClass,energyLevel, power }) => {
    const dispatch = useDispatch();


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
            disabled={power.energy_cost > energyLevel}
        >
            {power.name} ({power.energy_cost} Energy)
        </button>
    );
};

AttackButton.propTypes = {
  energyLevel: PropTypes.number.isRequired,
  power: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    energy_cost: PropTypes.number.isRequired,
  }).isRequired,
};

export default AttackButton;
