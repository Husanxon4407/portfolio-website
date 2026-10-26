# Admin panel setup (Supabase)

The admin panel at **`/#/admin`** lets you add certificates, projects and gallery
photos from your phone or computer. Images are compressed in the browser and stored
in Supabase, and the site shows them right away, with no rebuild needed.

You only need to do this setup once.

## 1. Create the Supabase project

1. Go to <https://supabase.com>, sign in, and click **New project** (the free plan is enough).
2. Pick a name (e.g. `portfolio`), set a database password (save it somewhere), and choose a region close to you (e.g. Frankfurt).

## 2. Create your admin account

1. Go to **Authentication → Users → Add user → Create new user**.
2. Enter your email and a strong password, and tick **Auto Confirm User**.
3. Go to **Authentication → Sign In / Providers** and turn **off** "Allow new users to sign up".
   Only you can log in now.

## 3. Create the tables and storage

1. Open `supabase/schema.sql`. If your admin email is **not**
   `husanxonbahodirxonov@gmail.com`, change it in the `is_admin()` function at the top.
2. In Supabase, go to **SQL Editor → New query**, paste the whole file, and click **Run**.

This creates the `certificates`, `projects` and `gallery` tables and the public `media`
image bucket. It also adds the security rules: anyone can view, and only your account
can add, edit or delete. It also adds your two resume projects.

## 4. Connect the website

In Supabase, go to **Project Settings → API** and copy:

- **Project URL**
- **anon public** key

**For local development**, create a file `.env.local` in the project root:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

**For the live site**, go to GitHub → repository **Settings → Secrets and variables →
Actions → New repository secret** and add the same two values with the same names.
Then push any commit (or re-run the deploy workflow).

> The anon key is meant to be public, because the security rules protect your data. Never
> put the **service_role** key in the website.

## Using the admin panel

- Open `https://husanxon4407.github.io/portfolio-website/#/admin` and sign in.
- Pick a tab: **Certificates**, **Projects** or **Gallery**.
- Click **+ Add**, choose an image, fill in the details, and click **Save**.
  - **Gallery:** select several photos at once and they all upload straight away. Add captions later with **Edit**.
  - You can also drag images onto the page, or paste one with **Ctrl+V**.
- Use **↑ / ↓** to change the order, and **Edit** / **Delete** to manage items.
- **Certificates** and **Gallery** stay hidden on the site until they have at least one item.
  Projects you add replace the built-in list.
