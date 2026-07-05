import { useParams, Link } from 'wouter';
import { useData } from '../context/DataContext';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkoutDetail() {
  const params = useParams();
  const { workouts, settings } = useData();
  const workout = workouts.find(w => w.id === params.id);

  if (!workout) {
    return (
      <div className="p-6 text-center py-20 flex flex-col items-center">
        <Dumbbell className="text-muted-foreground mb-4" size={48} />
        <p className="text-foreground font-bold text-lg">Workout not found.</p>
        <Link href="/history" className="text-primary mt-4 font-bold bg-primary/10 px-6 py-2 rounded-xl">Back to History</Link>
      </div>
    );
  }

  const volume = workout.exercises.reduce((sum, ex) => {
    return sum + ex.sets.reduce((s, set) => s + (set.reps * set.weight), 0);
  }, 0);

  return (
    <div className="p-6 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/history">
          <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all cursor-pointer">
            <ArrowLeft size={24} />
          </div>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {format(parseISO(workout.date), 'MMMM d, yyyy')}
          </h1>
          <p className="text-primary font-bold text-sm tracking-widest uppercase mt-1">Volume: {volume.toLocaleString()} {settings.unit}</p>
        </div>
      </div>

      <div className="space-y-6">
        {workout.exercises.map((ex, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={ex.id} 
            className="bg-card rounded-2xl p-5 border border-border shadow-lg shadow-black/20"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shrink-0 shadow-inner mt-1">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-xl text-foreground mb-1">{ex.name || 'Unnamed Exercise'}</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{ex.muscleGroup} • <span className="text-primary">{ex.muscleHead}</span></p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex text-[10px] font-black text-muted-foreground px-3 uppercase tracking-widest mb-2">
                <div className="w-10">Set</div>
                <div className="flex-1 text-center">Weight</div>
                <div className="flex-1 text-center">Reps</div>
                <div className="flex-1 text-right">Vol</div>
              </div>
              {ex.sets.map((set, si) => (
                <div key={set.id} className="flex items-center bg-background rounded-xl p-3 px-3 text-sm font-bold border border-border/50">
                  <div className="w-10 text-muted-foreground">{si + 1}</div>
                  <div className="flex-1 text-center text-foreground">{set.weight} {settings.unit}</div>
                  <div className="flex-1 text-center text-foreground">{set.reps}</div>
                  <div className="flex-1 text-right text-primary">{(set.reps * set.weight).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
