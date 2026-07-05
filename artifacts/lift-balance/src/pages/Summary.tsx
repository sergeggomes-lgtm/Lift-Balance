import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { startOfWeek, startOfMonth, parseISO, isAfter } from 'date-fns';
import { Activity } from 'lucide-react';
import { MUSCLE_GROUPS } from '../data/muscleGroups';
import { motion } from 'framer-motion';

export default function Summary() {
  const { workouts, settings } = useData();
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  const stats = useMemo(() => {
    const now = new Date();
    const startDate = timeframe === 'week' ? startOfWeek(now, { weekStartsOn: 1 }) : startOfMonth(now);
    
    const validWorkouts = workouts.filter(w => {
      const wDate = parseISO(w.date);
      return isAfter(wDate, startDate) || wDate.getTime() === startDate.getTime();
    });

    let totalVolume = 0;
    let totalSets = 0;
    const muscleVolume: Record<string, number> = {};
    
    MUSCLE_GROUPS.forEach(g => muscleVolume[g] = 0);

    validWorkouts.forEach(w => {
      w.exercises.forEach(ex => {
        const exVol = ex.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
        totalVolume += exVol;
        totalSets += ex.sets.length;
        if (muscleVolume[ex.muscleGroup] !== undefined) {
          muscleVolume[ex.muscleGroup] += exVol;
        }
      });
    });

    const chartData = Object.entries(muscleVolume)
      .map(([name, volume]) => ({ name, volume }))
      .filter(d => d.volume > 0)
      .sort((a, b) => b.volume - a.volume);

    return { totalVolume, totalSets, chartData };
  }, [workouts, timeframe]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Summary</h1>
        <p className="text-primary text-sm font-bold uppercase tracking-widest mb-6">Your numbers</p>
        
        <div className="flex bg-card rounded-xl p-1 border border-border mb-8 shadow-lg shadow-black/20">
          <button 
            onClick={() => setTimeframe('week')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${timeframe === 'week' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            This Week
          </button>
          <button 
            onClick={() => setTimeframe('month')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${timeframe === 'month' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            This Month
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-5 rounded-3xl border border-border shadow-lg shadow-black/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity size={48} />
            </div>
            <div className="text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-2 relative z-10">Total Volume</div>
            <div className="text-3xl font-black text-foreground relative z-10 flex items-baseline gap-1">
              {stats.totalVolume.toLocaleString()}
              <span className="text-sm text-primary">{settings.unit}</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card p-5 rounded-3xl border border-border shadow-lg shadow-black/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity size={48} />
            </div>
            <div className="text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-2 relative z-10">Total Sets</div>
            <div className="text-3xl font-black text-foreground relative z-10">{stats.totalSets}</div>
          </motion.div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-6">Volume by Muscle Group</h2>
          {stats.chartData.length > 0 ? (
            <div className="bg-card p-4 py-6 rounded-3xl border border-border h-[320px] shadow-lg shadow-black/20">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.chartData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 700 }} width={80} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#131c2c', border: '1px solid #1e293b', borderRadius: '12px', color: '#f8fafc', fontWeight: 'bold' }}
                    itemStyle={{ color: '#f59e0b', fontWeight: '900' }}
                    formatter={(value: number) => [`${value.toLocaleString()} ${settings.unit}`, 'Volume']}
                  />
                  <Bar dataKey="volume" radius={[0, 8, 8, 0]} barSize={24}>
                    {stats.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#f59e0b' : '#1e293b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="bg-card p-10 rounded-3xl border border-border flex flex-col items-center justify-center text-center opacity-80 shadow-inner">
              <Activity className="text-muted-foreground mb-4 opacity-50" size={48} strokeWidth={1.5} />
              <p className="text-sm font-bold text-muted-foreground">No data for this period.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
