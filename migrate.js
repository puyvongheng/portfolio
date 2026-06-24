#!/usr/bin/env node
/**
 * Auto Migration Script for Supabase
 * Runs: node migrate.js YOUR_SERVICE_ROLE_KEY
 */

const SUPABASE_URL = 'https://vrrkxegfcituwxmaciji.supabase.co';
const SERVICE_ROLE_KEY = process.argv[2];

if (!SERVICE_ROLE_KEY) {
  console.error('\n❌  Missing Service Role Key!\n');
  console.error('Usage: node migrate.js YOUR_SERVICE_ROLE_KEY\n');
  console.error('Get it from: https://supabase.com/dashboard/project/vrrkxegfcituwxmacji/settings/api\n');
  process.exit(1);
}

const SQL = `
-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title       text NOT NULL,
    subtitle    text,
    description text,
    difficulty  text DEFAULT 'COMMON',
    status      text DEFAULT 'ONGOING',
    stars       int  DEFAULT 4,
    created_at  timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
    id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    label      text NOT NULL,
    icon       text,
    category   text DEFAULT 'Frontend / Backend',
    created_at timestamptz DEFAULT timezone('utc', now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills   ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist (safe re-run)
DROP POLICY IF EXISTS "Public read projects"    ON public.projects;
DROP POLICY IF EXISTS "Admin insert projects"   ON public.projects;
DROP POLICY IF EXISTS "Admin update projects"   ON public.projects;
DROP POLICY IF EXISTS "Admin delete projects"   ON public.projects;
DROP POLICY IF EXISTS "Public read skills"      ON public.skills;
DROP POLICY IF EXISTS "Admin insert skills"     ON public.skills;
DROP POLICY IF EXISTS "Admin update skills"     ON public.skills;
DROP POLICY IF EXISTS "Admin delete skills"     ON public.skills;

-- Public can read
CREATE POLICY "Public read projects"  ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read skills"    ON public.skills   FOR SELECT USING (true);

-- Authenticated users can write
CREATE POLICY "Admin insert projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update projects" ON public.projects FOR UPDATE USING     (auth.role() = 'authenticated');
CREATE POLICY "Admin delete projects" ON public.projects FOR DELETE USING     (auth.role() = 'authenticated');
CREATE POLICY "Admin insert skills"   ON public.skills   FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update skills"   ON public.skills   FOR UPDATE USING     (auth.role() = 'authenticated');
CREATE POLICY "Admin delete skills"   ON public.skills   FOR DELETE USING     (auth.role() = 'authenticated');
`;

async function migrate() {
  console.log('\n🚀  Running database migration...\n');

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ sql: SQL }),
    });

    // Supabase doesn't have exec_sql by default — use the pg endpoint instead
    if (!res.ok) {
      // Fallback: use the raw /query endpoint available on newer Supabase versions
      const res2 = await fetch(`${SUPABASE_URL}/pg/query`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ query: SQL }),
      });

      if (!res2.ok) {
        const body = await res2.text();
        throw new Error(body);
      }
    }

    console.log('✅  Migration complete!\n');
    console.log('   Tables created:');
    console.log('   - public.projects');
    console.log('   - public.skills');
    console.log('\n   You can now add data from the Admin panel.\n');

  } catch (err) {
    console.error('\n⚠️  Could not auto-migrate via API.\n');
    console.error('    Please run the SQL manually in your Supabase SQL Editor:\n');
    console.error('    https://supabase.com/dashboard/project/vrrkxegfcituwxmacji/sql\n');
    console.log('── SQL TO PASTE ──────────────────────────────────────────────\n');
    console.log(SQL);
    console.log('──────────────────────────────────────────────────────────────\n');
  }
}

migrate();
