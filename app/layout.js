import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Valentine's Maker",
  description: "Make beautiful cards for your valentine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'overflow-x-hidden'}>{children}</body>
    </html>
  );
}

// https://res.cloudinary.com/djcj1ulqo/image/upload/v1707583757/ligpr3i3ytf6t0ioo1p2.avif
// https://res.cloudinary.com/djcj1ulqo/image/upload/v1707583631/fozgdk8covkqkuv3lckk.avif