import StyledComponentsRegistry from 'components/StyledComponentsRegistry';

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
        </html>
    );
}
