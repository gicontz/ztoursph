import { usePathname } from 'next/navigation';

export function useActivePath(): (path: string) => boolean[] {
    const pathname = usePathname();
  
    const checkActivePath = (path: string) => {
      if (path === '/' && pathname !== path) {
        return [false, false];
      }
      return [pathname?.startsWith(path), pathname?.includes(path.replace('#', ''))];
    }
  
    return checkActivePath;
}