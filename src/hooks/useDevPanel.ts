import { useEffect, useRef } from 'react'
import * as Tweakpane from 'tweakpane'
import Stats from 'stats.js'

interface PanelState {
  starCount: number
  starSpeed: number
  cameraSpeed: number
}

export function useDevPanel(initialState: PanelState, onStateChange: (state: PanelState) => void) {
  const paneRef = useRef<any>(null)
  const statsRef = useRef<Stats | null>(null)
  const stateRef = useRef(initialState)

  useEffect(() => {
    // Initialize Tweakpane
    const pane: any = new Tweakpane.Pane({
      title: 'Scene Settings',
      expanded: true,
    })

    // Add starfield controls
    pane.addBinding(stateRef.current, 'starCount', {
      min: 100,
      max: 5000,
      step: 100,
      label: 'Star Count',
    }).on('change', (ev: any) => {
      stateRef.current.starCount = ev.value
      onStateChange({ ...stateRef.current })
    })

    pane.addBinding(stateRef.current, 'starSpeed', {
      min: 0,
      max: 0.01,
      step: 0.0001,
      label: 'Star Speed',
    }).on('change', (ev: any) => {
      stateRef.current.starSpeed = ev.value
      onStateChange({ ...stateRef.current })
    })

    // Add separator
    pane.addSeparator()

    // Add camera controls
    pane.addBinding(stateRef.current, 'cameraSpeed', {
      min: 0.05,
      max: 1,
      step: 0.05,
      label: 'Camera Speed',
    }).on('change', (ev: any) => {
      stateRef.current.cameraSpeed = ev.value
      onStateChange({ ...stateRef.current })
    })

    paneRef.current = pane

    // Initialize Stats.js
    const stats = new Stats()
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom)
    stats.dom.style.position = 'fixed'
    stats.dom.style.left = '0'
    stats.dom.style.top = '0'
    stats.dom.style.zIndex = '100'
    statsRef.current = stats

    // Update stats every frame
    const updateStats = () => {
      stats.update()
      requestAnimationFrame(updateStats)
    }
    updateStats()

    // Position Tweakpane
    const paneContainer = document.querySelector('.tp-dfwv') as HTMLElement
    if (paneContainer) {
      paneContainer.style.position = 'fixed'
      paneContainer.style.right = '16px'
      paneContainer.style.top = '16px'
      paneContainer.style.zIndex = '100'
    }

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose()
      }
      if (statsRef.current) {
        document.body.removeChild(statsRef.current.dom)
      }
    }
  }, [onStateChange])

  return { paneRef, statsRef }
}
