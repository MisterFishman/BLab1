import { useState } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider, Container, Paper, TextInput, PasswordInput, Button, Text, Table, Badge, ActionIcon, Anchor } from '@mantine/core';
import { IconChevronDown, IconUser } from '@tabler/icons-react';

function App() {
  // State для раскрытия секций
  const [sellerApiOpen, setSellerApiOpen] = useState(false);
  const [perfApiOpen, setPerfApiOpen] = useState(false);
  const [googleSheetsOpen, setGoogleSheetsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // State для credentials
  const [sellerCredentials, setSellerCredentials] = useState({ clientId: '', apiKey: '' });
  const [perfCredentials, setPerfCredentials] = useState({ clientId: '', clientSecret: '' });
  const [googleSheets, setGoogleSheets] = useState({ startDate: '', endDate: '', gmail: '' });

  // State для сохранения
  const [sellerSaved, setSellerSaved] = useState(false);
  const [perfSaved, setPerfSaved] = useState(false);
  const [gmailSaved, setGmailSaved] = useState(false);
  const [gmailError, setGmailError] = useState('');

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
      setTimeout(() => setSellerSaved(true), 1000);
    }
  };

  // Функция сохранения Performance API
  const savePerfCredentials = () => {
    if (perfCredentials.clientId.trim() && perfCredentials.clientSecret.trim()) {
      setSavedPerfClientId(perfCredentials.clientId);
      setSavedPerfClientSecret(perfCredentials.clientSecret);
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
    setTimeout(() => setGmailSaved(true), 1000);
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
    { id: 1, name: 'Отчёт №1', date: '10.10.2025', status: 'Обновлено', color: 'green' },
    { id: 2, name: 'Отчёт №2', date: '10.10.2025', status: 'Обновлено', color: 'green' },
    { id: 3, name: 'Отчёт №3', date: '10.10.2025', status: 'В очереди', color: 'yellow' },
    { id: 4, name: 'Отчёт №4', date: '10.10.2025', status: 'В очереди', color: 'yellow' },
    { id: 5, name: 'Отчёт №5', date: '10.10.2025', status: 'Обновлено', color: 'green' },
    { id: 6, name: 'Отчёт №6', date: '10.10.2025', status: 'Обновлено', color: 'green' },
    { id: 7, name: 'Отчёт №7', date: '10.10.2025', status: 'Ошибка', color: 'red' }
  ];

  return (
    <MantineProvider>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Top Header */}
        <div style={{ background: 'white', borderBottom: '1px solid #dee2e6', padding: '16px 0' }}>
          <Container size="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text fw={700} size="xl">BoostLab</Text>
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
                    <Paper shadow="md" style={{ position: 'absolute', top: '50px', right: 0, minWidth: '200px', zIndex: 1000 }}>
                      <div style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f1f3f5' }} onClick={() => setProfileMenuOpen(false)}>Профиль</div>
                      <div style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f1f3f5' }} onClick={() => setProfileMenuOpen(false)}>Настройки</div>
                      <div style={{ padding: '12px 16px', cursor: 'pointer' }} onClick={() => setProfileMenuOpen(false)}>Выход</div>
                    </Paper>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <Container size="lg" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <Text size="32px" fw={700}>Dashboard</Text>
            <Button>Создать отчёт</Button>
          </div>          {/* Seller API Section */}
          <Paper shadow="xs" mb="md" style={{ overflow: 'hidden' }}>
            <div 
              onClick={() => setSellerApiOpen(!sellerApiOpen)} 
              style={{ 
                padding: '16px 20px', 
                cursor: 'pointer', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: sellerApiOpen ? '#f8f9fa' : 'white',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text fw={500}>Seller API</Text>
                <Badge color="green" size="xs" tt="uppercase">ПОДКЛЮЧЕНО</Badge>
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
              <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid #f1f3f5', paddingTop: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <Text size="xs" fw={600} c="#495057" tt="uppercase">CLIENT_ID<Text component="span" c="red"> *</Text></Text>
                      <Anchor href="instruction.html" size="xs" c="blue" td="underline">Инструкция</Anchor>
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
                    color={sellerSaved ? 'green' : 'blue'}
                    onClick={saveSellerCredentials}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {sellerSaved ? 'Сохранено' : 'Сохранить'}
                  </Button>
                </div>
              </div>
            )}
          </Paper>

          {/* Performance API Section */}
          <Paper shadow="xs" mb="md" style={{ overflow: 'hidden' }}>
            <div 
              onClick={() => setPerfApiOpen(!perfApiOpen)} 
              style={{ 
                padding: '16px 20px', 
                cursor: 'pointer', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: perfApiOpen ? '#f8f9fa' : 'white',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text fw={500}>Performance API</Text>
                <Badge color="green" size="xs" tt="uppercase">ПОДКЛЮЧЕНО</Badge>
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
              <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid #f1f3f5', paddingTop: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <Text size="xs" fw={600} c="#495057" tt="uppercase">CLIENT_ID<Text component="span" c="red"> *</Text></Text>
                      <Anchor href="instruction.html" size="xs" c="blue" td="underline">Инструкция</Anchor>
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
                    color={perfSaved ? 'green' : 'blue'}
                    onClick={savePerfCredentials}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {perfSaved ? 'Сохранено' : 'Сохранить'}
                  </Button>
                </div>
              </div>
            )}
          </Paper>

          {/* Google Sheets Section */}
          <Paper shadow="xs" mb="lg" style={{ overflow: 'hidden' }}>
            <div 
              onClick={() => setGoogleSheetsOpen(!googleSheetsOpen)} 
              style={{ 
                padding: '16px 20px', 
                cursor: 'pointer', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                backgroundColor: googleSheetsOpen ? '#f8f9fa' : 'white',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text fw={500}>Google Sheets</Text>
                <Badge color="green" size="xs" tt="uppercase">ПОДКЛЮЧЕНО</Badge>
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
              <div style={{ padding: '0 20px 30px 20px', borderTop: '1px solid #f1f3f5', paddingTop: '20px' }}>
                {/* Date Range */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                  <Text size="sm" style={{ minWidth: '80px', whiteSpace: 'nowrap' }}>Период:</Text>
                  <TextInput 
                    type="date" 
                    value={googleSheets.startDate} 
                    onChange={(e) => setGoogleSheets({ ...googleSheets, startDate: e.target.value })} 
                    style={{ width: '150px' }} 
                  />
                  <Text size="sm" c="dimmed">—</Text>
                  <TextInput 
                    type="date" 
                    value={googleSheets.endDate} 
                    onChange={(e) => setGoogleSheets({ ...googleSheets, endDate: e.target.value })} 
                    style={{ width: '150px' }} 
                  />
                </div>
                
                {/* Gmail */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Text size="sm" style={{ minWidth: '80px', lineHeight: '40px', whiteSpace: 'nowrap' }}>Gmail:</Text>
                  <div style={{ flex: 1, maxWidth: '320px', position: 'relative' }}>
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
                    color={gmailSaved ? 'green' : 'blue'}
                    onClick={saveGmail}
                    style={{ whiteSpace: 'nowrap', marginLeft: 'auto' }}
                  >
                    {gmailSaved ? 'Сохранено' : 'Сохранить'}
                  </Button>
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
                <Text size="32px" fw={700}>{stat.value}</Text>
              </Paper>
            ))}
          </div>

          {/* Reports Table */}
          <Paper shadow="xs" style={{ overflow: 'hidden', border: '1px solid #dee2e6' }}>
            <div style={{ padding: '20px 20px 16px 20px' }}>
              <Text size="xl" fw={700}>Последние отчёты</Text>
            </div>
            <Table>
              <Table.Thead style={{ backgroundColor: '#f8f9fa' }}>
                <Table.Tr>
                  <Table.Th style={{ padding: '16px 20px', fontSize: '12px', color: '#868e96', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}>Название отчёта</Table.Th>
                  <Table.Th style={{ padding: '16px 20px', fontSize: '12px', color: '#868e96', textTransform: 'uppercase', fontWeight: 600, textAlign: 'center' }}>Дата создания</Table.Th>
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
                    <Table.Td style={{ padding: '16px 20px', fontSize: '15px', textAlign: 'center' }}>{report.name}</Table.Td>
                    <Table.Td style={{ padding: '16px 20px', fontSize: '15px', textAlign: 'center' }}>{report.date}</Table.Td>
                    <Table.Td style={{ padding: '16px 20px', fontSize: '15px', textAlign: 'center' }}>{report.date}</Table.Td>
                    <Table.Td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <Badge 
                        style={{ 
                          padding: '6px 14px', 
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

        {/* Footer */}
        <div style={{ background: 'white', borderTop: '1px solid #dee2e6', padding: '30px 0', marginTop: '60px' }}>
          <Container size="lg">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text fw={700} size="lg" style={{ letterSpacing: '0.5px' }}>BoostLab 2025</Text>
            </div>
          </Container>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;

