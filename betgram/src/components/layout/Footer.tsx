export default function Footer() {
    return (
      <footer className="w-full mt-10 p-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Betgram. Tutti i diritti riservati.</p>
          
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
            <a href="/terms" className="hover:underline">
              Termini
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    );
  }
  