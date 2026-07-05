/** 3–4 exercise suggestions per muscle head. */
export const EXERCISE_SUGGESTIONS: Record<string, string[]> = {
  // ── Chest ───────────────────────────────────────────────
  'Upper Chest (Clavicular)': [
    'Incline Barbell Press',
    'Incline Dumbbell Press',
    'Cable Crossover (Low to High)',
    'Landmine Press',
  ],
  'Mid Chest (Sternal)': [
    'Flat Barbell Bench Press',
    'Dumbbell Chest Press',
    'Push-Up',
    'Pec Deck Machine',
  ],
  'Lower Chest (Costal)': [
    'Decline Bench Press',
    'Decline Push-Up',
    'Cable Crossover (High to Low)',
    'Chest Dips',
  ],
  'Inner Chest': [
    'Cable Crossover (Midpoint Squeeze)',
    'Dumbbell Squeeze Press',
    'Close-Grip Bench Press',
    'Pec Deck (Short Range)',
  ],
  'Outer Chest': [
    'Wide-Grip Push-Up',
    'Dumbbell Flye',
    'Cable Flye',
    'Wide-Grip Bench Press',
  ],

  // ── Back ────────────────────────────────────────────────
  'Upper Traps': [
    'Barbell Shrug',
    'Dumbbell Shrug',
    'Face Pull',
    'Upright Row',
  ],
  'Mid Traps': [
    'Seated Cable Row (Wide Grip)',
    'Bent-Over Barbell Row',
    'T-Bar Row',
    'Chest-Supported Row',
  ],
  'Lower Traps': [
    'Y-Raise (Prone)',
    'Scapular Pull-Up',
    'Straight-Arm Pulldown',
    'Resistance Band Y-Press',
  ],
  'Rhomboids': [
    'Face Pull',
    'Band Pull-Apart',
    'Seated Cable Row (Elbows Wide)',
    'Bent-Over Rear Delt Row',
  ],
  'Upper Lats': [
    'Wide-Grip Pull-Up',
    'Wide-Grip Lat Pulldown',
    'Straight-Arm Pulldown',
    'Cable Overhead Extension',
  ],
  'Lower Lats': [
    'Narrow-Grip Pull-Up',
    'Single-Arm Dumbbell Row',
    'Meadows Row',
    'Dumbbell Pullover',
  ],
  'Teres Major': [
    'Underhand Barbell Row',
    'Single-Arm Cable Row (Elbow Out)',
    'Dumbbell Row',
    'Cable Straight-Arm Pulldown',
  ],
  'Lower Back (Erectors)': [
    'Conventional Deadlift',
    'Hyperextension (Back Extension)',
    'Good Morning',
    'Romanian Deadlift',
  ],

  // ── Shoulders ───────────────────────────────────────────
  'Front Delt (Anterior)': [
    'Overhead Barbell Press',
    'Dumbbell Front Raise',
    'Arnold Press',
    'Cable Front Raise',
  ],
  'Side Delt (Lateral)': [
    'Dumbbell Lateral Raise',
    'Cable Lateral Raise',
    'Machine Lateral Raise',
    'Leaning Lateral Raise',
  ],
  'Rear Delt (Posterior)': [
    'Face Pull',
    'Reverse Pec Deck',
    'Bent-Over Dumbbell Raise',
    'Cable Rear Delt Flye',
  ],

  // ── Arms ────────────────────────────────────────────────
  'Biceps Short Head': [
    'Preacher Curl',
    'Concentration Curl',
    'Wide-Grip Barbell Curl',
    'Spider Curl',
  ],
  'Biceps Long Head': [
    'Incline Dumbbell Curl',
    'Hammer Curl',
    'Narrow-Grip Barbell Curl',
    'Cable Curl (Narrow Grip)',
  ],
  'Brachialis': [
    'Reverse Curl',
    'Cross-Body Hammer Curl',
    'Zottman Curl',
    'Pinch-Grip Curl',
  ],
  'Brachioradialis': [
    'Reverse Barbell Curl',
    'Neutral-Grip Dumbbell Curl',
    'Hammer Curl',
    'Wrist Roller',
  ],
  'Triceps Long Head': [
    'Overhead Dumbbell Extension',
    'Skull Crusher',
    'Cable Overhead Triceps Extension',
    'Close-Grip Bench Press',
  ],
  'Triceps Lateral Head': [
    'Rope Triceps Pushdown',
    'Dumbbell Kickback',
    'Close-Grip Push-Up',
    'Bar Pushdown (Overhand)',
  ],
  'Triceps Medial Head': [
    'Reverse-Grip Pushdown',
    'Diamond Push-Up',
    'Close-Grip Bench Press',
    'Overhead Triceps Extension (Cable)',
  ],
  'Forearm Extensors': [
    'Reverse Barbell Curl',
    'Wrist Extension (Dumbbell)',
    'Plate Pinch Hold',
    "Farmer's Carry",
  ],
  'Forearm Flexors': [
    'Barbell Wrist Curl',
    'Dumbbell Wrist Curl',
    "Farmer's Carry",
    'Towel Pull-Up',
  ],

  // ── Core ────────────────────────────────────────────────
  'Upper Abs': [
    'Cable Crunch',
    'Decline Sit-Up',
    'Crunch',
    'Jackknife Sit-Up',
  ],
  'Lower Abs': [
    'Hanging Leg Raise',
    'Reverse Crunch',
    'Dragon Flag',
    'Ab Wheel Rollout',
  ],
  'Obliques (External)': [
    'Cable Woodchop',
    'Bicycle Crunch',
    'Side Plank',
    'Russian Twist',
  ],
  'Obliques (Internal)': [
    'Pallof Press',
    'Dead Bug',
    'Side Bend (Dumbbell)',
    'Cable Side Bend',
  ],
  'Transverse Abdominis': [
    'Plank',
    'Dead Bug',
    'Bird Dog',
    'Stomach Vacuum',
  ],
  'Serratus Anterior': [
    'Serratus Punch (Cable)',
    'Push-Up Plus',
    'Dumbbell Pullover',
    'Ab Wheel Rollout',
  ],

  // ── Legs ────────────────────────────────────────────────
  'Quads (Rectus Femoris)': [
    'Back Squat',
    'Sissy Squat',
    'Leg Extension',
    'Bulgarian Split Squat',
  ],
  'Quads (Vastus Lateralis)': [
    'Hack Squat',
    'Leg Press (Narrow Stance)',
    'Pendulum Squat',
    'Lateral Lunge',
  ],
  'Quads (Vastus Medialis)': [
    'Close-Stance Squat',
    'Terminal Knee Extension',
    'Step-Up',
    'Spanish Squat',
  ],
  'Hamstrings (Biceps Femoris)': [
    'Romanian Deadlift',
    'Seated Leg Curl',
    'Nordic Hamstring Curl',
    'Glute-Ham Raise',
  ],
  'Hamstrings (Semitendinosus)': [
    'Lying Leg Curl',
    'Sumo Deadlift',
    'Stiff-Leg Deadlift',
    'Kettlebell Swing',
  ],
  'Inner Thigh (Adductors)': [
    'Sumo Squat',
    'Adductor Machine',
    'Cable Adduction',
    'Side Lunge',
  ],
  'IT Band / TFL': [
    'Lateral Band Walk',
    'Clamshell',
    'Lateral Leg Raise',
    'Monster Walk',
  ],

  // ── Glutes ──────────────────────────────────────────────
  'Glute Max': [
    'Barbell Hip Thrust',
    'Back Squat',
    'Romanian Deadlift',
    'Cable Kickback',
  ],
  'Glute Med': [
    'Side-Lying Abduction',
    'Clamshell',
    'Lateral Band Walk',
    'Single-Leg Hip Thrust',
  ],
  'Glute Min': [
    'Cable Hip Abduction',
    'Fire Hydrant',
    'Mini-Band Walk',
    'Lateral Step-Up',
  ],
  'Piriformis': [
    'Fire Hydrant',
    'Hip External Rotation (Cable)',
    'Seated Figure-Four Stretch',
    'Clamshell',
  ],

  // ── Calves ──────────────────────────────────────────────
  'Gastrocnemius (Lateral)': [
    'Standing Calf Raise',
    'Donkey Calf Raise',
    'Box Jump',
    'Jump Rope',
  ],
  'Gastrocnemius (Medial)': [
    'Standing Calf Raise (Toes In)',
    'Smith Machine Calf Raise',
    'Leg Press Calf Press',
    'Single-Leg Calf Raise',
  ],
  'Soleus': [
    'Seated Calf Raise',
    'Single-Leg Seated Calf Raise',
    'Bent-Knee Calf Raise',
    'Angled Leg Press Calf Raise',
  ],
  'Tibialis Anterior': [
    'Toe Raise (Standing)',
    'Tibialis Raise (Machine)',
    'Resisted Dorsiflexion (Band)',
    'Tib Bar Raise',
  ],
};
