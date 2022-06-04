import mongoose from "mongoose";

export interface IUserHabits {
    body:Array<bodyBasics>,
    mind:Array<mindBasics>
}

export enum bodyBasics{
    SLEEP = 'sleep',
    DRINK = 'drink',
    MOVE = 'move',
    EAT = 'eat'
}

export enum mindBasics {
    MEDITATE = 'meditate',
    GRATITUDE = 'gratitude',
    JOURNAL = 'journal',
    THOUGHT = 'thought'
}

var userHabitsSchema = new mongoose.Schema<IUserHabits>({
    body:[{type:String, enum:bodyBasics}],
    mind:[{type:String, enum:mindBasics}]
})

export default userHabitsSchema;
