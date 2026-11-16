CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, role) 
    VALUES (
        new.id, new.email, new.raw_user_meta_data->>'first_name',
        new.raw_user_meta_data->>'last_name',
        CASE
          WHEN new.raw_user_meta_data->>'role' IN ('student', 'teacher')
          THEN new.raw_user_meta_data->>'role'
          ELSE 'student'
        END
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();