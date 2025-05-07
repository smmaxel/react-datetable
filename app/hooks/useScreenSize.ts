import { useEffect, useRef, useState } from "react";

const breakpoints = {
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  largeScreen: 1900,
}

type ScreenSize = {
  isMobile: boolean
  isTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
}

function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(window.innerWidth || 0)

  const widthRef = useRef<number>(width)

  const updateWidth = () => {
    if (widthRef.current !== window.innerWidth) {
      widthRef.current = window.innerWidth
      setWidth(widthRef.current)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  })

  return width
}

const calculateBrakepoints = (width: number): ScreenSize => ({
  isMobile: width < breakpoints.tablet,
  isTablet: width >= breakpoints.tablet && width < breakpoints.laptop,
  isLaptop: width >= breakpoints.laptop && width < breakpoints.desktop,
  isDesktop: width >= breakpoints.desktop,
})

export function useScreenSize() {
  const width = useWindowWidth()
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: true,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
  })

  useEffect(() => {
    setScreenSize(calculateBrakepoints(width))
  }, [width])

  return screenSize
}