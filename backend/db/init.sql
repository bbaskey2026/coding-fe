-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(512),
    bio VARCHAR(512),
    role VARCHAR(50) DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP WITH TIME ZONE,
    password_reset_token VARCHAR(255),
    password_reset_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Index on verification & reset tokens for fast queries
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
CREATE INDEX IF NOT EXISTS idx_users_password_reset_token ON users(password_reset_token);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create problems table
CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    acceptance VARCHAR(50) DEFAULT '0.0%',
    solved_count INT DEFAULT 0,
    companies TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    examples JSONB DEFAULT '[]',
    constraints TEXT[] DEFAULT '{}',
    templates JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on difficulty and tags for fast catalog searches
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);

-- Trigger to automatically update problems updated_at timestamp
CREATE OR REPLACE TRIGGER update_problems_updated_at
    BEFORE UPDATE ON problems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create company_guides table
CREATE TABLE IF NOT EXISTS company_guides (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) UNIQUE NOT NULL,
    logo_url VARCHAR(512),
    difficulty VARCHAR(50) NOT NULL,
    exam_pattern JSONB DEFAULT '{}',
    question_types TEXT[] DEFAULT '{}',
    common_questions JSONB DEFAULT '[]',
    article_content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on company name
CREATE INDEX IF NOT EXISTS idx_company_guides_name ON company_guides(company_name);

-- Trigger to automatically update company_guides updated_at timestamp
CREATE OR REPLACE TRIGGER update_company_guides_updated_at
    BEFORE UPDATE ON company_guides
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
