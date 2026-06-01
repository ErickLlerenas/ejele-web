-- Panel admin: incluir profiles.phone en get_admin_dashboard_data.
-- Ejecutar en Supabase SQL Editor si no usas migraciones automáticas.

DROP FUNCTION IF EXISTS public.get_admin_dashboard_data();

CREATE FUNCTION public.get_admin_dashboard_data()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email text;
BEGIN
  user_email := lower(coalesce(auth.jwt() ->> 'email', ''));

  IF user_email NOT IN (
    'dev.llerenas@gmail.com',
    'adrianhernandezgomez896@gmail.com',
    'llere1997@gmail.com',
    'yesicaselene15@gmail.com'
  ) THEN
    RAISE EXCEPTION 'No autorizado';
  END IF;

  RETURN json_build_object(
    'profiles',
    coalesce(
      (
        SELECT json_agg(
          json_build_object(
            'id', p.id,
            'email', p.email,
            'phone', p.phone,
            'created_at', p.created_at
          )
          ORDER BY p.created_at DESC
        )
        FROM public.profiles p
      ),
      '[]'::json
    ),
    'restaurants',
    coalesce(
      (
        SELECT json_agg(
          json_build_object(
            'id', r.id,
            'owner_id', r.owner_id,
            'name', r.name,
            'created_at', r.created_at,
            'subscription_status', r.subscription_status,
            'subscription_expiry', r.subscription_expiry,
            'invoice_credits', r.invoice_credits,
            'facturapi_is_ready', coalesce(r.facturapi_is_ready, false),
            'total_orders_created', coalesce(r.total_orders_created, 0),
            'total_products_created', coalesce(r.total_products_created, 0),
            'last_active_at', r.last_active_at,
            'app_version', r.app_version,
            'os_version', r.os_version
          )
          ORDER BY r.created_at DESC
        )
        FROM public.restaurants r
      ),
      '[]'::json
    )
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_data() TO authenticated;
