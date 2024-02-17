import mongoose from 'mongoose';

// Assuming you've set the type of MONGODB_URI correctly in your environment,
// you could directly use it. However, it's good practice to ensure its type safety.
const MONGODB_URI: string | undefined = process.env.NEXT_MONGODB_URI;

// Define a type for the cached connection to potentially hold a mongoose connection
let cachedConnection: mongoose.Connection | null = null;

async function dbConnect(): Promise<mongoose.Connection> {
    if (cachedConnection) {
        return cachedConnection;
    }

    if (!MONGODB_URI) {
        throw new Error('Please define the NEXT_MONGODB_URI environment variable inside .env.local');
    }

    try {
        // Options are commented out, but you might want to enable them based on your mongoose version
        const opts: mongoose.ConnectOptions = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        };

        await mongoose.connect(MONGODB_URI, opts);
        cachedConnection = mongoose.connection;
        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

export default dbConnect;
