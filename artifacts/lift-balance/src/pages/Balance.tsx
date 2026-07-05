import { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { subWeeks, isAfter, parseISO } from 'date-fns';
import { Target, AlertCircle, CheckCircle2, MinusCircle, Flame } from 'lucide-react';
import { MUSCLE_GROUPS, MUSCLE_HEADS } from '../data/muscleGroups';
import { motion, AnimatePresence } from 'framer-motion';

type HeadStatus = 'neglected' | 'underworked' | 'optimal' | 'heavy';

export default function Balance() {
  const { workouts } = useData();
  const [selectedGroup, setSelectedGroup] = useState<string>('Chest');

  const analysis = useMemo(() => {
    const fourWeeksAgo = subWeeks(new Date(), 4);
    const recentWorkouts = workouts.filter(w => isAfter(parseISO(w.date), fourWeeksAgo));
    
    const headVolume: Record<string, Record<string, number>> = {};
    MUSCLE_GROUPS.forEach(g => {
      headVolume[g] = {};
      MUSCLE_HEADS[g].forEach(h => headVolume[g][h] = 0);
    });

    let maxVol = 1;
    
    recentWorkouts.forEach(w => {
      w.exercises.forEach(ex => {
        const vol = ex.sets.reduce((sum, s) => sum + (s.reps * s.weight), 0);
        if (headVolume[ex.muscleGroup] && headVolume[ex.muscleGroup][ex.muscleHead] !== undefined) {
          headVolume[ex.muscleGroup][ex.muscleHead] += vol;
          if (headVolume[ex.muscleGroup][ex.muscleHead] > maxVol) {
            maxVol = headVolume[ex.muscleGroup][ex.muscleHead];
          }
        }
      });
    });

    const result: Record<string, Array<{ head: string; volume: number; status: HeadStatus; percentage: number }>> = {};
    
    MUSCLE_GROUPS.forEach(g => {
      result[g] = MUSCLE_HEADS[g].map(h => {
        const vol = headVolume[g][h];
        const pct = vol / maxVol;
        let status: HeadStatus = 'neglected';
        if (vol === 0) status = 'neglected';
        else if (pct < 0.2) status = 'underworked';
        else if (pct < 0.75) status = 'optimal';
        else status = 'heavy';
        
        return { head: h, volume: vol, status, percentage: pct * 100 };
      });
    });

    return result;
  }, [workouts]);

  const StatusConfig = {
    heavy: { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500', barBg: 'bg-orange-500/20', label: 'Heavy Focus', desc: 'Getting hammered. Ensure recovery.' },
    optimal: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500', barBg: 'bg-emerald-500/20', label: 'Optimal', desc: 'Solid volume over 4 weeks.' },
    underworked: { icon: AlertCircle, color: 'text-blue-400', bg: 'bg-blue-400', barBg: 'bg-blue-400/20', label: 'Light', desc: 'Getting some work, could use more.' },
    neglected: { icon: MinusCircle, color: 'text-muted-foreground', bg: 'bg-muted-foreground', barBg: 'bg-border', label: 'Neglected', desc: 'Zero volume recorded.' },
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Symmetry Balance</h1>
        <p className="text-primary text-sm font-bold uppercase tracking-widest">4-week muscle analysis</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-6 pt-2 no-scrollbar -mx-6 px-6 mb-2">
        {MUSCLE_GROUPS.map(g => (
          <button
            key={g}
            onClick={() => setSelectedGroup(g)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              selectedGroup === g 
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105' 
                : 'bg-card text-muted-foreground border border-border hover:bg-card/80 hover:text-foreground'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedGroup}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {analysis[selectedGroup].map((item, i) => {
              const config = StatusConfig[item.status];
              const Icon = config.icon;
              return (
                <div 
                  key={item.head} 
                  className="bg-card rounded-2xl p-5 border border-border flex flex-col gap-4 relative overflow-hidden shadow-lg shadow-black/20 group"
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${config.bg}`} />
                  
                  <div className="flex justify-between items-start pl-2">
                    <div>
                      <h3 className="font-bold text-foreground text-xl mb-1">{item.head}</h3>
                      <div className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-widest ${config.color}`}>
                        <Icon size={14} strokeWidth={2.5} />
                        <span>{config.label}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-foreground">{item.volume > 0 ? item.volume.toLocaleString() : '-'}</div>
                      <div className="text-[9px] uppercase font-black tracking-widest text-muted-foreground">Volume</div>
                    </div>
                  </div>
                  
                  <div className="pl-2">
                    <p className="text-sm font-medium text-muted-foreground mb-4 leading-relaxed">{config.desc}</p>
                    <div className={`h-3 w-full rounded-full overflow-hidden ${config.barBg}`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${config.bg}`} 
                        style={{ width: `${Math.max(item.percentage, item.volume > 0 ? 5 : 0)}%` }} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-10 bg-primary/10 border border-primary/20 rounded-2xl p-5 flex gap-4 items-start shadow-inner">
        <Target className="text-primary shrink-0 mt-0.5" size={24} />
        <p className="text-xs text-primary font-bold leading-relaxed opacity-90">
          Balance compares your relative volume across all muscles over 28 days. You don't need everything to be "Optimal" at once — just ensure you aren't completely neglecting important stabilizers.
        </p>
      </div>
    </div>
  );
}
