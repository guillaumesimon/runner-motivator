import { sql } from '@vercel/postgres';

export async function setupDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        distance NUMERIC NOT NULL,
        target_pace TEXT NOT NULL,
        comment TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create audio_coaching table
    await sql`
      CREATE TABLE IF NOT EXISTS audio_coaching (
        id SERIAL PRIMARY KEY,
        session_id INTEGER REFERENCES sessions(id),
        file_url TEXT NOT NULL,
        duration INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

export async function createUser(email: string, name: string) {
  const result = await sql`
    INSERT INTO users (email, name)
    VALUES (${email}, ${name})
    RETURNING id
  `;
  return result.rows[0].id;
}

export async function createSession(userId: number, distance: number, targetPace: string, comment: string) {
  const result = await sql`
    INSERT INTO sessions (user_id, distance, target_pace, comment)
    VALUES (${userId}, ${distance}, ${targetPace}, ${comment})
    RETURNING id
  `;
  return result.rows[0].id;
}

export async function addAudioCoaching(sessionId: number, fileUrl: string, duration: number) {
  const result = await sql`
    INSERT INTO audio_coaching (session_id, file_url, duration)
    VALUES (${sessionId}, ${fileUrl}, ${duration})
    RETURNING id
  `;
  return result.rows[0].id;
}

export async function getUserSessions(userId: number) {
  const result = await sql`
    SELECT s.*, array_agg(ac.file_url) as audio_files
    FROM sessions s
    LEFT JOIN audio_coaching ac ON s.id = ac.session_id
    WHERE s.user_id = ${userId}
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `;
  return result.rows;
}

export async function getSessionDetails(sessionId: number) {
  const result = await sql`
    SELECT s.*, u.name as user_name, array_agg(ac.file_url) as audio_files
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    LEFT JOIN audio_coaching ac ON s.id = ac.session_id
    WHERE s.id = ${sessionId}
    GROUP BY s.id, u.name
  `;
  return result.rows[0];
}
