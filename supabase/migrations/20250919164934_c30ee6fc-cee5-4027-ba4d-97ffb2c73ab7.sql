-- Fix signup failure: allow GoTrue to create profiles and auto-create on user signup

-- 1) Ensure handle_new_user runs with elevated privileges and is idempotent
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 2) Create trigger to insert profile after a new auth user is created
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- 3) RLS policy to allow Supabase Auth service to insert into profiles during signup
--    (this is the role used by GoTrue when creating users)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'Auth admin can insert profiles'
  ) THEN
    DROP POLICY "Auth admin can insert profiles" ON public.profiles;
  END IF;
END $$;

CREATE POLICY "Auth admin can insert profiles"
ON public.profiles
FOR INSERT
TO supabase_auth_admin
WITH CHECK (true);

-- 4) Make sure the auth admin has table privileges (RLS still enforced)
GRANT INSERT ON public.profiles TO supabase_auth_admin;

-- 5) Keep updated_at fresh on updates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'update_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;
