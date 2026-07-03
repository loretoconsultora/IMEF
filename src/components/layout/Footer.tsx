export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-black/5">
      <div className="max-w-6xl mx-auto text-center text-xs text-tinta/50">
        <p>
          © {new Date().getFullYear()} Instituto Mexicano de Excelencia
          Formativa (IMEF). Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
