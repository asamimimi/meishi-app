import { Container, Center, Heading, Card, Button, Stack, Field, Input, Textarea, NativeSelect } from "@chakra-ui/react"
import { useState, useEffect } from 'react';

// supabase
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// 型定義
type Select = {
    id: number,
    name: string,
}
type FormData = {
    user_id: string,
    name: string,
    description: string,
    github_id: string,
    qiita_id: string,
    x_id: string,
    skill_id: number
}

function Register() {

    const [selection, setSelection] = useState<Select[]>([])
    const [formData, setFormData] = useState<FormData>({
        user_id: '',
        name: '',
        description: '',
        github_id: '',
        qiita_id: '',
        x_id: '',
        skill_id: 0,
    });


    // スキルのデータ取得
    useEffect(() => {
        async function fetchRecords() {
            const { data, error } = await supabase.from('skills').select()
            if (error) {
                console.error(error)
                return
            }
            if (data) {
                setSelection(data)
                console.log(data)
            }
        }
        fetchRecords()
    }, [])



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof FormData;

        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldName === 'skill_id' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const { user_id, name, description, github_id, qiita_id, x_id, skill_id } = formData;

        // Supabase の `insert` を使ってデータを追加
        // 1. 親（users）を先に登録
        const { error: userError } = await supabase
            .from('users')
            .insert({ user_id, name, description, github_id, qiita_id, x_id });

        if (userError) {
            console.error('users 登録エラー:', userError);
            return;
        }

        // 2. 子（user_skill）は親の登録が成功してから
        const { error: skillError } = await supabase
            .from('user_skill')
            .insert({ user_id, skill_id: Number(skill_id) });

        if (skillError) {
            console.error('user_skill 登録エラー:', skillError);
            return;
        }
        console.log('送信された値:', user_id, name, description, github_id, qiita_id, x_id, skill_id);
    };


    return (
        <>
            <Center>
                <Heading size="2xl" className="title">新規名刺登録</Heading>
            </Center>

            <Container >
                <Center>
                    <Card.Root width="350px">
                        <form onSubmit={handleSubmit}>
                            <Card.Header>
                                <Card.Title>登録フォーム</Card.Title>

                            </Card.Header>
                            <Card.Body>
                                <Stack gap="4" w="full">
                                    <Field.Root required>
                                        <Field.Label>ID(好きな英単語)<Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input name="user_id" value={formData.user_id}
                                            onChange={handleChange} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>お名前<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="山田　太郎" name="name" type="name" value={formData.name} onChange={handleChange} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>自己紹介<Field.RequiredIndicator /></Field.Label>
                                        <Textarea placeholder="HTMLも利用できます。" name="description" value={formData.description}
                                            onChange={handleChange} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>好きなスキル
                                        </Field.Label>
                                        <NativeSelect.Root>
                                            <NativeSelect.Field name="skill"
                                                value={formData.skill_id}
                                                onChange={handleChange}
                                                placeholder="選択してください">
                                                {selection.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    )
                                                })}

                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>GitHub ID<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="IDを入力してください" name="github_id" value={formData.github_id}
                                            onChange={handleChange} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>Qiita ID<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="IDを入力してください" name="qiita_id" value={formData.qiita_id}
                                            onChange={handleChange} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>X ID<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="@なしでIDを入力してください" name="x_id" value={formData.x_id}
                                            onChange={handleChange} />
                                    </Field.Root>
                                </Stack>
                            </Card.Body>

                            <Card.Footer justifyContent="center">
                                <Button variant="solid" type="submit">登録する</Button>
                            </Card.Footer>
                        </form>
                    </Card.Root>
                </Center>
            </Container >

        </>
    )
}

export default Register
