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
    "Penalty": "Rigore",
    "Shots on Goal": "Tiri in Porta",
    "Shots off Goal": "Tiri Fuori",
    "Total Shots": "Tiri Totali",
    "Blocked Shots": "Tiri bloccati",
    "Shots insidebox": "Tiri da Dentro Area",
    "Shots outsidebox": "Tiri da Fuori Area",
    "Fouls": "Falli",
    "Corner Kicks": "Calci D'Angolo",
    "Offsides": "Fuorigioco",
    "Ball Possession": "Possesso Palla",
    "Yellow Cards": "Cartellino Giallo",
    "Red Cards": "Cartellino Rosso",
    "Goalkeeper Saves": "Parate del Portiere",
    "Total passes": "Passaggi Totali",
    "Passes accurate": "Passaggi Completati",
    "Passes %": "Percentuale Passaggi",
    "expected_goals": "xG",
    "goals_prevented": "xNG"
  };
  
  export function translate(text: string): string {
    return translations[text] ?? text; 
  }