import React from 'react';
import { useDispatch } from 'react-redux';
import { launchAttack } from './services/energyService';
import { updateEnergy } from './redux/energySlice';
import { addAttack } from './redux/attackHistorySlice';
import {useState} from 'react';
import PropTypes from 'prop-types';

const AttackButtonRT = ({ energyLevel,power,onclick }) => {
    const dispatch = useDispatch();
    const [animationClass, setAnimationClass] = useState('');



    return (
      <div className="attack-button-container">
        <button
            className="attack-button"
            onClick={onclick}
            disabled={power.energy_cost > energyLevel}
        >
            {power.name} ({power.energy_cost} Energy)
        </button>
      </div>

    );
};

// Add PropTypes validation
AttackButtonRT.propTypes = {
  energyLevel: PropTypes.number.isRequired,
  power: PropTypes.shape({
    name: PropTypes.string.isRequired,
    energy_cost: PropTypes.number.isRequired,
  }).isRequired,
};
export default AttackButtonRT;
