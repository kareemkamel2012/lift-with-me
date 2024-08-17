export type WorkoutEntity = {
    id: number;
    name: string | undefined;
    description: string | undefined;
    userId: number;
    date: string;
    rating: number;
}