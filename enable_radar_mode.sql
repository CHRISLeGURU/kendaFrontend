-- POLICY FOR GLOBAL RIDE BROADCASTING (RADAR MODE)

-- 1. Drop potentially conflicting or restrictive policies
DROP POLICY IF EXISTS "Rides: Chauffeurs voient les courses disponibles" ON public.rides;

-- 2. Create a permissive policy for Drivers
-- This allows any user with role 'DRIVER' to see ALL rides that are 'SEARCHING'.
-- We removed the 'is_online' check to ensure they receive notifications even if status is not perfectly synced.
CREATE POLICY "Rides: Chauffeurs voient les courses disponibles"
ON public.rides
FOR SELECT
TO authenticated
USING (
  status = 'SEARCHING' 
  AND EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() 
    AND role = 'DRIVER'
  )
);

-- Confirmation
COMMENT ON POLICY "Rides: Chauffeurs voient les courses disponibles" ON public.rides IS 'Permet aux chauffeurs de voir les courses en attente (Radar Mode)';
