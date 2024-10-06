// useModalContext.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useDisclosure, UseDisclosureProps } from '@nextui-org/modal';

// Интерфейс, описывающий возвращаемое значение useDisclosure
interface ModalContextType {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    return (
        <ModalContext.Provider
            value={{ isOpen, onOpen, onClose, onOpenChange }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
