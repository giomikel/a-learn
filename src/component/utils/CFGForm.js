import React from 'react';
import Dropdown from './Dropdown';
import '../../css/CFGForm.css';
import ProductionCreator from './CFGProductionCreator';

function CFGForm(props) {

  const {
    selectedStartSymbol,
    setSelectedStartSymbol,
    productions,
    setProductions,
    alphabet,
  } = props;

  const handleStartSymbolChange = (value) => {
    setSelectedStartSymbol(value);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Context Free Grammar</h2>
      <div className="input-group">
        <label className="input-label">Select Start Symbol:</label>
        <Dropdown
          options={['', ...alphabet]}
          selectedOption={selectedStartSymbol}
          onSelect={handleStartSymbolChange}
        />
      </div>
      <div className="input-group">
        <label className="input-label">Define productions:</label>
        <ProductionCreator selectedStartSymbol={selectedStartSymbol} alphabet={alphabet} productions={productions} setProductions={setProductions} />
      </div>
    </div>
  );
}

export default CFGForm;
