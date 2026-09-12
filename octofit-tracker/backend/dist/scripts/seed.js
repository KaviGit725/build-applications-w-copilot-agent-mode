import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                firstName: 'Maya',
                lastName: 'Lopez',
                email: 'maya.lopez@merington.edu',
                password: 'password123',
                gradeLevel: 10,
                fitnessLevel: 'Advanced',
                favoriteActivity: 'Running',
            },
            {
                firstName: 'Leo',
                lastName: 'Nguyen',
                email: 'leo.nguyen@merington.edu',
                password: 'password123',
                gradeLevel: 9,
                fitnessLevel: 'Intermediate',
                favoriteActivity: 'Cycling',
            },
            {
                firstName: 'Ava',
                lastName: 'Patel',
                email: 'ava.patel@merington.edu',
                password: 'password123',
                gradeLevel: 11,
                fitnessLevel: 'Beginner',
                favoriteActivity: 'Walking',
            },
            {
                firstName: 'Marcus',
                lastName: 'Kim',
                email: 'marcus.kim@merington.edu',
                password: 'password123',
                gradeLevel: 12,
                fitnessLevel: 'Advanced',
                favoriteActivity: 'Strength',
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'Lightning Bugs',
                description: 'Fast-paced, endurance-focused team with a love for morning runs.',
                members: [users[0]._id, users[1]._id],
                points: 1260,
            },
            {
                name: 'Iron Hawks',
                description: 'Strength and power team specializing in functional fitness.',
                members: [users[2]._id, users[3]._id],
                points: 1425,
            },
        ]);
        const activities = await Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Running',
                durationMinutes: 42,
                caloriesBurned: 510,
                date: new Date('2026-09-08T06:30:00Z'),
            },
            {
                user: users[1]._id,
                type: 'Cycling',
                durationMinutes: 35,
                caloriesBurned: 420,
                date: new Date('2026-09-09T17:00:00Z'),
            },
            {
                user: users[2]._id,
                type: 'Walking',
                durationMinutes: 50,
                caloriesBurned: 310,
                date: new Date('2026-09-10T18:15:00Z'),
            },
            {
                user: users[3]._id,
                type: 'Strength',
                durationMinutes: 45,
                caloriesBurned: 560,
                date: new Date('2026-09-11T15:45:00Z'),
            },
        ]);
        const leaderboardEntries = await Leaderboard.insertMany([
            {
                user: users[0]._id,
                team: teams[0]._id,
                points: 420,
                rank: 1,
            },
            {
                user: users[3]._id,
                team: teams[1]._id,
                points: 390,
                rank: 2,
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                points: 360,
                rank: 3,
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                points: 330,
                rank: 4,
            },
        ]);
        await Workout.insertMany([
            {
                name: 'Cardio Circuit Blast',
                category: 'Cardio',
                durationMinutes: 25,
                difficulty: 'Moderate',
                description: 'High-energy interval circuit mixing burpees, jumping jacks, and mountain climbers.',
            },
            {
                name: 'Core and Mobility Flow',
                category: 'Mobility',
                durationMinutes: 20,
                difficulty: 'Easy',
                description: 'Gentle mobility flow with balance drills and planks for posture and recovery.',
            },
            {
                name: 'Leg Day Power Set',
                category: 'Strength',
                durationMinutes: 40,
                difficulty: 'Challenging',
                description: 'Squats, lunges, deadlifts, and press work to build lower-body strength.',
            },
        ]);
        console.log('Seed created users:', users.length);
        console.log('Seed created teams:', teams.length);
        console.log('Seed created activities:', activities.length);
        console.log('Seed created leaderboard entries:', leaderboardEntries.length);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
