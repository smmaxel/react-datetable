import { useEffect, useRef, useState } from "react";

const breakpoints = {
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
}

export function useScreenSize() {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return {
    isMobile: width < breakpoints.tablet,
    isTablet: width >= breakpoints.tablet && width < breakpoints.laptop,
    isLaptop: width >= breakpoints.laptop && width < breakpoints.desktop,
    isDesktop: width >= breakpoints.desktop,
  }
}