-- Add the "Social life" gallery album.

alter table public.gallery drop constraint if exists gallery_category_check;

alter table public.gallery
    add constraint gallery_category_check
    check (category in ('places', 'volunteering', 'study_work', 'social'));
