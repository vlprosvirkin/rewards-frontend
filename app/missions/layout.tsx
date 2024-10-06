'use client';

import Header from '@/components/header';

import styles from './styles.module.css';

export default function MissionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className={styles.missions_bg}>
                <div className={styles.content}>{children}</div>
            </div>
        </>
    );
}
