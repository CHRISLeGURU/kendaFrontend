/**
 * Wallet Service
 * Gère toutes les opérations liées au portefeuille
 */

import type {
    Wallet,
    Transaction,
    ApiResponse,
    PaginatedResponse
} from '@/types';

// TODO: Import Supabase client when ready
// import { supabase } from '@/lib/supabase';

/**
 * Obtient le portefeuille de l'utilisateur
 */
export async function getWallet(userId: string): Promise<ApiResponse<Wallet>> {
    // TODO: Connect to Supabase
    // const { data, error } = await supabase
    //     .from('wallets')
    //     .select('*')
    //     .eq('user_id', userId)
    //     .single();
    //
    // If no wallet exists, create one
    // if (!data && !error) {
    //     return createWallet(userId);
    // }

    console.warn('[walletService] getWallet: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Crée un nouveau portefeuille
 */
export async function createWallet(userId: string): Promise<ApiResponse<Wallet>> {
    // TODO: Connect to Supabase
    // const { data, error } = await supabase
    //     .from('wallets')
    //     .insert({
    //         user_id: userId,
    //         balance_fc: 0,
    //         balance_ada: 0
    //     })
    //     .select()
    //     .single();

    console.warn('[walletService] createWallet: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Connecte un portefeuille Cardano
 */
export async function connectCardanoWallet(
    userId: string,
    cardanoAddress: string
): Promise<ApiResponse<Wallet>> {
    // TODO: Connect to Supabase
    // const { data, error } = await supabase
    //     .from('wallets')
    //     .update({
    //         cardano_address: cardanoAddress,
    //         is_connected: true
    //     })
    //     .eq('user_id', userId)
    //     .select()
    //     .single();

    console.warn('[walletService] connectCardanoWallet: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Obtient l'historique des transactions
 */
export async function getTransactions(
    walletId: string,
    options?: { page?: number; limit?: number }
): Promise<PaginatedResponse<Transaction>> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 20;

    // TODO: Connect to Supabase
    // const { data, error, count } = await supabase
    //     .from('transactions')
    //     .select('*', { count: 'exact' })
    //     .eq('wallet_id', walletId)
    //     .order('created_at', { ascending: false })
    //     .range((page - 1) * limit, page * limit - 1);

    console.warn('[walletService] getTransactions: Not connected to backend');

    return {
        data: [],
        total: 0,
        page,
        limit,
        has_more: false
    };
}

/**
 * Recharge le portefeuille (top-up)
 */
export async function topUp(
    walletId: string,
    amount: number,
    currency: 'FC' | 'ADA'
): Promise<ApiResponse<Transaction>> {
    // TODO: Connect to payment gateway + Supabase
    // 1. Process payment with Mobile Money or Cardano
    // 2. Create transaction record
    // 3. Update wallet balance
    //
    // const { data: tx, error: txError } = await supabase
    //     .from('transactions')
    //     .insert({
    //         wallet_id: walletId,
    //         type: 'TOP_UP',
    //         amount,
    //         currency,
    //         status: 'COMPLETED'
    //     })
    //     .select()
    //     .single();
    //
    // await supabase.rpc('increment_wallet_balance', {
    //     wallet_id: walletId,
    //     amount,
    //     currency
    // });

    console.warn('[walletService] topUp: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Retrait du portefeuille (pour chauffeurs)
 */
export async function withdraw(
    walletId: string,
    amount: number,
    currency: 'FC' | 'ADA',
    destination: string // Mobile Money number or Cardano address
): Promise<ApiResponse<Transaction>> {
    // TODO: Connect to payment gateway + Supabase
    // 1. Verify sufficient balance
    // 2. Process withdrawal
    // 3. Create transaction record
    // 4. Update wallet balance

    console.warn('[walletService] withdraw: Not connected to backend');

    return {
        data: null,
        error: 'Backend not connected',
        success: false
    };
}

/**
 * Obtient le taux de change ADA/FC
 */
export async function getExchangeRate(): Promise<ApiResponse<{ ada_to_fc: number }>> {
    // Taux fixe pour le développement
    // 1 ADA = 1500 FC
    return {
        data: { ada_to_fc: 1500 },
        error: null,
        success: true
    };
}
