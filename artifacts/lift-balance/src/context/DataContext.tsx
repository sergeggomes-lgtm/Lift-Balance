import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout, Settings } from '../types';

type DataContextType = {
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  updateWorkout: (workout: Workout) => void;
};

const DataContext = createContext<DataContextType | null>(null);

const WORKOUTS_KEY = 'lift_balance_workouts';
const SETTINGS_KEY = 'lift_balance_settings';

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      const data = localStorage.getItem(WORKOUTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : { unit: 'lbs' };
    } catch {
      return { unit: 'lbs' };
    }
  });

  useEffect(() => {
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateWorkout = (workout: Workout) => {
    setWorkouts(prev => {
      const exists = prev.find(w => w.id === workout.id);
      if (exists) {
        return prev.map(w => w.id === workout.id ? workout : w);
      }
      return [...prev, workout];
    });
  };

  return (
    <DataContext.Provider value={{ workouts, setWorkouts, settings, setSettings, updateWorkout }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
