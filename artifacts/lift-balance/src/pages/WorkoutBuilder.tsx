import { useState } from 'react';
import {
  Plus, X, Trash2, Lightbulb, Play,
  ChevronLeft, Pencil, ClipboardList,
} from 'lucide-react';
import { useLocation } from 'wouter';
import { WorkoutTemplate, TemplateExercise, MuscleGroup } from '../types';
import { MUSCLE_GROUPS, MUSCLE_HEADS } from '../data/muscleGroups';
import { EXERCISE_SUGGESTIONS } from '../data/exerciseSuggestions';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';

// ── Main page ────────────────────────────────────────────────────────

export default function WorkoutBuilder() {
  const { templates, saveTemplate, deleteTemplate } = useData();
  const [, navigate] = useLocation();
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editing, setEditing] = useState<WorkoutTemplate | null>(null);

  const startNew = () => {
    setEditing({ id: crypto.randomUUID(), name: '', exercises: [] });
    setView('editor');
  };

  const editTemplate = (t: WorkoutTemplate) => {
    setEditing({ ...t, exercises: t.exercises.map(e => ({ ...e })) });
    setView('editor');
  };

  const handleSave = (t: WorkoutTemplate) => {
    saveTemplate(t);
    setView('list');
    setEditing(null);
  };

  const handleStartWorkout = (t: WorkoutTemplate) => {
    localStorage.setItem('lift_balance_pending_template', JSON.stringify(t));
    navigate('/');
  };

  if (view === 'editor' && editing) {
    return (
      <TemplateEditor
        template={editing}
        onSave={handleSave}
        onCancel={() => { setView('list'); setEditing(null); }}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Workout Builder</h1>
        <p className="text-primary text-sm font-bold uppercase tracking-widest">Your Templates</p>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {templates.map(t => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-2xl border border-border shadow-lg shadow-black/20 overflow-hidden"
            >
              <div className="p-4">
                {/* Template header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg leading-tight">
                      {t.name || 'Untitled'}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.exercises.length} exercise{t.exercises.length !== 1 ? 's' : ''}
                      {t.exercises.length > 0 && (
                        <> · {[...new Set(t.exercises.map(e => e.muscleGroup))].join(', ')}</>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0 ml-2">
                    <button
                      onClick={() => editTemplate(t)}
                      className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteTemplate(t.id)}
                      className="p-2 rounded-xl bg-background border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Exercise chips */}
                {t.exercises.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {t.exercises.map(ex => (
                      <span
                        key={ex.id}
                        className="text-[10px] font-bold bg-primary/10 text-primary rounded-md px-2 py-1"
                      >
                        {ex.name || ex.muscleHead}
                      </span>
                    ))}
                  </div>
                )}

                {/* Start button */}
                <button
                  onClick={() => handleStartWorkout(t)}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <Play size={15} strokeWidth={2} fill="currentColor" />
                  Start Workout
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {templates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-6 border border-border shadow-2xl shadow-primary/5">
              <ClipboardList className="text-primary" size={36} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No templates yet</h3>
            <p className="text-sm text-muted-foreground max-w-[220px] leading-relaxed">
              Build a template once, then launch any workout in a tap.
            </p>
          </motion.div>
        )}

        <button
          onClick={startNew}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-border bg-card/30 text-muted-foreground font-bold hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2 group"
        >
          <Plus size={20} className="group-hover:scale-125 transition-transform" />
          <span>New Template</span>
        </button>
      </div>
    </div>
  );
}

// ── Template Editor ──────────────────────────────────────────────────

function TemplateEditor({
  template,
  onSave,
  onCancel,
}: {
  template: WorkoutTemplate;
  onSave: (t: WorkoutTemplate) => void;
  onCancel: () => void;
}) {
  const [t, setT] = useState<WorkoutTemplate>(template);

  const addExercise = () => {
    const group: MuscleGroup = 'Chest';
    setT(prev => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          id: crypto.randomUUID(),
          name: '',
          muscleGroup: group,
          muscleHead: MUSCLE_HEADS[group][0],
        },
      ],
    }));
  };

  const updateExercise = (ex: TemplateExercise) => {
    setT(prev => ({
      ...prev,
      exercises: prev.exercises.map(e => e.id === ex.id ? ex : e),
    }));
  };

  const removeExercise = (id: string) => {
    setT(prev => ({
      ...prev,
      exercises: prev.exercises.filter(e => e.id !== id),
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onCancel}
          className="p-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ChevronLeft size={20} />
        </button>
        <input
          type="text"
          placeholder="Template name..."
          value={t.name}
          onChange={e => setT(prev => ({ ...prev, name: e.target.value }))}
          className="flex-1 bg-transparent border-none text-foreground font-bold text-xl focus:outline-none focus:ring-0 p-0 placeholder:text-muted-foreground/40"
          autoFocus
        />
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {t.exercises.map((ex, i) => (
            <TemplateExerciseCard
              key={ex.id}
              exercise={ex}
              index={i + 1}
              onChange={updateExercise}
              onRemove={() => removeExercise(ex.id)}
            />
          ))}
        </AnimatePresence>

        {t.exercises.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Add exercises to your template below.
          </p>
        )}

        <button
          onClick={addExercise}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-border bg-card/30 text-muted-foreground font-bold hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2 group"
        >
          <Plus size={20} className="group-hover:scale-125 transition-transform" />
          <span>Add Exercise</span>
        </button>

        <button
          onClick={() => onSave(t)}
          disabled={!t.name.trim()}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          Save Template
        </button>
      </div>
    </div>
  );
}

// ── Template Exercise Card (no sets — just muscle selection + name) ──

function TemplateExerciseCard({
  exercise,
  index,
  onChange,
  onRemove,
}: {
  exercise: TemplateExercise;
  index: number;
  onChange: (e: TemplateExercise) => void;
  onRemove: () => void;
}) {
  const suggestions = EXERCISE_SUGGESTIONS[exercise.muscleHead] ?? [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg shadow-black/20"
    >
      {/* Selectors + name */}
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
            className="w-full bg-transparent border-none text-foreground font-bold text-lg focus:outline-none focus:ring-0 p-0 placeholder:text-muted-foreground/40"
          />
          <div className="flex gap-2">
            <select
              value={exercise.muscleGroup}
              onChange={e => {
                const newGroup = e.target.value as MuscleGroup;
                onChange({
                  ...exercise,
                  muscleGroup: newGroup,
                  muscleHead: MUSCLE_HEADS[newGroup][0],
                  name: '',
                });
              }}
              className="bg-background text-xs font-bold text-foreground border border-border rounded-lg px-2.5 py-2 focus:outline-none focus:border-primary w-[100px] shrink-0"
            >
              {MUSCLE_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select
              value={exercise.muscleHead}
              onChange={e => onChange({ ...exercise, muscleHead: e.target.value, name: '' })}
              className="bg-background text-xs font-bold text-primary border border-border rounded-lg px-2.5 py-2 focus:outline-none focus:border-primary flex-1 min-w-0"
            >
              {MUSCLE_HEADS[exercise.muscleGroup].map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive h-fit p-1 bg-background rounded-lg border border-border transition-colors shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb size={12} className="text-primary" strokeWidth={2.5} />
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Suggested for {exercise.muscleHead.split(' (')[0]}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(name => {
              const isSelected = exercise.name === name;
              return (
                <button
                  key={name}
                  onClick={() => onChange({ ...exercise, name: isSelected ? '' : name })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/30'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
