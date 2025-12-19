/**
 * Driver Service
 * Gère toutes les opérations liées aux chauffeurs
 */

import type {
    DriverProfile,
    DriverDocument,
    DriverLocation,
    DriverStats,
    DriverApplicationData,
    ApiResponse,
    PaginatedResponse,
    Ride
} from '@/types';

import { createClient } from '@/lib/supabase/client';

/**
 * Obtient le profil chauffeur de l'utilisateur connecté
 */
export async function getDriverProfile(userId: string): Promise<ApiResponse<DriverProfile>> {
    // TODO: Connect to Supabase
    // const { data, error } = await supabase
    //     .from('driver_profiles')
    //     .select('*')
    //     .eq('user_id', userId)
    //     .single();

    console.warn('[driverService] getDriverProfile: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Soumet une candidature chauffeur
 */
export async function submitDriverApplication(
    userId: string,
    data: DriverApplicationData
): Promise<ApiResponse<DriverProfile>> {
    // TODO: Connect to Supabase
    // 1. Create driver profile
    // const { data: profile, error: profileError } = await supabase
    //     .from('driver_profiles')
    //     .insert({
    //         user_id: userId,
    //         vehicle_type: data.vehicle_type,
    //         vehicle_brand: data.vehicle_brand,
    //         vehicle_model: data.vehicle_model,
    //         license_plate: data.license_plate,
    //         vehicle_color: data.vehicle_color,
    //         status: 'PENDING'
    //     })
    //     .select()
    //     .single();
    //
    // 2. Upload documents to storage
    // 3. Create document records

    console.warn('[driverService] submitDriverApplication: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Met à jour le statut en ligne/hors ligne
 */
export async function updateOnlineStatus(
    driverProfileId: string,
    isOnline: boolean
): Promise<ApiResponse<DriverProfile>> {
    // TODO: Connect to Supabase
    // const { data, error } = await supabase
    //     .from('driver_profiles')
    //     .update({ is_online: isOnline })
    //     .eq('id', driverProfileId)
    //     .select()
    //     .single();

    console.warn('[driverService] updateOnlineStatus: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Met à jour la position GPS du chauffeur
 */
export async function updateLocation(
    driverProfileId: string,
    latitude: number,
    longitude: number
): Promise<ApiResponse<null>> {
    // TODO: Connect to Supabase
    // const { error } = await supabase
    //     .from('driver_profiles')
    //     .update({
    //         current_latitude: latitude,
    //         current_longitude: longitude,
    //         last_location_update: new Date().toISOString()
    //     })
    //     .eq('id', driverProfileId);

    console.warn('[driverService] updateLocation: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Obtient les statistiques réelles du chauffeur depuis Supabase
 */
export async function getDriverStats(userId: string): Promise<ApiResponse<DriverStats>> {
    try {
        const supabase = createClient();
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // 1. Get Driver Profile (for rating and total rides)
        const { data: profile } = await (supabase
            .from('driver_profiles') as any)
            .select('rating, total_rides')
            .eq('user_id', userId)
            .single();

        // 2. Get Today's Completed Rides (for earnings and count)
        const { data: todayRides } = await (supabase
            .from('rides') as any)
            .select('price')
            .eq('driver_id', userId)
            .eq('status', 'COMPLETED')
            .gte('completed_at', startOfToday.toISOString());

        const todayEarnings = todayRides?.reduce((sum: number, r: any) => sum + (r.price || 0), 0) || 0;
        const todayCount = todayRides?.length || 0;

        // 3. Get All Completed Rides for total earnings calculation if needed
        const { data: allRides } = await (supabase
            .from('rides') as any)
            .select('price')
            .eq('driver_id', userId)
            .eq('status', 'COMPLETED');

        const totalEarnings = allRides?.reduce((sum: number, r: any) => sum + (r.price || 0), 0) || 0;

        return {
            data: {
                today_earnings: todayEarnings,
                today_rides: todayCount,
                total_earnings: totalEarnings,
                total_rides: profile?.total_rides || 0,
                average_rating: profile?.rating || 0,
                week_earnings: 0,
                month_earnings: 0,
                completion_rate: 100
            },
            success: true,
            error: null
        };
    } catch (error) {
        console.error("Error fetching driver stats:", error);
        return { success: false, error: "Initialisation des stats échouée", data: null as any };
    }
}

/**
 * Obtient l'historique des courses du chauffeur
 */
export async function getDriverRideHistory(
    driverId: string,
    options?: { page?: number; limit?: number }
): Promise<PaginatedResponse<Ride>> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;

    // TODO: Connect to Supabase
    // const { data, error, count } = await supabase
    //     .from('rides')
    //     .select('*, passenger:passenger_id(full_name, avatar_url)', { count: 'exact' })
    //     .eq('driver_id', driverId)
    //     .order('completed_at', { ascending: false })
    //     .range((page - 1) * limit, page * limit - 1);

    console.warn('[driverService] getDriverRideHistory: Not connected to backend');

    return {
        data: [],
        total: 0,
        page,
        limit,
        has_more: false
    };
}

/**
 * Obtient les documents du chauffeur
 */
export async function getDriverDocuments(
    driverProfileId: string
): Promise<ApiResponse<DriverDocument[]>> {
    // TODO: Connect to Supabase
    // const { data, error } = await supabase
    //     .from('driver_documents')
    //     .select('*')
    //     .eq('driver_profile_id', driverProfileId)
    //     .order('created_at', { ascending: false });

    console.warn('[driverService] getDriverDocuments: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Upload un document
 */
export async function uploadDocument(
    driverProfileId: string,
    documentType: DriverDocument['document_type'],
    file: File
): Promise<ApiResponse<DriverDocument>> {
    // TODO: Connect to Supabase Storage
    // const filePath = `${driverProfileId}/${documentType}_${Date.now()}.${file.name.split('.').pop()}`;
    //
    // const { error: uploadError } = await supabase.storage
    //     .from('driver-documents')
    //     .upload(filePath, file);
    //
    // if (uploadError) return { data: null, error: uploadError.message, success: false };
    //
    // const { data: { publicUrl } } = supabase.storage
    //     .from('driver-documents')
    //     .getPublicUrl(filePath);
    //
    // const { data, error } = await supabase
    //     .from('driver_documents')
    //     .insert({
    //         driver_profile_id: driverProfileId,
    //         document_type: documentType,
    //         file_url: publicUrl,
    //         status: 'PENDING'
    //     })
    //     .select()
    //     .single();

    console.warn('[driverService] uploadDocument: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Met à jour les préférences du chauffeur
 */
export async function updatePreferences(
    driverProfileId: string,
    preferences: Partial<Pick<DriverProfile, 'accept_long_distance' | 'accept_cash_payment' | 'accept_crypto_payment'>>
): Promise<ApiResponse<DriverProfile>> {
    // TODO: Connect to Supabase
    // const { data, error } = await supabase
    //     .from('driver_profiles')
    //     .update(preferences)
    //     .eq('id', driverProfileId)
    //     .select()
    //     .single();

    console.warn('[driverService] updatePreferences: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Obtient les chauffeurs à proximité
 */
export async function getNearbyDrivers(
    latitude: number,
    longitude: number,
    radiusKm: number = 5
): Promise<ApiResponse<DriverLocation[]>> {
    // TODO: Connect to Supabase with PostGIS
    // This requires a custom SQL function using ST_DWithin
    // const { data, error } = await supabase.rpc('get_nearby_drivers', {
    //     lat: latitude,
    //     lng: longitude,
    //     radius_km: radiusKm
    // });

    console.warn('[driverService] getNearbyDrivers: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Souscrit aux nouvelles demandes de course
 */
export function subscribeToRideRequests(
    city: string,
    callback: (ride: Ride) => void
): () => void {
    // TODO: Connect to Supabase Realtime
    // const subscription = supabase
    //     .channel(`ride_requests:${city}`)
    //     .on('postgres_changes', {
    //         event: 'INSERT',
    //         schema: 'public',
    //         table: 'rides',
    //         filter: `status=eq.SEARCHING`
    //     }, (payload) => callback(payload.new as Ride))
    //     .subscribe();
    //
    // return () => subscription.unsubscribe();

    console.warn('[driverService] subscribeToRideRequests: Not connected to backend');

    return () => { };
}
