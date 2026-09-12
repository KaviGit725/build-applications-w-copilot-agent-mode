import express from 'express';
import './config/database.js';
import router from './routes.js';
const app = express();
const port = Number(process.env.PORT || 8000);
app.use(express.json());
app.use(router);
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
    console.log(`API base URL: ${baseUrl}`);
});
