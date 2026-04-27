-- Enable RLS
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- ── PROFILES ─────────────────────────────────────────────────
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    country TEXT DEFAULT 'South Africa',
    destination_preference TEXT DEFAULT 'Any',

    -- Academic
    study_level TEXT CHECK (study_level IN ('undergraduate','masters','phd','postdoc')),
    field_of_study TEXT,
    institution TEXT,
    gpa TEXT,

    -- Story
    achievements TEXT,
    community_involvement TEXT,
    career_goals TEXT,
    career_vision TEXT,

    -- Completeness (0–100, computed by trigger)
    profile_completeness INTEGER DEFAULT 0,

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile"
    ON profiles FOR ALL USING (auth.uid() = id);

-- Auto-compute completeness on every save
CREATE OR REPLACE FUNCTION compute_profile_completeness()
RETURNS TRIGGER AS $$
BEGIN
    NEW.profile_completeness := (
        (CASE WHEN NEW.full_name IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN NEW.field_of_study IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN NEW.study_level IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN NEW.institution IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN NEW.gpa IS NOT NULL THEN 1 ELSE 0 END +
         CASE WHEN LENGTH(NEW.achievements) > 50 THEN 1 ELSE 0 END +
         CASE WHEN LENGTH(NEW.community_involvement) > 30 THEN 1 ELSE 0 END +
         CASE WHEN LENGTH(NEW.career_goals) > 30 THEN 1 ELSE 0 END +
         CASE WHEN LENGTH(NEW.career_vision) > 30 THEN 1 ELSE 0 END +
         CASE WHEN NEW.phone IS NOT NULL THEN 1 ELSE 0 END)
        * 10  -- 10 fields × 10 = 100 max
    );
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_completeness
    BEFORE INSERT OR UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION compute_profile_completeness();

-- ── SCHOLARSHIPS (curated, not crawled) ──────────────────────
CREATE TABLE scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    organisation TEXT,
    host_country TEXT,
    flag TEXT,
    fields TEXT[],
    study_levels TEXT[],
    deadline DATE,
    amount_usd INTEGER,
    amount_local INTEGER,
    local_currency TEXT,
    local_symbol TEXT,
    tags TEXT[],
    description TEXT,
    hidden_requirements TEXT,
    application_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads scholarships" ON scholarships FOR SELECT USING (is_active = TRUE);

-- ── MATCHES ───────────────────────────────────────────────────
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    scholarship_id UUID REFERENCES scholarships(id),
    score INTEGER NOT NULL,
    reasons TEXT[],
    is_saved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, scholarship_id)
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own matches" ON matches FOR ALL USING (
    auth.uid() = (SELECT id FROM profiles WHERE id = profile_id)
);

-- ── APPLICATIONS ──────────────────────────────────────────────
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    scholarship_id UUID REFERENCES scholarships(id),
    status TEXT DEFAULT 'not_started'
        CHECK (status IN ('not_started','in_progress','submitted','rejected','accepted')),
    completion_pct INTEGER DEFAULT 0,
    personal_notes TEXT,
    deadline DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, scholarship_id)
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own applications" ON applications FOR ALL USING (
    auth.uid() = (SELECT id FROM profiles WHERE id = profile_id)
);

-- ── ESSAY SESSIONS ────────────────────────────────────────────
CREATE TABLE essay_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    scholarship_id UUID REFERENCES scholarships(id),
    draft_text TEXT,
    feedback_text TEXT,
    iteration INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE essay_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own essays" ON essay_sessions FOR ALL USING (
    auth.uid() = (SELECT id FROM profiles WHERE id = profile_id)
);

-- ── NUDGE LOG ─────────────────────────────────────────────────
CREATE TABLE nudge_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    nudge_type TEXT,
    shown_at TIMESTAMPTZ DEFAULT NOW(),
    action_taken BOOLEAN DEFAULT FALSE
);

ALTER TABLE nudge_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own nudges" ON nudge_log FOR ALL USING (
    auth.uid() = (SELECT id FROM profiles WHERE id = profile_id)
);
