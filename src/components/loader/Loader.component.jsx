import React from 'react';
import { PropagateLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
  position: 'fixed', // position the loader
  top: '50%', // position the loader in the center vertically
  left: '50%', // position the loader in the center horizontally
  transform: 'translate(-50%, -50%)', // center the loader
  zIndex: 9999, // ensure the loader is above all other elements

};

const overlay = {
  position: 'fixed', // position the overlay
  top: 0,
  left: 0,
  width: '100%', // cover the entire screen
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
  backdropFilter: 'blur(5px)', // add a blur effect to the background
  zIndex: 9998, // ensure the overlay is below the loader
};

function Loader() {
  return (
    <div>
      <div style={overlay} />

      <div style={{ position: 'relative' }}>
        <PropagateLoader
          cssOverride={override}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
