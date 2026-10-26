-- Gallery sections: places, volunteering & events, study & work.
-- Existing photos stay unsorted (null) until moved in the admin panel.

alter table public.gallery
    add column if not exists category text
    check (category in ('places', 'volunteering', 'study_work'));
