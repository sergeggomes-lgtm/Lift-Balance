import { format, parseISO } from 'date-fns';
import { useData } from '../context/DataContext';
import { ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function History() {
  const { workouts, settings } = useData();
  
  // Sort descending, only ones with exercises
  const sortedWorkouts = [...workouts]
    .filter(w => w.exercises.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">History</h1>
        <p className="text-primary text-sm font-bold uppercase tracking-widest">Your past sessions</p>
      </div>

      {sortedWorkouts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-6 border border-border shadow-2xl shadow-primary/5">
            <Calendar className="text-primary" size={36} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">It's quiet here</h3>
          <p className="text-sm text-muted-foreground max-w-[220px] leading-relaxed">
            Your completed workouts will show up here. Let's get to work.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {sortedWorkouts.map((workout, index) => {
            const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
            const volume = workout.exercises.reduce((sum, ex) => {
              return sum + ex.sets.reduce((s, set) => s + (set.reps * set.weight), 0);
            }, 0);
            
            return (
              <Link key={workout.id} href={`/workout/${workout.id}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-2xl p-5 border border-border flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group shadow-lg shadow-black/20"
                >
                  <div>
                    <div className="font-bold text-foreground text-xl mb-1.5 group-hover:text-primary transition-colors">
                      {format(parseISO(workout.date), 'MMMM d, yyyy')}
                    </div>
                    <div className="text-xs font-bold text-muted-foreground flex items-center gap-3 uppercase tracking-wider">
                      <span>{workout.exercises.length} Ex</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{totalSets} Sets</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-primary">{volume.toLocaleString()} {settings.unit}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all group-hover:scale-110">
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
