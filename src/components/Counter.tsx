import React from 'react';
import { useCounterStore } from '../store/counterStore';
import { Button } from './ui/Button';

const Counter: React.FC = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Zustand Counter Demo</h2>
      <p className="text-5xl font-bold text-vendorsoluce-green dark:text-vendorsoluce-light-green mb-6">{count}</p>
      <div className="flex justify-center space-x-4">
        <Button onClick={increment} variant="primary">
          Increment
        </Button>
        <Button onClick={decrement} variant="outline">
          Decrement
        </Button>
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        This counter demonstrates Zustand state management - state is shared globally across components.
      </p>
    </div>
  );
};

export default Counter;