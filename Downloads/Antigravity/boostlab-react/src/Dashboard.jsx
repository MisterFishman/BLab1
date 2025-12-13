import { useState } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider, Container, Paper, TextInput, PasswordInput, Button, Text, Table, Badge, Anchor, Collapse, Tooltip } from '@mantine/core';
import { IconChevronDown, IconHelp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function Dashboard() {
    // Вычисляем даты по умолчанию
    const today = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(today.getDate() - 90);

    // Форматирование даты в YYYY-MM-DD (используем en-CA для правильного формата)
    const formatDate = (date) => date.toLocaleDateString('en-CA');

    // State для раскрытия секций
    const [sellerApiOpen, setSellerApiOpen] = useState(false);
    const [perfApiOpen, setPerfApiOpen] = useState(false);
    const [googleSheetsOpen, setGoogleSheetsOpen] = useState(false);

    // State для credentials
    const [sellerCredentials, setSellerCredentials] = useState({ clientId: '', apiKey: '' });
    const [perfCredentials, setPerfCredentials] = useState({ clientId: '', clientSecret: '' });
    const [googleSheets, setGoogleSheets] = useState({
        startDate: formatDate(ninetyDaysAgo),
        endDate: formatDate(today),
        gmail: ''
    });

    // State для сохранения
    const [sellerSaved, setSellerSaved] = useState(false);
    const [perfSaved, setPerfSaved] = useState(false);
    const [gmailSaved, setGmailSaved] = useState(false);
    const [gmailError, setGmailError] = useState('');

    // State для ошибок валидации при создании отчета
    const [sellerConnectionError, setSellerConnectionError] = useState(false);
    const [perfConnectionError, setPerfConnectionError] = useState(false);
    const [googleConnectionError, setGoogleConnectionError] = useState(false);

    // Сохраненные значения для отслеживания изменений
    const [savedSellerClientId, setSavedSellerClientId] = useState('');
    const [savedSellerApiKey, setSavedSellerApiKey] = useState('');
    const [savedPerfClientId, setSavedPerfClientId] = useState('');
    const [savedPerfClientSecret, setSavedPerfClientSecret] = useState('');
    const [savedGmail, setSavedGmail] = useState('');

    // Функция сохранения Seller API
    const saveSellerCredentials = () => {
        if (sellerCredentials.clientId.trim() && sellerCredentials.apiKey.trim()) {
            setSavedSellerClientId(sellerCredentials.clientId);
            setSavedSellerApiKey(sellerCredentials.apiKey);
            setSellerConnectionError(false);
            setTimeout(() => setSellerSaved(true), 1000);
        }
    };

    // Функция сохранения Performance API
    const savePerfCredentials = () => {
        if (perfCredentials.clientId.trim() && perfCredentials.clientSecret.trim()) {
            setSavedPerfClientId(perfCredentials.clientId);
            setSavedPerfClientSecret(perfCredentials.clientSecret);
            setPerfConnectionError(false);
            setTimeout(() => setPerfSaved(true), 1000);
        }
    };

    // Функция сохранения Gmail с валидацией
    const saveGmail = () => {
        const email = googleSheets.gmail.trim();

        if (!email) {
            setGmailError('Пожалуйста, введите email');
            return;
        }

        if (!email.toLowerCase().endsWith('@gmail.com')) {
            setGmailError('Email должен быть Gmail (gmail.com)');
            return;
        }

        setGmailError('');
        setSavedGmail(email);
        setGoogleConnectionError(false);
        setTimeout(() => setGmailSaved(true), 1000);
    };

    // Функция проверки подключений перед созданием отчетов
    const handleCreateReports = () => {
        let hasError = false;

        if (!sellerSaved) {
            setSellerConnectionError(true);
            hasError = true;
        }

        if (!perfSaved) {
            setPerfConnectionError(true);
            hasError = true;
        }

        if (!gmailSaved) {
            setGoogleConnectionError(true);
            hasError = true;
        }

        if (hasError) {
            alert('Пожалуйста, подключите все интеграции перед созданием отчета.');
        } else {
            // Здесь будет логика создания отчетов
            console.log('Creating reports...');
        }
    };

    // Отслеживание изменений для сброса кнопки "Сохранено"
    const handleSellerChange = (field, value) => {
        setSellerCredentials({ ...sellerCredentials, [field]: value });
        if (sellerSaved && (value !== savedSellerClientId || value !== savedSellerApiKey)) {
            setSellerSaved(false);
        }
    };

    const handlePerfChange = (field, value) => {
        setPerfCredentials({ ...perfCredentials, [field]: value });
        if (perfSaved && (value !== savedPerfClientId || value !== savedPerfClientSecret)) {
            setPerfSaved(false);
        }
    };

    const handleGmailChange = (value) => {
        setGoogleSheets({ ...googleSheets, gmail: value });
        setGmailError('');
        if (gmailSaved && value !== savedGmail) {
            setGmailSaved(false);
        }
    };

    // Данные отчётов
    const reports = [
        { id: 1, name: 'Отчет Начисления', date: '10.10.2025', updatedDate: 'Завтра', status: 'Обновлено', color: 'green' },
        { id: 2, name: 'Отчет Аналитика', date: '10.10.2025', updatedDate: 'Завтра', status: 'Обновлено', color: 'green' },
        { id: 3, name: 'Отчет Товары', date: '10.10.2025', updatedDate: 'Сегодня', status: 'В очереди', color: 'blue' },
        { id: 4, name: 'Отчет Возвраты', date: '10.10.2025', updatedDate: 'Сегодня', status: 'В очереди', color: 'blue' },
        { id: 5, name: 'Отчет Остатки', date: '10.10.2025', updatedDate: 'Завтра', status: 'Обновлено', color: 'green' },
        { id: 6, name: 'Отчет Рекламные кампании', date: '10.10.2025', updatedDate: 'Завтра', status: 'Обновлено', color: 'green' },
        { id: 7, name: 'Отчет Рекламная статистика', date: '10.10.2025', updatedDate: 'Сегодня', status: 'Ошибка', color: 'red' },
    ];
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Main Content */}
            <Container size="lg" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <Text size="32px" fw={700}>Dashboard</Text>
                    <Button onClick={handleCreateReports}>Создать отчёты</Button>
                </div>          {/* Seller API Section */}
                <Paper shadow="xs" mb="md" style={{ overflow: 'hidden', border: sellerConnectionError ? '2px solid red' : undefined }}>
                    <div
                        onClick={() => {
                            setSellerApiOpen(!sellerApiOpen);
                        }}
                        style={{
                            padding: '16px 20px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Text fw={500}>Seller API</Text>
                            <Badge color={sellerSaved ? 'green' : 'red'} size="xs" tt="uppercase" radius="sm">{sellerSaved ? 'ПОДКЛЮЧЕНО' : 'НЕ ПОДКЛЮЧЕНО'}</Badge>
                        </div>
                        <IconChevronDown
                            size={20}
                            style={{
                                transform: sellerApiOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s'
                            }}
                        />
                    </div>
                    {sellerApiOpen && (
                        <div style={{ padding: '0 20px 20px 20px' }}>
                            <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '30px', display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                        <Text size="xs" fw={600} c="#495057" tt="uppercase">CLIENT_ID<Text component="span" c="red"> *</Text></Text>
                                        <Anchor component={Link} to="/instruction" size="xs" c="blue" td="underline">Инструкция</Anchor>
                                    </div>
                                    <TextInput
                                        placeholder="CLIENT_ID"
                                        value={sellerCredentials.clientId}
                                        onChange={(e) => handleSellerChange('clientId', e.target.value)}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Text size="xs" fw={600} c="#495057" tt="uppercase" mb="xs">API_KEY<Text component="span" c="red"> *</Text></Text>
                                    <PasswordInput
                                        placeholder="API_KEY"
                                        value={sellerCredentials.apiKey}
                                        onChange={(e) => handleSellerChange('apiKey', e.target.value)}
                                    />
                                </div>
                                <Button
                                    color={!sellerCredentials.clientId || !sellerCredentials.apiKey ? 'red' : sellerSaved ? 'green' : 'blue'}
                                    onClick={saveSellerCredentials}
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    {!sellerCredentials.clientId || !sellerCredentials.apiKey ? 'Сохранить' : (sellerSaved || (sellerCredentials.clientId === savedSellerClientId && sellerCredentials.apiKey === savedSellerApiKey)) ? 'Сохранено' : 'Сохранить'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Paper>

                {/* Performance API Section */}
                <Paper shadow="xs" mb="md" style={{ overflow: 'hidden', border: perfConnectionError ? '2px solid red' : undefined }}>
                    <div
                        onClick={() => {
                            setPerfApiOpen(!perfApiOpen);
                        }}
                        style={{
                            padding: '16px 20px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Text fw={500}>Performance API</Text>
                            <Badge color={perfSaved ? 'green' : 'red'} size="xs" tt="uppercase" radius="sm">{perfSaved ? 'ПОДКЛЮЧЕНО' : 'НЕ ПОДКЛЮЧЕНО'}</Badge>
                        </div>
                        <IconChevronDown
                            size={20}
                            style={{
                                transform: perfApiOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s'
                            }}
                        />
                    </div>
                    {perfApiOpen && (
                        <div style={{ padding: '0 20px 20px 20px' }}>
                            <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '30px', display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                        <Text size="xs" fw={600} c="#495057" tt="uppercase">CLIENT_ID<Text component="span" c="red"> *</Text></Text>
                                        <Anchor component={Link} to="/instruction" size="xs" c="blue" td="underline">Инструкция</Anchor>
                                    </div>
                                    <TextInput
                                        placeholder="Performance API CLIENT_ID"
                                        value={perfCredentials.clientId}
                                        onChange={(e) => handlePerfChange('clientId', e.target.value)}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Text size="xs" fw={600} c="#495057" tt="uppercase" mb="xs">CLIENT_SECRET<Text component="span" c="red"> *</Text></Text>
                                    <PasswordInput
                                        placeholder="Performance API CLIENT_SECRET"
                                        value={perfCredentials.clientSecret}
                                        onChange={(e) => handlePerfChange('clientSecret', e.target.value)}
                                    />
                                </div>
                                <Button
                                    color={!perfCredentials.clientId || !perfCredentials.clientSecret ? 'red' : perfSaved ? 'green' : 'blue'}
                                    onClick={savePerfCredentials}
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    {!perfCredentials.clientId || !perfCredentials.clientSecret ? 'Сохранить' : (perfSaved || (perfCredentials.clientId === savedPerfClientId && perfCredentials.clientSecret === savedPerfClientSecret)) ? 'Сохранено' : 'Сохранить'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Paper>

                {/* Google Sheets Section */}
                <Paper shadow="xs" mb="lg" style={{ overflow: 'hidden', border: googleConnectionError ? '2px solid red' : undefined }}>
                    <div
                        onClick={() => {
                            setGoogleSheetsOpen(!googleSheetsOpen);
                        }}
                        style={{
                            padding: '16px 20px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Text fw={500}>Google Sheets</Text>
                            <Badge color={gmailSaved ? 'green' : 'red'} size="xs" tt="uppercase" radius="sm">{gmailSaved ? 'ПОДКЛЮЧЕНО' : 'НЕ ПОДКЛЮЧЕНО'}</Badge>
                        </div>
                        <IconChevronDown
                            size={20}
                            style={{
                                transform: googleSheetsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s'
                            }}
                        />
                    </div>
                    {googleSheetsOpen && (
                        <div style={{ padding: '0 20px 30px 20px' }}>
                            <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '30px' }}>
                                {/* Date Range */}
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                                    <Text size="sm" style={{ minWidth: '80px', whiteSpace: 'nowrap' }}>Период:</Text>
                                    <TextInput
                                        type="date"
                                        value={googleSheets.startDate}
                                        onChange={(e) => setGoogleSheets({ ...googleSheets, startDate: e.target.value })}
                                        style={{ width: '150px' }}
                                        max={formatDate(today)}
                                    />
                                    <Text size="sm" c="dimmed">—</Text>
                                    <TextInput
                                        type="date"
                                        value={googleSheets.endDate}
                                        onChange={(e) => setGoogleSheets({ ...googleSheets, endDate: e.target.value })}
                                        style={{ width: '150px' }}
                                        max={formatDate(today)}
                                    />
                                    <Tooltip label="Если вы желаете загрузить данные за более раниий срок, выберите нужные даты (это делаеться один раз), далее сервис будет выгружать дынне автоматически ежедневно." withArrow position="right" maw={340} multiline>
                                        <IconHelp size={20} color="#868e96" style={{ cursor: 'help', marginLeft: '8px' }} />
                                    </Tooltip>
                                </div>

                                {/* Gmail */}
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <Text size="sm" style={{ minWidth: '80px', lineHeight: '40px', whiteSpace: 'nowrap' }}>Gmail:</Text>
                                    <div style={{ flex: 1, maxWidth: '336px', position: 'relative' }}>
                                        <TextInput
                                            type="email"
                                            placeholder="example@gmail.com"
                                            value={googleSheets.gmail}
                                            onChange={(e) => handleGmailChange(e.target.value)}
                                            error={!!gmailError}
                                        />
                                        {gmailError && (
                                            <Text size="xs" c="red" mt="xs">{gmailError}</Text>
                                        )}
                                    </div>
                                    <Button
                                        color={!googleSheets.gmail ? 'red' : gmailSaved ? 'green' : 'blue'}
                                        onClick={saveGmail}
                                        style={{ whiteSpace: 'nowrap', marginLeft: 'auto' }}
                                    >
                                        {!googleSheets.gmail ? 'Сохранить' : (gmailSaved || googleSheets.gmail === savedGmail) ? 'Сохранено' : 'Сохранить'}
                                    </Button>
                                </div>

                                {/* Instructions */}
                                <Collapse in={gmailSaved} transitionDuration={1000}>
                                    <div style={{ marginTop: '20px' }}>
                                        <Text size="sm">
                                            Сделайте копию вашей таблицы: <Anchor href="https://docs.google.com/spreadsheets/" target="_blank" c="blue" inherit>https://docs.google.com/spreadsheets/</Anchor>
                                        </Text>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    )}
                </Paper>
                {/* Statistics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', margin: '30px 0' }}>
                    {[
                        { label: 'Всего отчётов', value: '7' },
                        { label: 'Выполнено', value: '3' },
                        { label: 'В процессе', value: '4' },
                        { label: 'Отклонено', value: '0' }
                    ].map((stat, i) => (
                        <Paper key={i} shadow="xs" p="lg" style={{ border: '1px solid #dee2e6' }}>
                            <Text size="xs" c="#868e96" tt="uppercase" fw={500} mb="xs">{stat.label}</Text>
                            <Text size="32px" fw={700} ta="right">{stat.value}</Text>
                        </Paper>
                    ))}
                </div>

                {/* Reports Table */}
                <Paper shadow="xs" style={{ overflow: 'hidden', border: '1px solid #dee2e6', paddingBottom: '10px' }}>
                    <Table>
                        <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                            <Table.Tr>
                                <Table.Th style={{ padding: '16px 20px', fontSize: '12px', color: '#868e96', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}>Название отчёта</Table.Th>
                                <Table.Th style={{ padding: '16px 20px', fontSize: '12px', color: '#868e96', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}>Дата загрузки</Table.Th>
                                <Table.Th style={{ padding: '16px 20px', fontSize: '12px', color: '#868e96', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}>Дата обновления</Table.Th>
                                <Table.Th style={{ padding: '16px 20px', fontSize: '12px', color: '#868e96', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}>Статус</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {reports.map((report, index) => (
                                <Table.Tr
                                    key={report.id}
                                    style={{
                                        cursor: 'pointer',
                                        borderBottom: index === reports.length - 1 ? 'none' : '1px solid #f1f3f5'
                                    }}
                                >
                                    <Table.Td style={{ padding: '16px 20px', fontSize: '15px', textAlign: 'left', paddingLeft: '30px' }}>{report.name}</Table.Td>
                                    <Table.Td style={{ padding: '16px 20px', fontSize: '15px', textAlign: 'center' }}>{report.date}</Table.Td>
                                    <Table.Td style={{ padding: '16px 20px', fontSize: '15px', textAlign: 'center' }}>{report.date}</Table.Td>
                                    <Table.Td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                        <Badge
                                            style={{
                                                padding: '2px 20px',
                                                height: 'auto',
                                                borderRadius: '16px',
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                backgroundColor: report.color === 'green' ? '#d3f9d8' : report.color === 'yellow' ? '#fff3bf' : '#ffe3e3',
                                                color: report.color === 'green' ? '#2b8a3e' : report.color === 'yellow' ? '#e67700' : '#c92a2a'
                                            }}
                                        >
                                            {report.status}
                                        </Badge>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            </Container>
        </div>
    );
}

export default Dashboard;
