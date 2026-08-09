import type { Metadata } from "next";
import { getPool } from "@/lib/db";

export const metadata: Metadata = {
  title: "Founding Supporters — Moderation",
  robots: { index: false, follow: false },
};

// Deliberately minimal: a shared-secret query param, not a full auth
// system. Good enough for one person reviewing an occasional queue —
// replace with real auth before this sees meaningful traffic. The key
// living in the URL means it can end up in browser history/server
// logs, so treat it like a password and rotate ADMIN_SECRET if it
// leaks.
async function isAuthorized(key: string | undefined) {
  const secret = process.env.ADMIN_SECRET;
  return !!secret && key === secret;
}

async function approve(formData: FormData) {
  "use server";
  const id = formData.get("id");
  const key = formData.get("key");
  if (!(await isAuthorized(typeof key === "string" ? key : undefined))) return;
  const pool = getPool();
  await pool.query(
    `update orders set moderation_status = 'approved' where id = $1`,
    [id],
  );
}

async function reject(formData: FormData) {
  "use server";
  const id = formData.get("id");
  const key = formData.get("key");
  if (!(await isAuthorized(typeof key === "string" ? key : undefined))) return;
  const pool = getPool();
  await pool.query(
    `update orders set moderation_status = 'rejected' where id = $1`,
    [id],
  );
}

export default async function FoundingSupportersPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!(await isAuthorized(key))) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
        <p className="text-paper/60">
          Add <code>?key=YOUR_ADMIN_SECRET</code> to the URL to view this page.
        </p>
      </section>
    );
  }

  const pool = getPool();
  const { rows: pending } = await pool.query(
    `select id, email, supporter_name, created_at from orders
     where moderation_status = 'pending_review'
     order by created_at asc`,
  );
  const { rows: approved } = await pool.query(
    `select id, supporter_name, created_at from orders
     where moderation_status = 'approved'
     order by created_at desc
     limit 50`,
  );

  return (
    <section className="min-h-screen bg-ink px-6 py-16 text-paper md:px-16">
      <h1 className="m-0 mb-10 font-serif text-3xl font-semibold">
        Founding Supporters — Moderation
      </h1>

      <h2 className="m-0 mb-4 text-sm tracking-[0.1em] text-gold uppercase">
        Pending review ({pending.length})
      </h2>
      <div className="mb-16 flex flex-col gap-4">
        {pending.length === 0 && (
          <p className="text-sm text-paper/40">Nothing waiting.</p>
        )}
        {pending.map((row) => (
          <div
            key={row.id}
            className="flex flex-col gap-3 rounded border border-paper/12 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-serif text-lg">{row.supporter_name}</div>
              <div className="text-xs text-paper/40">
                {row.email} — {new Date(row.created_at).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-3">
              <form action={approve}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="key" value={key} />
                <button
                  type="submit"
                  className="rounded-full bg-garnet px-5 py-2 text-xs tracking-[0.08em] text-paper uppercase"
                >
                  Approve
                </button>
              </form>
              <form action={reject}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="key" value={key} />
                <button
                  type="submit"
                  className="rounded-full border border-paper/25 px-5 py-2 text-xs tracking-[0.08em] text-paper/70 uppercase"
                >
                  Reject
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <h2 className="m-0 mb-4 text-sm tracking-[0.1em] text-gold uppercase">
        Approved ({approved.length})
      </h2>
      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm text-paper/70">
        {approved.map((row) => (
          <li key={row.id}>{row.supporter_name}</li>
        ))}
      </ul>
    </section>
  );
}
