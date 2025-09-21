const translations: Record<string, string> = {
    "Goal Disallowed - offside": "Gol annullato - Fuorigioco",
    "Yellow Card": "Cartellino giallo",
    "Red Card": "Cartellino rosso",
    "Substitution": "Sostituzione",
    "Tripping": "Sgambetto",
    "Delay of game": "Rallentamento del gioco",
    "Foul": "Fallo",
    "Serious foul": "Brutto Fallo",
    "Roughing": "Eccesso di Foga",
    "Goal confirmed": "Gol Confermato",
    "Penalty": "Rigore"
  };
  
  export function translate(text: string): string {
    return translations[text] ?? text; 
  }