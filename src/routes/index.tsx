import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
import {
  WORKOUT_WEEK,
  getWorkoutForDate,
  toISODate,
  type Exercise,
  type WorkoutDay,
} from "../lib/workouts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meu Treino Semanal" },
      {
        name: "description",
        content:
          "Cronograma semanal de treinos com registro de cargas. Funciona offline no celular.",
      },
      { property: "og:title", content: "Meu Treino Semanal" },
      {
        property: "og:description",
        content:
          "Cronograma semanal de treinos com registro de cargas. Funciona offline no celular.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function Index() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDay());
  const workout = WORKOUT_WEEK.find((d) => d.weekday === selectedDay);
  const todayWorkout = getWorkoutForDate(today);

  return (
    <div className="mx-auto min-h-screen max-w-lg px-4 pb-16 pt-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {WEEKDAYS[today.getDay()]}, {today.toLocaleDateString("pt-BR")}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">
          Meu Treino Semanal
        </h1>
        {todayWorkout && (
          <p className="mt-1 text-sm text-muted-foreground">
            Hoje: {todayWorkout.title} · {todayWorkout.location}
          </p>
        )}
      </header>

      <nav
        aria-label="Dias da semana"
        className="mb-6 grid grid-cols-7 gap-1.5"
      >
        {WEEKDAYS.map((label, i) => {
          const hasWorkout = WORKOUT_WEEK.some((d) => d.weekday === i);
          const isSelected = i === selectedDay;
          const isToday = i === today.getDay();
          return (
            <button
              key={label}
              onClick={() => setSelectedDay(i)}
              disabled={!hasWorkout}
              className={[
                "rounded-lg py-2 text-xs font-semibold transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : hasWorkout
                    ? "bg-card text-card-foreground hover:bg-accent"
                    : "cursor-not-allowed bg-transparent text-muted-foreground/40",
                isToday && !isSelected ? "ring-1 ring-primary" : "",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {workout ? (
        <WorkoutView workout={workout} selectedDay={selectedDay} />
      ) : (
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-lg font-semibold text-card-foreground">
            Dia de descanso 😴
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Nenhum treino programado para {(WEEKDAYS[selectedDay] ?? "").toLowerCase()}.
          </p>
        </div>
      )}
    </div>
  );
}

function WorkoutView({
  workout,
  selectedDay,
}: {
  workout: WorkoutDay;
  selectedDay: number;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">{workout.title}</h2>
          <p className="text-sm text-muted-foreground">
            {workout.label} · {workout.location}
          </p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {workout.location}
        </span>
      </div>

      {workout.warmup && (
        <p className="mb-4 rounded-lg border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
          {workout.warmup}
        </p>
      )}

      <div className="space-y-3">
        {workout.exercises.map((ex) => (
          <ExerciseCard key={ex.id} exercise={ex} selectedDay={selectedDay} />
        ))}
      </div>
    </section>
  );
}

function ExerciseCard({
  exercise,
  selectedDay,
}: {
  exercise: Exercise;
  selectedDay: number;
}) {
  const [weight, setWeight] = useState("");

  const logs = useLiveQuery(
    () =>
      db.weightLogs
        .where("exerciseId")
        .equals(exercise.id)
        .reverse()
        .sortBy("createdAt"),
    [exercise.id],
  );

  const lastLog = logs?.[0];

  async function saveWeight() {
    const value = parseFloat(weight.replace(",", "."));
    if (!Number.isFinite(value) || value <= 0) return;
    const now = new Date();
    // Store the log against the selected day's date within the current week.
    const date = new Date(now);
    date.setDate(now.getDate() + ((selectedDay - now.getDay() + 7) % 7));
    await db.weightLogs.add({
      exerciseId: exercise.id,
      weight: value,
      unit: "kg",
      date: toISODate(date),
      createdAt: Date.now(),
    });
    setWeight("");
  }

  return (
    <article className="rounded-xl border border-border bg-card p-4">
      {exercise.block && (
        <span className="mb-2 inline-block rounded bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">
          {exercise.block}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-card-foreground">{exercise.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {exercise.notes}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold text-primary">{exercise.sets}</p>
          <p className="text-[10px] text-muted-foreground">
            descanso {exercise.rest}
          </p>
        </div>
      </div>

      {exercise.usesWeight && (
        <div className="mt-3 border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              placeholder={
                lastLog ? `Última: ${lastLog.weight} kg` : "Carga (kg)"
              }
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveWeight()}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={`Carga para ${exercise.name}`}
            />
            <button
              onClick={saveWeight}
              disabled={!weight}
              className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
            >
              Salvar
            </button>
          </div>
          {logs && logs.length > 0 && (
            <ul className="mt-2 space-y-1">
              {logs.slice(0, 3).map((log) => (
                <li
                  key={log.id}
                  className="flex items-center justify-between text-xs text-muted-foreground"
                >
                  <span>
                    {new Date(`${log.date}T12:00:00`).toLocaleDateString(
                      "pt-BR",
                      { day: "2-digit", month: "2-digit" },
                    )}
                  </span>
                  <span className="font-semibold text-card-foreground">
                    {log.weight} kg
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
