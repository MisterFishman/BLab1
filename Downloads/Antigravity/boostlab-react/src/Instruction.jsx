import { Container, Title, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

function Instruction() {
    return (
        <Container size="lg" style={{ paddingTop: '40px' }}>
            <Title order={1} mb="md">Инструкция</Title>
            <Text mb="xl">
                Здесь будет подробная инструкция по подключению API и Google Sheets.
            </Text>
            <Button component={Link} to="/">Вернуться на дашборд</Button>
        </Container>
    );
}

export default Instruction;
