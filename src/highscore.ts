/**
 * Highscore-lista för spelet.
 */

export interface HighscoreEntry {
  name: string
  score: number
  date?: string
}

const STORAGE_KEY = 'game-highscore'
const MAX_ENTRIES = 10

export function getHighscoreList(): HighscoreEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
       return JSON.parse(stored) as HighscoreEntry[]
    }
  } catch {
    // Ignorera om localStorage inte finns eller är ogiltig
  }
  return []
}

export function addHighscore(entry: HighscoreEntry): HighscoreEntry[] {
  const list = getHighscoreList()
  list.push(entry)
  saveHighscoreList(list)
  return getHighscoreList()
}

export function saveHighscoreList(entries: HighscoreEntry[]): void {
  const sorted = [...entries]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ENTRIES)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted))
  } catch {
    // Ignorera om localStorage inte finns
  }
}
 
