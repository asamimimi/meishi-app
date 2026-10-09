import { Button, Card, Field, Input, Stack, Container, Center, Heading, Link } from "@chakra-ui/react"


function Home() {

    return (
        <>
            <Container>
                <Center>
                    <Heading fontWeight="bold" className="title">デジタル名刺アプリ</Heading>
                </Center>
                <Center>
                    <Card.Root maxW="m">
                        <Card.Body>
                            <Stack gap="4" w="full">
                                <Field.Root>
                                    <Field.Label>ID</Field.Label>
                                    <Input />
                                </Field.Root>

                            </Stack>
                        </Card.Body>
                        <Card.Footer justifyContent="center">
                            <Button variant="solid" className="login_btn" bg="cyan.600">名刺を見る</Button>
                        </Card.Footer>
                    </Card.Root>

                </Center>
                <Center>
                    <Link href="/card/register" className="link_text">新規登録はこちら</Link>
                </Center>
            </Container >

        </>
    )
}

export default Home
