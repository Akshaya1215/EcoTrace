export const getCurrentUser = () => {
  const role = localStorage.getItem('userRole') || 'seller';
  const profiles = {
    seller: {
      id: "seller_demo_001",
      role: "seller",
      name: "Demo Seller",
      email: "seller@ecotrace.com"
    },
    corporate: {
      id: "corporate_demo_001",
      role: "corporate",
      name: "EcoCorp Solutions",
      email: "sustainability@ecocorp.com"
    },
    recycler: {
      id: "recycler_demo_001",
      role: "recycler",
      name: "GreenCycle Pvt Ltd",
      email: "contact@greencycle.com"
    },
    admin: {
      id: "admin_demo_001",
      role: "admin",
      name: "Admin User",
      email: "admin@ecotrace.com"
    }
  };
  
  return profiles[role] || profiles.seller;
};

export const setCurrentRole = (role) => {
  localStorage.setItem('userRole', role);
};

export const logout = () => {
  localStorage.removeItem('userRole');
  window.location.href = '/';
};
