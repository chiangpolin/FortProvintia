import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Fort Provintia</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
