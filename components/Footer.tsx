export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20 pb-12">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-teal-100/30 text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} Black Pearl. All rights reserved.
        </p>
      </div>
    </footer>
  );
}