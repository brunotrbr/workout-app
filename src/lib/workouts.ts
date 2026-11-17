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
  cooldown?: string;
  exercises: Exercise[];
}

export const WORKOUT_WEEK: WorkoutDay[] = [
  {
    weekday: 1,
    label: "Segunda",
    title: "Circuito Completo (Full Body)",
    location: "Casa",
    warmup: "Aquecimento (2-3 min): Polichinelos (30s), Círculos com os Braços (30s), Joelhos Altos (30s), Rotação de Ombro e Tronco (30s).",
    cooldown: "Volta à Calma (2-3 min): Alongamento do Quadríceps (30s/perna), Alongamento do Tríceps (30s/braço), Postura da Criança ou Cobra (1 min).",
    exercises: [
      { id: "flexoes-seg", name: "Flexões (Push-ups)", sets: "45s", rest: "15s", notes: "Peito, Ombros, Tríceps, Core. Tente completar 2 rodadas no circuito de 15 min.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "agachamentos-seg", name: "Agachamentos (Squats)", sets: "45s", rest: "15s", notes: "Quadríceps, Isquiotibiais, Glúteos. Priorize a boa forma.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "prancha-seg", name: "Prancha (Plank)", sets: "45s", rest: "15s", notes: "Força e resistência do Core. Manter coluna alinhada.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "avanco-reverso-seg", name: "Avanço Reverso (Reverse Lunges)", sets: "45s", rest: "15s", notes: "Alternando pernas. Quadríceps, Glúteos, Equilíbrio.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "escalador-seg", name: "Escalador (Mountain Climbers)", sets: "45s", rest: "15s", notes: "Cardio e Core. Ritmo constante.", block: "Circuito AMRAP (15 min)", usesWeight: false },
    ],
  },
  {
    weekday: 2,
    label: "Terça",
    title: "Core / Cardio Rápido",
    location: "Casa",
    warmup: "Aquecimento (2-3 min): Polichinelos (30s), Círculos com os Braços (30s), Joelhos Altos (30s), Rotação de Ombro e Tronco (30s).",
    cooldown: "Volta à Calma (2-3 min): Alongamento do Quadríceps (30s/perna), Alongamento do Tríceps (30s/braço), Postura da Criança ou Cobra (1 min).",
    exercises: [
      { id: "polichinelos-ter", name: "Polichinelos (Jumping Jacks)", sets: "45s", rest: "15s", notes: "Cardio e resistência. Ritmo constante.", block: "Circuito AMRAP", usesWeight: false },
      { id: "abdominais-ter", name: "Abdominais (Sit-ups)", sets: "45s", rest: "15s", notes: "Foco no Core. Movimento controlado.", block: "Circuito AMRAP", usesWeight: false },
      { id: "prancha-ter", name: "Prancha (Plank)", sets: "45s", rest: "15s", notes: "Resistência do Core. Abdômen firme.", block: "Circuito AMRAP", usesWeight: false },
    ],
  },
  {
    weekday: 3,
    label: "Quarta",
    title: "Circuito Completo (Full Body)",
    location: "Casa",
    warmup: "Aquecimento (2-3 min): Polichinelos (30s), Círculos com os Braços (30s), Joelhos Altos (30s), Rotação de Ombro e Tronco (30s).",
    cooldown: "Volta à Calma (2-3 min): Alongamento do Quadríceps (30s/perna), Alongamento do Tríceps (30s/braço), Postura da Criança ou Cobra (1 min).",
    exercises: [
      { id: "flexoes-qua", name: "Flexões (Push-ups)", sets: "45s", rest: "15s", notes: "Peito, Ombros, Tríceps, Core. Meta: tentar 3 rodadas no circuito de 15 min.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "agachamentos-qua", name: "Agachamentos (Squats)", sets: "45s", rest: "15s", notes: "Quadríceps, Isquiotibiais, Glúteos.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "prancha-qua", name: "Prancha (Plank)", sets: "45s", rest: "15s", notes: "Força e resistência do Core.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "avanco-reverso-qua", name: "Avanço Reverso (Reverse Lunges)", sets: "45s", rest: "15s", notes: "Alternando pernas. Quadríceps, Glúteos, Equilíbrio.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "escalador-qua", name: "Escalador (Mountain Climbers)", sets: "45s", rest: "15s", notes: "Cardio e Core.", block: "Circuito AMRAP (15 min)", usesWeight: false },
    ],
  },
  {
    weekday: 4,
    label: "Quinta",
    title: "Yoga / Alongamento Suave",
    location: "Casa",
    warmup: "Recuperação Ativa (20 min): Alongamento focado nas pernas, costas e ombros.",
    exercises: [
      { id: "saudacao-ao-sol-qui", name: "Saudação ao Sol (Sun Salutation)", sets: "5 min", rest: "30s", notes: "Fluxo contínuo e suave. Mobilidade global e respiração.", block: "Yoga & Mobilidade", usesWeight: false },
      { id: "alongamento-quadriceps-qui", name: "Alongamento do Quadríceps", sets: "30s cada perna", rest: "15s", notes: "Segure o pé na altura do glúteo, joelhos alinhados.", block: "Alongamento", usesWeight: false },
      { id: "alongamento-triceps-qui", name: "Alongamento do Tríceps", sets: "30s cada braço", rest: "15s", notes: "Braço atrás da cabeça, empurre suavemente o cotovelo.", block: "Alongamento", usesWeight: false },
      { id: "postura-crianca-cobra-qui", name: "Postura da Criança ou Cobra", sets: "1 min", rest: "30s", notes: "Child's Pose ou Cobra Stretch para alívio de costas e core.", block: "Alongamento", usesWeight: false },
    ],
  },
  {
    weekday: 5,
    label: "Sexta",
    title: "Circuito Completo (Full Body)",
    location: "Casa",
    warmup: "Aquecimento (2-3 min): Polichinelos (30s), Círculos com os Braços (30s), Joelhos Altos (30s), Rotação de Ombro e Tronco (30s).",
    cooldown: "Volta à Calma (2-3 min): Alongamento do Quadríceps (30s/perna), Alongamento do Tríceps (30s/braço), Postura da Criança ou Cobra (1 min).",
    exercises: [
      { id: "flexoes-sex", name: "Flexões (Push-ups)", sets: "50s", rest: "10-15s", notes: "Peito, Ombros, Tríceps, Core. Aumente para 50s se estiver bem.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "agachamentos-sex", name: "Agachamentos (Squats)", sets: "50s", rest: "10-15s", notes: "Quadríceps, Isquiotibiais, Glúteos.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "prancha-sex", name: "Prancha (Plank)", sets: "50s", rest: "10-15s", notes: "Força e resistência do Core.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "avanco-reverso-sex", name: "Avanço Reverso (Reverse Lunges)", sets: "50s", rest: "10-15s", notes: "Alternando pernas. Quadríceps, Glúteos, Equilíbrio.", block: "Circuito AMRAP (15 min)", usesWeight: false },
      { id: "escalador-sex", name: "Escalador (Mountain Climbers)", sets: "50s", rest: "10-15s", notes: "Cardio e Core.", block: "Circuito AMRAP (15 min)", usesWeight: false },
    ],
  },
  {
    weekday: 6,
    label: "Sábado",
    title: "Desafio 'PT' Militar",
    location: "Casa",
    warmup: "Aquecimento (2-3 min): Polichinelos (30s), Círculos com os Braços (30s), Joelhos Altos (30s), Rotação de Ombro e Tronco (30s).",
    cooldown: "Volta à Calma (2-3 min): Alongamento do Quadríceps (30s/perna), Alongamento do Tríceps (30s/braço), Postura da Criança ou Cobra (1 min).",
    exercises: [
      { id: "burpees-sab", name: "Burpees", sets: "30s", rest: "0-10s", notes: "Corpo todo e intensidade cardiovascular. Repita AMRAP por 15 min.", block: "Desafio PT Militar", usesWeight: false },
      { id: "prancha-sab", name: "Prancha (Plank)", sets: "30s", rest: "0-10s", notes: "Resistência do Core sob fadiga. Repita AMRAP por 15 min.", block: "Desafio PT Militar", usesWeight: false },
    ],
  },
  {
    weekday: 0,
    label: "Domingo",
    title: "Descanso Completo (Rest)",
    location: "Casa",
    warmup: "Recuperação total do corpo. Beba bastante água, alimente-se bem e descanse para reiniciar a semana.",
    exercises: [],
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
