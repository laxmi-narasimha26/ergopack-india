'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ContactPopup = dynamic(() => import('@/components/contact/ContactPopup'), { ssr: false });

interface ContactPopupContextType {
  openContactPopup: () => void;
  closeContactPopup: () => void;
  isOpen: boolean;
}

const ContactPopupContext = createContext<ContactPopupContextType | undefined>(undefined);

export function ContactPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const openContactPopup = () => setIsOpen(true);
  const closeContactPopup = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
    }
  }, [isOpen, hasOpened]);

  return (
    <ContactPopupContext.Provider value={{ openContactPopup, closeContactPopup, isOpen }}>
      {children}
      {hasOpened && <ContactPopup isOpen={isOpen} onClose={closeContactPopup} />}
    </ContactPopupContext.Provider>
  );
}

export function useContactPopup() {
  const context = useContext(ContactPopupContext);
  if (context === undefined) {
    throw new Error('useContactPopup must be used within a ContactPopupProvider');
  }
  return context;
}
