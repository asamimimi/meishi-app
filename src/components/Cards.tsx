import { Container, Center, Heading, Card, IconButton, Button } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { useState, useEffect, } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';


// supabase
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// 型定義
type Profile = {
    user_id: string,
    name: string,
    description: string,
    github_id: string,
    qiita_id: string,
    x_id: string
}
type Skills = {
    id: number,
    user_id: string,
    skill_id: number,
    skills: { id: number; name: string }
}


function Cards() {
    const [profile, setProfile] = useState<Profile[]>([])
    const [skill, setSkill] = useState<Skills[]>([])
    const [item, setItem] = useState<string>('')
    const { userId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchRecords() {
            const { data, error } = await supabase.from('users').select().eq('user_id', userId.trim())
                .maybeSingle();
            if (error) {
                console.error(error)
                return
            }
            if (data) {
                setProfile(data)
                console.log(data)
            }
        }
        fetchRecords()
    }, [])



    useEffect(() => {
        async function fetchSkills() {
            const { data, error } = await supabase.from('user_skill')
                .select(`
                id,
                user_id,
                skill_id,
                skills(
                    id,
                    name
                    )`
                )
                .eq('user_id', userId.trim())
                .maybeSingle();
            if (error) {
                console.error(error)
                return
            }
            if (data) {
                setSkill(data as unknown as Skills[])
                setItem(data.skills)
                console.log(data)
            }
        }
        fetchSkills()
    }, [])

    const sanitizedHTML = DOMPurify.sanitize(profile.description);

    const toBack = (() => {
        navigate(`/`);
    })

    return (
        <>

            <Container key={profile.user_id} pt="10">
                <Center>
                    <Card.Root width="320px" >
                        <Card.Body gap="2">
                            <Card.Title mt="2">{profile.name}</Card.Title>
                            <Heading size="lg">自己紹介</Heading>

                            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

                            <Heading size="lg">好きな技術</Heading>
                            <Card.Description>
                                好きなスキル {item.name}
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Link to={`https://github.com/${profile.github_id}`} target="_brank">
                                <IconButton aria-label="Search database">
                                    <FaGithub />
                                </IconButton>
                            </Link>
                            <Link to={`https://qiita.com/${profile.qiita_id}`} target="_brank">
                                <IconButton aria-label="Search database">
                                    <LuNotebookText />
                                </IconButton>
                            </Link>
                            <Link to={`https://x.com/${profile.x_id}`} target="_brank">
                                <IconButton>
                                    <FaXTwitter />
                                </IconButton>
                            </Link>
                        </Card.Footer>
                    </Card.Root>
                </Center>
                <Center mt="8">
                    <Button onClick={toBack} width="300px" bg="teal.500">戻る</Button>
                </Center>
            </Container>


        </>
    )
}

export default Cards
