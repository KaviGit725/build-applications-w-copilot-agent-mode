import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';
const router = Router();
const normalizePopulation = (value) => {
    if (Array.isArray(value)) {
        return value[0];
    }
    return value;
};
router.get('/api/users', async (_request, response) => {
    const users = await User.find().lean();
    response.json(users);
});
router.get('/api/teams', async (_request, response) => {
    const teams = await Team.find().populate('members').lean();
    response.json(teams);
});
router.get('/api/activities', async (_request, response) => {
    const activities = await Activity.find().populate('user').lean();
    response.json(activities);
});
router.get('/api/leaderboard', async (_request, response) => {
    const leaderboard = await Leaderboard.find().populate(['user', 'team']).lean();
    response.json(leaderboard);
});
router.get('/api/workouts', async (_request, response) => {
    const workouts = await Workout.find().lean();
    response.json(workouts);
});
router.get('/api', async (_request, response) => {
    const [users, teams, activities, leaderboard, workouts] = await Promise.all([
        User.countDocuments(),
        Team.countDocuments(),
        Activity.countDocuments(),
        Leaderboard.countDocuments(),
        Workout.countDocuments(),
    ]);
    response.json({
        users,
        teams,
        activities,
        leaderboard,
        workouts,
        status: 'ok',
    });
});
export default router;
