export function Footer() {
  return (
    <footer className="bg-card shadow-sm py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Tafheem-e-Sunnah. All rights reserved.</p>
        <p className="text-sm mt-1">Important Note: This is an AI model so double check the Hadiths as it can make mistakes</p>
      </div>
    </footer>
  );
}
