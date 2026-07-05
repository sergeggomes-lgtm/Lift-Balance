export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Legs'
  | 'Biceps'
  | 'Triceps'
  | 'Abs & Core'
  | 'Forearms & Grip'
  | 'Traps & Neck';

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

// ── Workout Templates ────────────────────────────────────────────────
export type TemplateExercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  muscleHead: string;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  exercises: TemplateExercise[];
};
