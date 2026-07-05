import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Plus, X, Settings2, Trash2, Dumbbell } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Exercise, Workout, MuscleGroup } from '../types';
import { MUSCLE_GROUPS, MUSCLE_HEADS } from '../data/muscleGroups';
import { motion, AnimatePresence } from 'framer-motion';

export default function LogWorkout() {
  const { workouts, updateWorkout, settings, setSettings } = useData();
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const [workout, setWorkout] = useState<Workout>(() => {
    return workouts.find(w => w.date === today) || {
      id: crypto.randomUUID(),
      date: today,
      exercises: []
    };
  });

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    updateWorkout(workout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workout]);

  const addExercise = () => {
    setWorkout(w => ({
      ...w,
      exercises: [
        ...w.exercises,
        {
          id: crypto.randomUUID(),
          name: '',
          muscleGroup: 'Chest',
          muscleHead: 'Mid Chest',
          sets: [{ id: crypto.randomUUID(), reps: 0, weight: 0 }]
        }
      ]
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Today's Session</h1>
          <p className="text-primary text-sm font-bold uppercase tracking-widest">{format(new Date(), 'EEEE, MMM d')}</p>
        </div>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2.5 rounded-full bg-card border border-border text-muted-foreground hover:text-primary transition-colors"
        >
          <Settings2 size={20} />
        </button>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-4 bg-card rounded-2xl border border-border flex items-center justify-between shadow-lg">
              <span className="text-sm font-bold text-foreground">Weight Unit</span>
              <div className="flex bg-background rounded-lg p-1 border border-border">
                <button 
                  onClick={() => setSettings({ ...settings, unit: 'lbs' })}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${settings.unit === 'lbs' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  LBS
                </button>
                <button 
                  onClick={() => setSettings({ ...settings, unit: 'kg' })}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${settings.unit === 'kg' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  KG
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard 
              key={exercise.id}
              exercise={exercise}
              index={index + 1}
              unit={settings.unit}
              onChange={(ex) => {
                setWorkout(w => ({
                  ...w,
                  exercises: w.exercises.map(e => e.id === ex.id ? ex : e)
                }));
              }}
              onRemove={() => {
                setWorkout(w => ({
                  ...w,
                  exercises: w.exercises.filter(e => e.id !== exercise.id)
                }));
              }}
            />
          ))}
        </AnimatePresence>

        {workout.exercises.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-6 border border-border shadow-2xl shadow-primary/5">
              <Dumbbell className="text-primary" size={36} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No exercises yet</h3>
            <p className="text-sm text-muted-foreground max-w-[220px] leading-relaxed">
              Grab some iron and log your first exercise of the day. You've got this.
            </p>
          </motion.div>
        )}

        <button 
          onClick={addExercise}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-border bg-card/30 text-muted-foreground font-bold hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2 group"
        >
          <Plus size={20} className="group-hover:scale-125 transition-transform" />
          <span>Add Exercise</span>
        </button>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, index, unit, onChange, onRemove }: { 
  exercise: Exercise, 
  index: number,
  unit: string,
  onChange: (e: Exercise) => void, 
  onRemove: () => void 
}) {
  const addSet = () => {
    const lastSet = exercise.sets[exercise.sets.length - 1];
    onChange({
      ...exercise,
      sets: [
        ...exercise.sets,
        { 
          id: crypto.randomUUID(), 
          reps: lastSet ? lastSet.reps : 0, 
          weight: lastSet ? lastSet.weight : 0 
        }
      ]
    });
  };

  const updateSet = (setId: string, field: 'reps' | 'weight', value: number) => {
    onChange({
      ...exercise,
      sets: exercise.sets.map(s => s.id === setId ? { ...s, [field]: value } : s)
    });
  };

  const removeSet = (setId: string) => {
    onChange({
      ...exercise,
      sets: exercise.sets.filter(s => s.id !== setId)
    });
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg shadow-black/20"
    >
      <div className="p-4 border-b border-border bg-black/20 flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shrink-0 shadow-inner">
          {index}
        </div>
        <div className="flex-1 space-y-3">
          <input 
            type="text"
            placeholder="Exercise name..."
            value={exercise.name}
            onChange={e => onChange({ ...exercise, name: e.target.value })}
            className="w-full bg-transparent border-none text-foreground font-bold text-xl focus:outline-none focus:ring-0 p-0 placeholder:text-muted-foreground/40"
          />
          <div className="flex gap-2">
            <select 
              value={exercise.muscleGroup}
              onChange={e => {
                const newGroup = e.target.value as MuscleGroup;
                onChange({ 
                  ...exercise, 
                  muscleGroup: newGroup,
                  muscleHead: MUSCLE_HEADS[newGroup][0]
                });
              }}
              className="bg-background text-xs font-bold text-foreground border border-border rounded-lg px-2.5 py-2 focus:outline-none focus:border-primary w-[110px]"
            >
              {MUSCLE_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            
            <select 
              value={exercise.muscleHead}
              onChange={e => onChange({ ...exercise, muscleHead: e.target.value })}
              className="bg-background text-xs font-bold text-primary border border-border rounded-lg px-2.5 py-2 focus:outline-none focus:border-primary flex-1 truncate"
            >
              {MUSCLE_HEADS[exercise.muscleGroup].map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>
        <button onClick={onRemove} className="text-muted-foreground hover:text-destructive h-fit p-1 bg-background rounded-lg border border-border transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {exercise.sets.length > 0 && (
          <div className="flex text-[10px] font-black text-muted-foreground px-2 uppercase tracking-widest">
            <div className="w-10">Set</div>
            <div className="flex-1 text-center">{settings.unit.toUpperCase()}</div>
            <div className="flex-1 text-center">Reps</div>
            <div className="w-8"></div>
          </div>
        )}
        
        <AnimatePresence>
          {exercise.sets.map((set, i) => (
            <motion.div 
              layout
              key={set.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 overflow-hidden"
            >
              <div className="w-10 text-center font-bold text-muted-foreground">{i + 1}</div>
              <div className="flex-1">
                <input 
                  type="number" 
                  value={set.weight || ''}
                  onChange={e => updateSet(set.id, 'weight', Number(e.target.value))}
                  placeholder="0"
                  className="w-full bg-background border border-border rounded-xl py-2.5 px-3 text-center font-bold text-foreground focus:outline-none focus:border-primary transition-colors focus:bg-card"
                />
              </div>
              <div className="flex-1">
                <input 
                  type="number" 
                  value={set.reps || ''}
                  onChange={e => updateSet(set.id, 'reps', Number(e.target.value))}
                  placeholder="0"
                  className="w-full bg-background border border-border rounded-xl py-2.5 px-3 text-center font-bold text-foreground focus:outline-none focus:border-primary transition-colors focus:bg-card"
                />
              </div>
              <button 
                onClick={() => removeSet(set.id)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors border border-transparent hover:border-destructive/20"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <button 
          onClick={addSet}
          className="w-full mt-2 py-3 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Set
        </button>
      </div>
    </motion.div>
  );
}
