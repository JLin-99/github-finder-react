export default function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="footer p-10 footer-center">
      <div>
        <p>Copyright &copy; {footerYear} All rights reserved</p>
      </div>
    </footer>
  );
}
