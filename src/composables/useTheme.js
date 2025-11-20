import { usePreferredDark, useStorage } from '@vueuse/core'
import { watch, computed } from 'vue'

// Provides a reactive isDark ref persisted to localStorage and synced with system preference.
export function useTheme() {
  const preferred = usePreferredDark()
  const stored = useStorage('fe_ptw_dark', null)

  // reactive computed that prefers stored user choice, otherwise system preference
  const isDark = computed({
    get() {
      return stored.value === null ? preferred.value : stored.value
    },
    set(v) {
      stored.value = !!v
      updateHtmlClass(!!v)
    },
  })

  function toggle() {
    isDark.value = !isDark.value
  }

  function updateHtmlClass(val) {
    const html = document.documentElement
    if (val) html.classList.add('dark')
    else html.classList.remove('dark')
  }

  // initialize html class and react to system preference changes only if user hasn't chosen
  updateHtmlClass(isDark.value)

  watch(preferred, (v) => {
    if (stored.value === null) updateHtmlClass(v)
  })

  function setDark(v) {
    isDark.value = !!v
  }

  return { isDark, toggle, setDark }
}
