import { useState } from 'react';
import { Container, Text, ActionIcon, Paper, Anchor } from '@mantine/core';
import { IconUser, IconBrandTelegram, IconMail } from '@tabler/icons-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MenuItem = ({ children, onClick, to }) => {
    const [hovered, setHovered] = useState(false);
    const style = {
        padding: '12px 16px',
        cursor: 'pointer',
        borderBottom: '1px solid #f1f3f5',
        backgroundColor: hovered ? '#f8f9fa' : 'white', // Light gray on hover
        color: 'black',
        display: 'block',
        textDecoration: 'none'
    };

    const content = (
        <div
            style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            {children}
        </div>
    );

    if (to) {
        return (
            <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                {content}
            </Link>
        );
    }

    return content;
};

function Layout() {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const location = useLocation();

    const isInstructionPage = location.pathname === '/instruction';
    const isTariffsPage = location.pathname === '/tariffs';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
            {/* Top Header */}
            <div style={{ background: 'white', borderBottom: '1px solid #dee2e6', padding: '16px 0' }}>
                <Container size="lg">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Text fw={700} size="xl">BoostLab</Text>
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Text size="sm" fw={500}>Standart</Text>
                                <Text size="sm" c="dimmed">₽46</Text>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <ActionIcon size="lg" radius="xl" variant="filled" color="blue" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                                    <IconUser size={20} />
                                </ActionIcon>
                                {profileMenuOpen && (
                                    <Paper shadow="md" style={{ position: 'absolute', top: '50px', right: 0, minWidth: '200px', zIndex: 1000, overflow: 'hidden' }}>
                                        {isTariffsPage ? (
                                            <>
                                                <MenuItem to="/" onClick={() => setProfileMenuOpen(false)}>Дашборд</MenuItem>
                                                <MenuItem to="/instruction" onClick={() => setProfileMenuOpen(false)}>Инструкция</MenuItem>
                                            </>
                                        ) : isInstructionPage ? (
                                            <>
                                                <MenuItem to="/" onClick={() => setProfileMenuOpen(false)}>Дашборд</MenuItem>
                                                <MenuItem to="/tariffs" onClick={() => setProfileMenuOpen(false)}>Тарифы</MenuItem>
                                            </>
                                        ) : (
                                            <>
                                                <MenuItem to="/instruction" onClick={() => setProfileMenuOpen(false)}>Инструкция</MenuItem>
                                                <MenuItem to="/tariffs" onClick={() => setProfileMenuOpen(false)}>Тарифы</MenuItem>
                                            </>
                                        )}
                                        <div
                                            style={{ padding: '12px 16px', cursor: 'pointer' }}
                                            onClick={() => setProfileMenuOpen(false)}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                                        >
                                            Выход
                                        </div>
                                    </Paper>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>

            {/* Footer */}
            <div style={{ background: 'white', borderTop: '1px solid #dee2e6', padding: '30px 0', marginTop: 'auto' }}>
                <Container size="lg">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                        <Text c="#868e96" size="sm">© 2025 BoostLab. Все права защищены.</Text>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <IconBrandTelegram size={18} color="#868e96" />
                                <Anchor href="https://t.me/boostlab_help" target="_blank" c="#868e96" size="sm" underline="hover">@boostlab_help</Anchor>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <IconMail size={18} color="#868e96" />
                                <Anchor href="mailto:support@boostlab.one" c="#868e96" size="sm" underline="hover">support@boostlab.one</Anchor>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Layout;
