export type ExerciseSet = {
    exercise: string;
    id: number;
    reps: number;
    weight: number;
    note: string | undefined;
    workoutId: number;
}