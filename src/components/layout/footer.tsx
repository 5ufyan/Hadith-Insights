export function Footer() {
  return (
    <footer className="bg-card shadow-sm py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Hadith Insights. All rights reserved.</p>
        <p className="text-sm mt-1">Discover the wisdom of Sahih Bukhari.</p>
      </div>
    </footer>
  );
}
