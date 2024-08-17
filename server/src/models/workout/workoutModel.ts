import { ExerciseSet } from "../set"

export type WorkoutModel = {
    id: number,
    userId: number,
    name: string | undefined,
    description: string | undefined,
    date: Date,
    rating: number,
    sets: ExerciseSet[]
}