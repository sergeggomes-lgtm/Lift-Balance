export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Core' | 'Legs' | 'Glutes' | 'Calves';

export type Set = {
  id: string;
  reps: number;
  weight: number;
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  muscleHead: string;
  sets: Set[];
};

export type Workout = {
  id: string;
  date: string; // YYYY-MM-DD
  exercises: Exercise[];
};

export type Settings = {
  unit: 'lbs' | 'kg';
};
