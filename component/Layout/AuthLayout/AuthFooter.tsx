import React from 'react';

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-4 text-[11px] text-slate-400 font-medium border-t border-slate-100 bg-white">
      © {currentYear} Dominion City Marketplace. Secure Gateway Infrastructure.
    </footer>
  );
}