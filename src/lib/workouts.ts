export interface Exercise {
  id: string;
  name: string;
  sets: string;
  rest: string;
  notes: string;
  block?: string;
  usesWeight: boolean;
}

export interface WorkoutDay {
  /** 0 = Sunday ... 6 = Saturday (Date.getDay()) */
  weekday: number;
  label: string;
  title: string;
  location: "Casa" | "Academia";
  warmup?: string;
  exercises: Exercise[];
}

export const WORKOUT_WEEK: WorkoutDay[] = [
  {
    weekday: 1,
    label: "Segunda",
    title: "Empurre + Core",
    location: "Casa",
    exercises: [
      { id: "flexao", name: "Flexão de braço", sets: "3x 8-12", rest: "60s", notes: "Cotovelos a 45°, corpo reto", usesWeight: false },
      { id: "flexao-pike", name: "Flexão pike", sets: "3x 6-8", rest: "60s", notes: "Quadril elevado em V, foco nos ombros", usesWeight: false },
      { id: "prancha-ventral", name: "Prancha ventral", sets: "2x 35s", rest: "0s", notes: "Corpo alinhado, abdômen contraído", block: "Bi-série", usesWeight: false },
      { id: "dead-bug-seg", name: "Dead bug", sets: "2x 10 cada lado", rest: "45s", notes: "Lombar totalmente colada no chão", block: "Bi-série", usesWeight: false },
    ],
  },
  {
    weekday: 2,
    label: "Terça",
    title: "Força: Puxada + Agachamento",
    location: "Academia",
    warmup: "Aquecimento (2 min): mobilidade de quadril.",
    exercises: [
      { id: "terra", name: "Levantamento terra", sets: "3x 8", rest: "0s", notes: "Carga moderada, foco na articulação do quadril", block: "Bi-série 1", usesWeight: true },
      { id: "barra-fixa-ter", name: "Barra fixa (ou negativas)", sets: "3x máx", rest: "90s", notes: "Controle a descida (3-5 segundos)", block: "Bi-série 1", usesWeight: false },
      { id: "agachamento-ter", name: "Agachamento (barra/halter)", sets: "2x 10-12", rest: "60s", notes: "Amplitude até coxa paralela ao chão", block: "Bloco Final", usesWeight: true },
    ],
  },
  {
    weekday: 3,
    label: "Quarta",
    title: "Cadeia Posterior + Estabilidade",
    location: "Casa",
    exercises: [
      { id: "ponte-gluteo", name: "Ponte de glúteo", sets: "3x 15", rest: "45s", notes: "Contração máxima no topo", usesWeight: false },
      { id: "superman", name: "Superman", sets: "3x 12", rest: "45s", notes: "Elevação controlada de braços e pernas", usesWeight: false },
      { id: "prancha-lateral", name: "Prancha lateral", sets: "3x 15-20s cada lado", rest: "30s", notes: "Quadril elevado e alinhado", usesWeight: false },
      { id: "alongamento-qua", name: "Alongamento quadril/posterior", sets: "—", rest: "3 min", notes: "Final do treino", usesWeight: false },
    ],
  },
  {
    weekday: 4,
    label: "Quinta",
    title: "Força: Quadríceps + Puxada + Posterior",
    location: "Academia",
    warmup: "Aquecimento (2 min): mobilidade de ombros e tornozelos.",
    exercises: [
      { id: "agachamento-qui", name: "Agachamento (barra/halter)", sets: "3x 8-10", rest: "0s", notes: "Empurrar o chão com os calcanhares", block: "Bi-série 1", usesWeight: true },
      { id: "barra-fixa-qui", name: "Barra fixa (ou negativas)", sets: "3x máx", rest: "90s", notes: "Pegada pronada na largura dos ombros", block: "Bi-série 1", usesWeight: false },
      { id: "stiff", name: "Stiff com halteres", sets: "2x 10-12", rest: "60s", notes: "Substitui o Terra para preservar a lombar", block: "Bloco Final", usesWeight: true },
    ],
  },
  {
    weekday: 5,
    label: "Sexta",
    title: "Regenerativo + Core + Mobilidade",
    location: "Casa",
    exercises: [
      { id: "flexao-sex", name: "Flexão de braço", sets: "2x 10", rest: "45s", notes: "Elevada no banco se houver fadiga", usesWeight: false },
      { id: "dead-bug-sex", name: "Dead bug", sets: "3x 10 cada lado", rest: "30s", notes: "Execução lenta e controlada", usesWeight: false },
      { id: "mobilidade-sex", name: "Circuito de mobilidade", sets: "—", rest: "10 min", notes: "Gato-vaca, peitoral e quadril", usesWeight: false },
    ],
  },
];

export function getWorkoutForDate(date: Date): WorkoutDay | undefined {
  return WORKOUT_WEEK.find((d) => d.weekday === date.getDay());
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
