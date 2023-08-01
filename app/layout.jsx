import "@styles/globals.css"; // importing css
import { inter } from "./fonts"; // importing fonts

/* Components */
import Nav from "@components/Nav";
import Provider from "@components/Provider";

// Meta data in head
export const metadata = {
    title: "WHILT",
    description: "What have I learned today?",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={inter.variable}>
            <body>
                <Nav />
                <main className="main">
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
