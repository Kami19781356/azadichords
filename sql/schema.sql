-- Azadichords Support orders. Run this once against the Postgres
-- database referenced by DATABASE_URL (see docs/SALES_SETUP.md).
--
-- psql "$DATABASE_URL" -f sql/schema.sql

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  email text not null,
  tier text not null check (tier in ('tier1', 'tier2', 'tier3')),
  amount_total integer not null, -- minor units (cents)
  currency text not null,
  -- Tier 3 only: whether the buyer opted in to public name display.
  -- Defaults to false (anonymous) — see Sales Process Spec section 5.
  name_opt_in boolean not null default false,
  supporter_name text,
  -- 'pending_review' -> 'approved' -> published on the public
  -- Founding Supporters list. Anonymous entries never enter this flow.
  moderation_status text not null default 'none'
    check (moderation_status in ('none', 'pending_review', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists orders_moderation_status_idx
  on orders (moderation_status)
  where moderation_status = 'pending_review';
