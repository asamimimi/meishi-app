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


function Register() {

    const [selection, setSelection] = useState<Select[]>([])



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


    // データ登録
    const [user_id, setUser_id] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [github_id, setGithub_id] = useState('');
    const [qiita_id, setQiita_id] = useState('');
    const [x_id, setX_id] = useState('');
    const [skill_id, setSkill] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser_id(e.target.value);
    };
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };
    const handleChangeGithub = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGithub_id(e.target.value);
    };
    const handleChangeQiita = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQiita_id(e.target.value);
    };
    const handleChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
        setX_id(e.target.value);
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
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
                                        <Input name="user_id" value={user_id}
                                            onChange={handleChange} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>お名前<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="山田　太郎" name="name" type="name" value={name}
                                            onChange={handleChangeName} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>自己紹介<Field.RequiredIndicator /></Field.Label>
                                        <Textarea placeholder="HTMLも利用できます。" name="description" value={description}
                                            onChange={handleChangeDescription} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>好きなスキル
                                        </Field.Label>
                                        <NativeSelect.Root>
                                            <NativeSelect.Field name="skill"
                                                value={skill_id}
                                                onChange={(e) => setSkill(Number(e.currentTarget.value))}
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
                                        <Input placeholder="IDを入力してください" name="github_id" value={github_id}
                                            onChange={handleChangeGithub} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>Qiita ID<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="IDを入力してください" name="qiita_id" value={qiita_id}
                                            onChange={handleChangeQiita} />
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label>X ID<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="@なしでIDを入力してください" name="x_id" value={x_id}
                                            onChange={handleChangeX} />
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
