-- Add SpeakUp and RoadGuard AI as the first two featured projects,
-- and push the existing projects below them.
-- Safe to run more than once.

delete from public.projects where title in ('SpeakUp', 'RoadGuard AI');

update public.projects set sort_order = 3 where title = 'Portfolio Website';
update public.projects set sort_order = 4 where title = 'UzChess';

insert into public.projects
    (title, description_en, description_uz, description_ru, stack, code_url, live_url, sort_order)
values
    (
        'SpeakUp',
        'A web app for practising all four parts of the Multilevel (CEFR) speaking exam — real exam questions, exam timers, voice recording, an AI coach powered by Google Gemini, games and a personal progress dashboard.',
        'Multilevel (CEFR) speaking imtihonining toʻrtala qismini mashq qilish uchun veb-ilova — haqiqiy imtihon savollari, taymerlar, ovoz yozish, Google Gemini asosidagi AI murabbiy, oʻyinlar va shaxsiy natijalar paneli.',
        'Веб-приложение для подготовки ко всем четырём частям устного экзамена Multilevel (CEFR): реальные вопросы, таймеры, запись голоса, ИИ-коуч на базе Google Gemini, игры и личная панель прогресса.',
        array['React', 'React Router', 'Supabase', 'Gemini AI', 'Vite'],
        null,
        'https://speakup-multilevel.vercel.app',
        1
    ),
    (
        'RoadGuard AI',
        'A hackathon project that detects traffic events and anticipates accidents from a fixed CCTV camera. The site explains the system, shows sample results, and runs a live demo on a clip the visitor uploads.',
        'Statsionar CCTV kamerasidan yoʻl hodisalarini aniqlab, baxtsiz hodisalarni oldindan bashorat qiluvchi hakaton loyihasi. Sayt tizimni tushuntiradi, natija namunalarini koʻrsatadi va tashrifchi yuklagan videoni jonli tahlil qiladi.',
        'Хакатон-проект, который распознаёт дорожные события и прогнозирует аварии с неподвижной камеры видеонаблюдения. Сайт объясняет систему, показывает примеры результатов и анализирует загруженный посетителем ролик в реальном времени.',
        array['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
        'https://github.com/Husanxon4407/roadguard-ai',
        'https://husanxon4407.github.io/roadguard-ai/',
        2
    );
