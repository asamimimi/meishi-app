import { Container, Center, Heading, Card, Button, Stack, Field, Input, Textarea, NativeSelect } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


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
    skill_id: number,
}

function Register() {

    const [selection, setSelection] = useState<Select[]>([])
    const navigate = useNavigate();

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
            }
        }
        fetchRecords()
    }, [])

    // フォームの値・バリデーションは react-hook-form で管理
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            user_id: '',
            name: '',
            description: '',
            github_id: '',
            qiita_id: '',
            x_id: '',
        },
    });

    // 送信ボタン押した時（バリデーションを通過した場合のみ呼ばれる）
    const onSubmit: SubmitHandler<FormData> = async (formData) => {
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
            .insert({ user_id, skill_id });

        if (skillError) {
            console.error('user_skill 登録エラー:', skillError);
            return;
        }
        console.log('送信された値:', formData);
    };

    const toBack = (() => {
        navigate(`/`);
    })
    return (
        <>  <Container pt="6" pb="6">
            <Center>
                <Heading size="2xl" className="title">新規名刺登録</Heading>
            </Center>

            <Container>
                <Center>
                    <Card.Root width="350px">
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Card.Header>
                                <Card.Title>登録フォーム</Card.Title>

                            </Card.Header>
                            <Card.Body>
                                <Stack gap="4" w="full">
                                    <Field.Root required invalid={!!errors.user_id}>
                                        <Field.Label>ID(好きな英単語)<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="example"
                                            {...register("user_id", {
                                                required: "IDの入力は必須です",
                                                pattern: {
                                                    value: /^[a-zA-Z]+$/,
                                                    message: "IDは半角英字で入力してください",
                                                },
                                            })} />
                                        <Field.ErrorText>{errors.user_id?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root required invalid={!!errors.name}>
                                        <Field.Label>お名前<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="山田　太郎"
                                            {...register("name", {
                                                required: "お名前の入力は必須です",
                                            })} />
                                        <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root required invalid={!!errors.description}>
                                        <Field.Label>自己紹介<Field.RequiredIndicator /></Field.Label>
                                        <Textarea placeholder="HTMLも利用できます。"
                                            {...register("description", {
                                                required: "自己紹介の入力は必須です",
                                            })} />
                                        <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root required invalid={!!errors.skill_id}>
                                        <Field.Label>好きなスキル<Field.RequiredIndicator /></Field.Label>
                                        <NativeSelect.Root>
                                            <NativeSelect.Field placeholder="選択してください"
                                                {...register("skill_id", {
                                                    required: "スキルを選択してください",
                                                    valueAsNumber: true, // 選択値を数値に変換して保持
                                                })}>
                                                {selection.map((item) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    )
                                                })}
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                        <Field.ErrorText>{errors.skill_id?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root required invalid={!!errors.github_id}>
                                        <Field.Label>GitHub ID<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="IDを入力してください"
                                            {...register("github_id", {
                                                required: "GitHub IDの入力は必須です",
                                            })} />
                                        <Field.ErrorText>{errors.github_id?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root required invalid={!!errors.qiita_id}>
                                        <Field.Label>Qiita ID<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="IDを入力してください"
                                            {...register("qiita_id", {
                                                required: "Qiita IDの入力は必須です",
                                            })} />
                                        <Field.ErrorText>{errors.qiita_id?.message}</Field.ErrorText>
                                    </Field.Root>

                                    <Field.Root required invalid={!!errors.x_id}>
                                        <Field.Label>X ID<Field.RequiredIndicator /></Field.Label>
                                        <Input placeholder="@なしでIDを入力してください"
                                            {...register("x_id", {
                                                required: "X IDの入力は必須です",
                                                pattern: {
                                                    value: /^[^@]/,
                                                    message: "@なしで入力してください",
                                                },
                                            })} />
                                        <Field.ErrorText>{errors.x_id?.message}</Field.ErrorText>
                                    </Field.Root>
                                </Stack>
                            </Card.Body>

                            <Card.Footer justifyContent="center">
                                <Button variant="solid" type="submit" loading={isSubmitting} width="280px">登録する</Button>
                            </Card.Footer>
                        </form>
                    </Card.Root>
                </Center>
                <Center mt="8">
                    <Button onClick={toBack} width="300px" bg="teal.500">戻る</Button>
                </Center>
            </Container >
        </Container >
        </>
    )
}

export default Register
