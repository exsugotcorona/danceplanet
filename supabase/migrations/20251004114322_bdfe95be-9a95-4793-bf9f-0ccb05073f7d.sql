-- Create courses table
CREATE TABLE public.courses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  duration text NOT NULL,
  level text NOT NULL,
  thumbnail text NOT NULL,
  instructor text NOT NULL,
  students integer NOT NULL DEFAULT 0,
  rating numeric NOT NULL DEFAULT 5.0,
  features text[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create course_lessons table
CREATE TABLE public.course_lessons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  video_url text NOT NULL,
  order_index integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  original_price numeric,
  image text NOT NULL,
  category text NOT NULL,
  colors text[] NOT NULL DEFAULT '{}',
  sizes text[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access for all
CREATE POLICY "Courses are viewable by everyone"
ON public.courses
FOR SELECT
USING (true);

CREATE POLICY "Course lessons are viewable by everyone"
ON public.course_lessons
FOR SELECT
USING (true);

CREATE POLICY "Products are viewable by everyone"
ON public.products
FOR SELECT
USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample courses
INSERT INTO public.courses (slug, title, description, price, duration, level, thumbnail, instructor, students, rating, features) VALUES
('beginner-jive-basics', 'Beginner Jive Basics', 'Master the fundamentals of Jive dance with step-by-step guidance from professional instructors. Perfect for complete beginners!', 2999, '4 weeks', 'Beginner', '/placeholder.svg', 'Sarah Johnson', 1234, 4.9, ARRAY['Lifetime access', 'Certificate of completion', '20+ video lessons', 'Practice materials']),
('intermediate-salsa', 'Intermediate Salsa', 'Take your Salsa skills to the next level with advanced techniques and partner work.', 3499, '6 weeks', 'Intermediate', '/placeholder.svg', 'Carlos Rodriguez', 856, 4.8, ARRAY['Lifetime access', 'Certificate of completion', '30+ video lessons', 'Partner practice guides']),
('advanced-contemporary', 'Advanced Contemporary', 'Explore complex contemporary dance movements and choreography for experienced dancers.', 3999, '8 weeks', 'Advanced', '/placeholder.svg', 'Emma Williams', 542, 5.0, ARRAY['Lifetime access', 'Certificate of completion', '40+ video lessons', 'Choreography notes']);

-- Insert sample course lessons (using the slug to find course_id)
INSERT INTO public.course_lessons (course_id, title, description, duration, video_url, order_index)
SELECT id, 'Introduction to Jive', 'Learn the basic steps and rhythm of Jive dance.', '15:30', 'https://www.youtube.com/embed/kQ25jdxa_Rs', 1
FROM public.courses WHERE slug = 'beginner-jive-basics';

INSERT INTO public.course_lessons (course_id, title, description, duration, video_url, order_index)
SELECT id, 'Basic Footwork', 'Master the fundamental footwork patterns.', '20:45', 'https://www.youtube.com/embed/kQ25jdxa_Rs', 2
FROM public.courses WHERE slug = 'beginner-jive-basics';

INSERT INTO public.course_lessons (course_id, title, description, duration, video_url, order_index)
SELECT id, 'Partner Connection', 'Learn how to connect with your dance partner.', '18:20', 'https://www.youtube.com/embed/kQ25jdxa_Rs', 3
FROM public.courses WHERE slug = 'beginner-jive-basics';

INSERT INTO public.course_lessons (course_id, title, description, duration, video_url, order_index)
SELECT id, 'Complex Sequences', 'Learn to master intricate choreographic sequences.', '30:15', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 4
FROM public.courses WHERE slug = 'beginner-jive-basics';

-- Insert sample products
INSERT INTO public.products (name, price, original_price, image, category, colors, sizes) VALUES
('Dance Premium T-Shirt', 1299, 1599, '/placeholder.svg', 'clothing', ARRAY['Black', 'White', 'Blue', 'Red'], ARRAY['S', 'M', 'L', 'XL']),
('Performance Hoodie', 2499, 2999, '/placeholder.svg', 'clothing', ARRAY['Black', 'Gray', 'Navy'], ARRAY['S', 'M', 'L', 'XL']),
('Dance Studio Water Bottle', 499, NULL, '/placeholder.svg', 'accessories', ARRAY['Clear', 'Black', 'Pink'], ARRAY['One Size']),
('Professional Dance Bag', 1999, 2499, '/placeholder.svg', 'accessories', ARRAY['Black', 'Pink', 'Blue'], ARRAY['One Size']);