import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

type Vendor = {
  id: string;
  user_id: string;
  name: string;
  industry: string | null;
  website: string | null;
  contact_email: string | null;
  risk_score: number | null;
  risk_level: string | null;
  compliance_status: string | null;
  last_assessment_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type VendorInsert = Omit<Vendor, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
type VendorUpdate = Partial<Omit<Vendor, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

const VENDORS_STORAGE_KEY = 'vendorsoluce_vendors';

export const useVendors = () => {
  const { user } = useAuth();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendors = async () => {
    if (!user) {
      setVendors([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Get vendors from localStorage
      const storedVendors = localStorage.getItem(VENDORS_STORAGE_KEY);
      if (storedVendors) {
        const allVendors: Vendor[] = JSON.parse(storedVendors);
        
        // Filter vendors for current user
        const userVendors = allVendors.filter(vendor => vendor.user_id === user.id);
        
        // Sort by created_at in descending order (newest first)
        userVendors.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        setVendors(userVendors);
      } else {
        setVendors([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const createVendor = async (vendorData: Omit<VendorInsert, 'user_id'>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      // Generate a unique ID
      const id = `vendor-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Create new vendor object with timestamps
      const newVendor: Vendor = {
        ...vendorData,
        id,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Get existing vendors from localStorage
      const storedVendors = localStorage.getItem(VENDORS_STORAGE_KEY);
      const allVendors: Vendor[] = storedVendors ? JSON.parse(storedVendors) : [];
      
      // Add new vendor
      allVendors.push(newVendor);
      
      // Save back to localStorage
      localStorage.setItem(VENDORS_STORAGE_KEY, JSON.stringify(allVendors));
      
      // Update state
      setVendors(prev => [newVendor, ...prev]);
      
      return newVendor;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create vendor');
      throw err;
    }
  };

  const updateVendor = async (id: string, vendorData: VendorUpdate) => {
    try {
      // Get existing vendors from localStorage
      const storedVendors = localStorage.getItem(VENDORS_STORAGE_KEY);
      if (!storedVendors) {
        throw new Error('No vendors found in storage');
      }
      
      const allVendors: Vendor[] = JSON.parse(storedVendors);
      
      // Find the vendor to update
      const vendorIndex = allVendors.findIndex(v => v.id === id && v.user_id === user?.id);
      if (vendorIndex === -1) {
        throw new Error('Vendor not found');
      }
      
      // Update the vendor
      const updatedVendor: Vendor = {
        ...allVendors[vendorIndex],
        ...vendorData,
        updated_at: new Date().toISOString()
      };
      
      allVendors[vendorIndex] = updatedVendor;
      
      // Save back to localStorage
      localStorage.setItem(VENDORS_STORAGE_KEY, JSON.stringify(allVendors));
      
      // Update state
      setVendors(prev => prev.map(vendor => 
        vendor.id === id ? updatedVendor : vendor
      ));
      
      return updatedVendor;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update vendor');
      throw err;
    }
  };

  const deleteVendor = async (id: string) => {
    try {
      // Get existing vendors from localStorage
      const storedVendors = localStorage.getItem(VENDORS_STORAGE_KEY);
      if (!storedVendors) return;
      
      const allVendors: Vendor[] = JSON.parse(storedVendors);
      
      // Remove the specified vendor
      const updatedVendors = allVendors.filter(vendor => 
        !(vendor.id === id && vendor.user_id === user?.id)
      );
      
      // Save back to localStorage
      localStorage.setItem(VENDORS_STORAGE_KEY, JSON.stringify(updatedVendors));
      
      // Update state
      setVendors(prev => prev.filter(vendor => vendor.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete vendor');
      throw err;
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [user]);

  return {
    vendors,
    loading,
    error,
    createVendor,
    updateVendor,
    deleteVendor,
    refetch: fetchVendors,
  };
};