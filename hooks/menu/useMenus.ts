import { useCallback } from 'react';
import { Menu } from '../../types/menu';
import { mutate } from 'swr';

export const MENU_KEY = '/menus';

const useMenus = () => {
    const initializeMenus = useCallback((menus: Menu[]) => {
        mutate(MENU_KEY, menus);
    }, []);

    return {
        initializeMenus,
    };
};
export default useMenus;
