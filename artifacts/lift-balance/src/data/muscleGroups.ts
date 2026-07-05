export const MUSCLE_HEADS: Record<string, string[]> = {
  Chest: ['Upper Chest', 'Mid Chest', 'Lower Chest'],
  Back: ['Upper Back', 'Lats', 'Lower Back', 'Traps', 'Rhomboids'],
  Shoulders: ['Front Delt', 'Side Delt', 'Rear Delt'],
  Arms: ['Biceps (Short Head)', 'Biceps (Long Head)', 'Triceps (Long)', 'Triceps (Lateral)', 'Triceps (Medial)', 'Forearms'],
  Core: ['Upper Abs', 'Lower Abs', 'Obliques', 'Transverse Abdominis'],
  Legs: ['Quads', 'Hamstrings', 'Inner Thigh', 'IT Band'],
  Glutes: ['Glute Max', 'Glute Med', 'Glute Min'],
  Calves: ['Gastrocnemius', 'Soleus']
};

export const MUSCLE_GROUPS = Object.keys(MUSCLE_HEADS) as import('../types').MuscleGroup[];
