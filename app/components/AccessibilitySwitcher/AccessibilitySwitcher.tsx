import { useAccessibility } from "~/context/AccessibilityContext";

export function AccessibilitySwitcher() {
  const { highContrast, setHighContrast, fontSize, setFontSize } = useAccessibility()

  return (
    <div className="flex gap-4 mb-4 items-center">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={highContrast}
          onChange={(e) => setHighContrast(e.target.checked)}
        />
        High Contrast Mode
      </label>

      <label className="flex items-center gap-2">
        Font Size:
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value as 'normal' | 'large')}
          className="border rounded p-1"
        >
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
      </label>
    </div>
  )
}