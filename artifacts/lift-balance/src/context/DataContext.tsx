import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout, Settings, WorkoutTemplate } from '../types';

type DataContextType = {
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  updateWorkout: (workout: Workout) => void;
  templates: WorkoutTemplate[];
  saveTemplate: (template: WorkoutTemplate) => void;
  deleteTemplate: (id: string) => void;
};

const DataContext = createContext<DataContextType | null>(null);

const WORKOUTS_KEY  = 'lift_balance_workouts';
const SETTINGS_KEY  = 'lift_balance_settings';
const TEMPLATES_KEY = 'lift_balance_templates';

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      const data = localStorage.getItem(WORKOUTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  });

  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : { unit: 'lbs' };
    } catch { return { unit: 'lbs' }; }
  });

  const [templates, setTemplates] = useState<WorkoutTemplate[]>(() => {
    try {
      const data = localStorage.getItem(TEMPLATES_KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  }, [templates]);

  const updateWorkout = (workout: Workout) => {
    setWorkouts(prev => {
      const exists = prev.find(w => w.id === workout.id);
      if (exists) return prev.map(w => w.id === workout.id ? workout : w);
      return [...prev, workout];
    });
  };

  const saveTemplate = (template: WorkoutTemplate) => {
    setTemplates(prev => {
      const exists = prev.find(t => t.id === template.id);
      if (exists) return prev.map(t => t.id === template.id ? template : t);
      return [...prev, template];
    });
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  return (
    <DataContext.Provider value={{
      workouts, setWorkouts,
      settings, setSettings,
      updateWorkout,
      templates, saveTemplate, deleteTemplate,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
