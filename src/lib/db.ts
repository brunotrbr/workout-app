import Dexie, { type EntityTable } from "dexie";

export interface WeightLog {
  id?: number;
  exerciseId: string;
  weight: number;
  unit: "kg";
  date: string; // ISO yyyy-mm-dd
  createdAt: number;
}

export const db = new Dexie("treino-db") as Dexie & {
  weightLogs: EntityTable<WeightLog, "id">;
};

db.version(1).stores({
  weightLogs: "++id, exerciseId, date, [exerciseId+date], createdAt",
});
