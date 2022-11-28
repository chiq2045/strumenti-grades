import { config } from 'dotenv';
import { app } from './app';

config();

const { PORT } = process.env;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
