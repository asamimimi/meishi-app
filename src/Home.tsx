import { Button, Card, Field, Input, Stack, Container, Center, Heading, Link } from "@chakra-ui/react"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// supabase
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


function Home() {
    const [user_id, setUser_id] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser_id(e.target.value);
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setMessage('');

        const { data, error } = await supabase
            .from('users')
            .select('user_id')
            .eq('user_id', user_id.trim())
            .maybeSingle();

        if (error) {
            console.error('users 検索エラー:', error);
            setMessage('通信エラーが発生しました。もう一度お試しください。');
            return;
        }
        if (!data) {
            setMessage('このIDは登録されていません。');
            return;
        }
        // ここに来たら該当ユーザーが存在する
        navigate(`/card/${user_id.trim()}`);
    };



    return (
        <>
            <Container pt="6" pb="6">
                <Center>
                    <Heading fontWeight="bold" className="title">デジタル名刺アプリ</Heading>
                </Center>
                <Center>
                    <Card.Root maxW="m">
                        <form onSubmit={handleSubmit}>
                            <Card.Body>
                                <Stack gap="4" w="full">
                                    <Field.Root>
                                        <Field.Label>ID</Field.Label>
                                        <Input name="user_id" value={user_id}
                                            onChange={handleChange} />
                                    </Field.Root>

                                </Stack>
                            </Card.Body>
                            <Card.Footer justifyContent="center">
                                <Button variant="solid" className="login_btn" bg="cyan.600" type="submit">名刺を見る</Button>
                            </Card.Footer>
                        </form>
                    </Card.Root>

                </Center>
                <Center>
                    <Link href="/register" className="link_text">新規登録はこちら</Link>
                </Center>
            </Container >


        </>
    )
}


export default Home
