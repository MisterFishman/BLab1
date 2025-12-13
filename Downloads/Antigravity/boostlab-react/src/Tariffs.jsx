
import { Container, Title, Text, Button, Paper, Badge, SimpleGrid, Group, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck, IconStar, IconHelp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function Tariffs() {
    return (
        <Container size="lg" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <Title order={1} mb="md">Тарифы</Title>

            <Paper shadow="xs" mb={60} style={{ overflow: 'hidden' }}>
                <div
                    style={{
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Text fw={500}>Тариф ПРЕМИУМ</Text>
                        <Badge color="green" size="xs" tt="uppercase" radius="sm">ПОДКЛЮЧЕНО</Badge>
                    </div>
                </div>
            </Paper>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="30px" verticalSpacing="30px">
                {/* Basic Plan */}
                <Paper withBorder shadow="sm" p="30px" radius="md" style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text fw={700} size="24px" mb="xs">Базовый</Text>
                    <Text c="dimmed" size="sm" mb="30px">Для старта продаж</Text>

                    <Group align="flex-end" gap="4px" mb="30px">
                        <Text fw={700} style={{ fontSize: '48px', lineHeight: 1 }}>119</Text>
                        <Text fw={500} c="dimmed" size="18px" mb={6} ml={4}>₽ /месяц</Text>
                    </Group>

                    <Button fullWidth variant="default" radius="md" size="lg" mb="30px" styles={{ root: { borderColor: '#dee2e6' } }}>
                        Выбрать тариф
                    </Button>

                    <List
                        spacing="md"
                        size="md"
                        center
                        icon={
                            <IconCheck style={{ width: rem(20), height: rem(20) }} color="#2b8a3e" />
                        }
                    >
                        <List.Item>Отчет Начисления</List.Item>
                        <List.Item>Отчет Товары</List.Item>
                        <List.Item>Отчет Возвраты</List.Item>
                        <List.Item>Отчет Остатки</List.Item>
                    </List>
                </Paper>

                {/* Premium Plan */}
                <Paper withBorder shadow="sm" p="30px" radius="md" style={{ borderColor: '#2b8a3e', borderWidth: 2, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)' }}>
                        <Badge color="green" size="lg" radius="md" leftSection={<IconStar size={14} style={{ marginTop: '4px' }} />} styles={{ root: { paddingLeft: 15, paddingRight: 15, height: 32 } }}>
                            Популярный
                        </Badge>
                    </div>

                    <Text fw={700} size="24px" mb="xs" mt="xs">Премиум</Text>
                    <Text c="dimmed" size="sm" mb="30px">Максимальные возможности</Text>

                    <Group align="flex-end" gap="4px" mb="30px">
                        <Text fw={700} style={{ fontSize: '48px', lineHeight: 1 }}>169</Text>
                        <Text fw={500} c="dimmed" size="18px" mb={6} ml={4}>₽ /месяц</Text>
                    </Group>

                    <Button fullWidth color="green" radius="md" size="lg" mb="30px">
                        Выбрать тариф
                    </Button>

                    <List
                        spacing="md"
                        size="md"
                        center
                        icon={
                            <IconCheck style={{ width: rem(20), height: rem(20) }} color="#2b8a3e" />
                        }
                    >
                        <List.Item>
                            <Group gap={6}>
                                Отчет Аналитика
                                <IconHelp size={16} color="#adb5bd" />
                            </Group>
                        </List.Item>
                        <List.Item>Отчет Начисления</List.Item>
                        <List.Item>Отчет Товары</List.Item>
                        <List.Item>Отчет Возвраты</List.Item>
                        <List.Item>Отчет Остатки</List.Item>
                        <List.Item>Отчет рекламные кампании</List.Item>
                        <List.Item>Отчет рекламная статистика</List.Item>
                    </List>
                </Paper>
            </SimpleGrid>

            <Button component={Link} to="/" mt={50} variant="subtle" color="gray">
                &larr; Вернуться на дашборд
            </Button>
        </Container>
    );
}

export default Tariffs;

