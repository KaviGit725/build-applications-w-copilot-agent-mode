import mongoose, { Schema } from 'mongoose';
const { model, models } = mongoose;
const UserSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    gradeLevel: { type: Number, min: 6, max: 12 },
    fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    favoriteActivity: { type: String, default: 'Running' },
}, { timestamps: true });
const TeamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
}, { timestamps: true });
const ActivitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        required: true,
        enum: ['Running', 'Walking', 'Cycling', 'Strength', 'Swimming', 'Yoga'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const LeaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true, collection: 'leaderboard' });
const WorkoutSchema = new Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['Cardio', 'Strength', 'Mobility', 'Recovery'] },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Moderate' },
    description: { type: String, required: true },
}, { timestamps: true });
export const User = models.User || model('User', UserSchema);
export const Team = models.Team || model('Team', TeamSchema);
export const Activity = models.Activity || model('Activity', ActivitySchema);
export const Leaderboard = models.Leaderboard || model('Leaderboard', LeaderboardSchema);
export const Workout = models.Workout || model('Workout', WorkoutSchema);
